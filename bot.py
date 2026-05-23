"""
Chess Bets Academy — Telegram Bot (Python + OpenRouter)
Deploy: Render.com, Railway, o cualquier VPS
"""
import os
import json
import logging
import threading
import time
import requests
from datetime import datetime
from flask import Flask, request, jsonify

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

app = Flask(__name__)

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
OPENROUTER_KEY = os.environ.get("OPENROUTER_API_KEY", "")
ODDS_API_KEY = os.environ.get("ODDS_API_KEY", "")
SUPABASE_URL = os.environ.get("SUPABASE_URL", "https://hustanamlbzyxgauibjf.supabase.co")
SUPABASE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")
SITE_URL = os.environ.get("SITE_URL", "https://chessbetsai.onrender.com")

TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"
ODDS_API = "https://api.the-odds-api.com/v4"

SYSTEM_PROMPT = """Actúa como "Live Sports Bets AI", un sistema profesional de análisis y trading de apuestas deportivas especializado en apuestas EN VIVO (live betting) y detección de valor contra las cuotas de las casas de apuestas.

OBJETIVO:
Maximizar el ROI sostenible a largo plazo mediante análisis estadístico avanzado, lectura contextual del partido, modelos predictivos, gestión profesional del bankroll, detección de value bets y análisis de momentum.

ROL:
Eres trader deportivo profesional, analista cuantitativo, experto en machine learning, especialista en mercados live, experto en probabilidades implícitas y entrenador educativo.

FUNCIONES:
1. Detectar apuestas de valor
2. Comparar cuotas entre múltiples casas
3. Calcular probabilidades reales vs implícitas
4. Analizar momentum en vivo
5. Recomendar stake usando Kelly Criterion
6. Clasificar riesgos: bajo, medio, alto

IMPORTANTE:
- Nunca prometer ganancias garantizadas
- Priorizar sostenibilidad y gestión de riesgo
- Rechazar apuestas sin valor esperado positivo (EV+)
- Detectar sesgos emocionales
- RESPONDE SIEMPRE EN ESPAÑOL, sin importar el idioma del usuario"""

HELP_TEXT = """🤖 <b>Chess Bets Academy Bot</b>

Comandos:
/start — Información inicial
/connect &lt;código&gt; — Vincular tu cuenta
/help — Mostrar ayuda
/analizar &lt;partido&gt; — Analizar un partido
/alerts — Activar/desactivar alertas de value bets
/resumen — Resumen de tus últimas apuestas
/stop — Desconectar y detener notificaciones

O simplemente escribe cualquier consulta sobre apuestas deportivas."""

WELCOME_TEXT = """👋 ¡Bienvenido a <b>Chess Bets Academy</b>!

Soy <b>Live Sports Bets AI</b> 🤖, tu asistente profesional de apuestas deportivas.

<b>¿Qué puedo hacer por ti?</b>
• Analizar partidos en vivo con IA
• Detectar value bets automáticamente
• Estrategias de trading deportivo
• Gestión profesional de bankroll
• Conceptos de la academia

<b>¿Cómo empezar?</b>
1. Ve a <a href="{site_url}/settings">Configuración → Telegram</a>
2. Genera un código de conexión
3. Envíame /connect &lt;código&gt;

<b>Comandos rápidos:</b>
/analizar Real Madrid vs Barcelona
/alerts — Alertas de value bets
/resumen — Mis estadísticas"""


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def send_telegram(chat_id: int, text: str, keyboard: list = None):
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    if keyboard:
        payload["reply_markup"] = json.dumps({
            "inline_keyboard": keyboard,
            "resize_keyboard": True,
        })
    try:
        resp = requests.post(f"{TELEGRAM_API}/sendMessage", json=payload, timeout=10)
        resp.raise_for_status()
    except Exception as e:
        log.error(f"Telegram send error: {e}")


def edit_message(chat_id: int, message_id: int, text: str, keyboard: list = None):
    payload = {
        "chat_id": chat_id,
        "message_id": message_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }
    if keyboard:
        payload["reply_markup"] = json.dumps({"inline_keyboard": keyboard})
    try:
        requests.post(f"{TELEGRAM_API}/editMessageText", json=payload, timeout=10)
    except Exception as e:
        log.error(f"Telegram edit error: {e}")


def answer_callback(chat_id: int, callback_id: str, text: str):
    try:
        requests.post(f"{TELEGRAM_API}/answerCallbackQuery", json={
            "callback_query_id": callback_id,
            "text": text,
            "show_alert": False,
        }, timeout=5)
    except Exception as e:
        log.error(f"Callback error: {e}")


# ---------------------------------------------------------------------------
# Supabase
# ---------------------------------------------------------------------------

def supabase_request(method: str, path: str, data: dict = None):
    if not SUPABASE_KEY:
        return None
    url = f"{SUPABASE_URL}/rest/v1/{path}"
    headers = {
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "return=representation",
    }
    try:
        resp = requests.request(method, url, headers=headers, json=data, timeout=10)
        if resp.status_code in (200, 201):
            return resp.json()
        return None
    except Exception as e:
        log.error(f"Supabase error: {e}")
        return None


def get_subscription(chat_id: int):
    results = supabase_request("GET", f"telegram_subscriptions?chat_id=eq.{chat_id}&select=*")
    if results and len(results) > 0:
        return results[0]
    return None


def get_profile(user_id: str):
    results = supabase_request("GET", f"profiles?id=eq.{user_id}&select=*")
    if results and len(results) > 0:
        return results[0]
    return None


def get_user_by_code(code: str):
    results = supabase_request("GET", f"profiles?telegram_code=eq.{code}&select=id,full_name")
    if results and len(results) > 0:
        return results[0]
    return None


def clear_code(user_id: str):
    supabase_request("PATCH", f"profiles?id=eq.{user_id}", {
        "telegram_code": None,
        "telegram_code_expires": None,
    })


def upsert_subscription(user_id: str, chat_id: int, username: str = ""):
    results = supabase_request("GET", f"telegram_subscriptions?user_id=eq.{user_id}&select=id")
    if results and len(results) > 0:
        return supabase_request("PATCH", f"telegram_subscriptions?user_id=eq.{user_id}", {
            "chat_id": chat_id,
            "username": username,
        })
    else:
        return supabase_request("POST", "telegram_subscriptions", {
            "user_id": user_id,
            "chat_id": chat_id,
            "username": username,
        })


def delete_subscription(chat_id: int):
    return supabase_request("DELETE", f"telegram_subscriptions?chat_id=eq.{chat_id}")


def get_user_bets(user_id: str, limit: int = 10):
    results = supabase_request("GET",
        f"betting_history?user_id=eq.{user_id}&select=event_name,result,profit,stake,created_at&order=created_at.desc&limit={limit}")
    return results or []


# ---------------------------------------------------------------------------
# OpenRouter AI
# ---------------------------------------------------------------------------

def ask_ai(user_message: str, context: list = None) -> str:
    if not OPENROUTER_KEY:
        return "❌ La IA no está configurada."

    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    if context:
        messages.extend(context)
    messages.append({"role": "user", "content": user_message})

    try:
        resp = requests.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": SITE_URL,
                "X-Title": "Chess Bets Academy",
            },
            json={
                "model": "openai/gpt-4o-mini",
                "messages": messages,
                "stream": False,
            },
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        return data["choices"][0]["message"]["content"]
    except Exception as e:
        log.error(f"OpenRouter error: {e}")
        return "❌ Error al contactar la IA. Intenta de nuevo."


# ---------------------------------------------------------------------------
# Value Bet Detection
# ---------------------------------------------------------------------------

def fetch_value_bets():
    if not ODDS_API_KEY:
        return []
    try:
        resp = requests.get(
            f"{ODDS_API}/sports/upcoming/odds/",
            params={
                "apiKey": ODDS_API_KEY,
                "regions": "uk,us,eu",
                "markets": "h2h",
                "oddsFormat": "decimal",
            },
            timeout=15,
        )
        if not resp.ok:
            return []
        events = resp.json()
        value_bets = []
        for event in events[:20]:
            for bm in event.get("bookmakers", [])[:3]:
                for market in bm.get("markets", []):
                    for outcome in market.get("outcomes", []):
                        implied_prob = 1.0 / outcome["price"]
                        real_prob = implied_prob * 1.05
                        if real_prob > implied_prob + 0.03:
                            value_bets.append({
                                "event": f"{event['home_team']} vs {event['away_team']}",
                                "outcome": outcome["name"],
                                "odds": outcome["price"],
                                "value": round((real_prob - implied_prob) * 100, 1),
                                "start": event.get("commence_time", ""),
                            })
        return value_bets[:5]
    except Exception as e:
        log.error(f"Odds fetch error: {e}")
        return []


def broadcast_value_bets():
    while True:
        time.sleep(300)
        try:
            bets = fetch_value_bets()
            if not bets:
                continue
            subs = supabase_request("GET", "telegram_subscriptions?select=chat_id,user_id,notifications_enabled&notifications_enabled=eq.true")
            if not subs:
                continue
            for sub in subs:
                chat_id = sub.get("chat_id")
                if not chat_id:
                    continue
                text = "🔥 <b>Value Bets Detectadas</b>\n\n"
                for b in bets:
                    text += f"• {b['event']}\n  {b['outcome']} @ {b['odds']} (Value: +{b['value']}%)\n\n"
                text += "ℹ️ Analiza con /analizar para más detalles."
                send_telegram(chat_id, text)
        except Exception as e:
            log.error(f"Broadcast error: {e}")


# ---------------------------------------------------------------------------
# Conversation context (in-memory, last 4 exchanges per chat)
# ---------------------------------------------------------------------------

conversations: dict = {}

def get_context(chat_id: int):
    return conversations.get(chat_id, [])

def add_context(chat_id: int, role: str, content: str):
    if chat_id not in conversations:
        conversations[chat_id] = []
    conversations[chat_id].append({"role": role, "content": content})
    if len(conversations[chat_id]) > 8:
        conversations[chat_id] = conversations[chat_id][-8:]


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/webhook", methods=["POST"])
def webhook():
    try:
        update = request.get_json(force=True)
        log.info(f"Update: {json.dumps(update)[:200]}")

        if "callback_query" in update:
            return handle_callback(update["callback_query"])

        message = update.get("message", {})
        text = message.get("text", "").strip()
        chat_id = message.get("chat", {}).get("id")
        username = message.get("from", {}).get("username", "")
        message_id = message.get("message_id")

        if not chat_id or not text:
            return jsonify({"ok": True})

        log.info(f"Message from {username or chat_id}: {text[:80]}")

        if text.startswith("/start"):
            parts = text.split(maxsplit=1)
            code = parts[1] if len(parts) > 1 else ""
            keyboard = [[
                {"text": "🌐 Ir a la Web", "url": f"{SITE_URL}/settings"},
                {"text": "❓ Ayuda", "callback_data": "help"},
            ]]
            if code:
                user = get_user_by_code(code)
                if user:
                    upsert_subscription(user["id"], chat_id, username)
                    clear_code(user["id"])
                    send_telegram(chat_id, f"✅ ¡Conectado como <b>{user.get('full_name', 'Usuario')}</b>! Ya puedes recibir alertas de value bets.", keyboard)
                else:
                    send_telegram(chat_id, f"🔗 Código recibido: {code}.\n\nÚsalo en la web para conectar tu cuenta.", keyboard)
            else:
                text = WELCOME_TEXT.format(site_url=SITE_URL)
                send_telegram(chat_id, text, keyboard)
            return jsonify({"ok": True})

        if text.startswith("/connect"):
            code = text.replace("/connect", "").strip()
            if not code:
                send_telegram(chat_id, "❌ Uso: /connect <código>\n\nGenera un código en Chess Bets Academy → Configuración → Telegram.")
                return jsonify({"ok": True})
            user = get_user_by_code(code)
            if not user:
                send_telegram(chat_id, "❌ Código inválido o expirado. Genera uno nuevo en la web.")
                return jsonify({"ok": True})
            upsert_subscription(user["id"], chat_id, username)
            clear_code(user["id"])
            send_telegram(chat_id, f"✅ ¡Conectado como <b>{user.get('full_name', 'Usuario')}</b>!")
            return jsonify({"ok": True})

        if text.startswith("/help"):
            send_telegram(chat_id, HELP_TEXT)
            return jsonify({"ok": True})

        if text.startswith("/analizar"):
            query = text.replace("/analizar", "").strip()
            if not query:
                send_telegram(chat_id, "❌ Uso: /analizar Real Madrid vs Barcelona")
                return jsonify({"ok": True})
            send_telegram(chat_id, "🧠 Analizando...")
            ctx = get_context(chat_id)
            reply = ask_ai(f"Analiza este partido en profundidad: {query}", ctx)
            add_context(chat_id, "user", query)
            add_context(chat_id, "assistant", reply[:200])
            send_telegram(chat_id, reply)
            return jsonify({"ok": True})

        if text.startswith("/alerts"):
            sub = get_subscription(chat_id)
            if not sub:
                send_telegram(chat_id, "❌ No tienes una cuenta conectada. Usa /start o /connect <código> para vincular tu cuenta.")
                return jsonify({"ok": True})
            current = sub.get("value_bet_alerts", True)
            new_val = not current
            supabase_request("PATCH", f"telegram_subscriptions?chat_id=eq.{chat_id}", {"value_bet_alerts": new_val})
            if new_val:
                send_telegram(chat_id, "🔔 Alertas de value bets <b>activadas</b>. Recibirás notificaciones cuando se detecten oportunidades.")
            else:
                send_telegram(chat_id, "🔕 Alertas de value bets <b>desactivadas</b>.")
            return jsonify({"ok": True})

        if text.startswith("/resumen"):
            sub = get_subscription(chat_id)
            if not sub:
                send_telegram(chat_id, "❌ No tienes una cuenta conectada. Usa /connect <código> para vincular tu cuenta.")
                return jsonify({"ok": True})
            bets = get_user_bets(sub["user_id"], 5)
            profile = get_profile(sub["user_id"])
            if not bets:
                send_telegram(chat_id, "📊 No tienes apuestas registradas. ¡Empieza a operar y vuelve para ver tu resumen!")
                return jsonify({"ok": True})
            wins = sum(1 for b in bets if b.get("result") == "win")
            losses = sum(1 for b in bets if b.get("result") == "loss")
            total_profit = sum(float(b.get("profit", 0)) for b in bets)
            text = f"📊 <b>Tu Resumen</b>\n\n"
            if profile:
                text += f"👤 {profile.get('full_name', 'Usuario')}\n"
                text += f"🏆 ELO: {profile.get('elo', 1000)} | XP: {profile.get('xp', 0)}\n\n"
            text += f"Últimas {len(bets)} apuestas:\n"
            text += f"✅ Ganadas: {wins}\n❌ Perdidas: {losses}\n"
            text += f"💰 Profit: {'+' if total_profit >= 0 else ''}{total_profit:.2f}€\n\n"
            text += "<b>Apuestas recientes:</b>\n"
            for b in bets:
                emoji = "✅" if b.get("result") == "win" else "❌"
                profit = float(b.get("profit", 0))
                text += f"{emoji} {b.get('event_name', '—')}: {profit:+.2f}€\n"
            send_telegram(chat_id, text)
            return jsonify({"ok": True})

        if text.startswith("/stop"):
            sub = get_subscription(chat_id)
            if sub:
                delete_subscription(chat_id)
            send_telegram(chat_id, "👋 Cuenta desconectada. Ya no recibirás notificaciones.\n\nPara reconectar, usa /connect <código>.")
            return jsonify({"ok": True})

        # Default: AI response
        send_telegram(chat_id, "🧠 Consultando a Live Sports Bets AI...")
        ctx = get_context(chat_id)
        reply = ask_ai(text, ctx)
        add_context(chat_id, "user", text)
        add_context(chat_id, "assistant", reply[:200])
        send_telegram(chat_id, reply)
        return jsonify({"ok": True})

    except Exception as e:
        log.error(f"Webhook error: {e}")
        return jsonify({"ok": True})


def handle_callback(cb):
    data = cb.get("data", "")
    chat_id = cb.get("message", {}).get("chat", {}).get("id")
    msg_id = cb.get("message", {}).get("message_id")
    cb_id = cb.get("id")

    if data == "help":
        answer_callback(chat_id, cb_id, "Mostrando ayuda...")
        edit_message(chat_id, msg_id, HELP_TEXT, [
            [{"text": "🌐 Ir a la Web", "url": f"{SITE_URL}"}],
        ])
    elif data == "alerts_on":
        supabase_request("PATCH", f"telegram_subscriptions?chat_id=eq.{chat_id}", {"value_bet_alerts": True})
        answer_callback(chat_id, cb_id, "✅ Alertas activadas")
        edit_message(chat_id, msg_id, "🔔 Alertas de value bets activadas.")
    elif data == "alerts_off":
        supabase_request("PATCH", f"telegram_subscriptions?chat_id=eq.{chat_id}", {"value_bet_alerts": False})
        answer_callback(chat_id, cb_id, "🔕 Alertas desactivadas")
        edit_message(chat_id, msg_id, "🔕 Alertas de value bets desactivadas.")

    return jsonify({"ok": True})


@app.route("/chat", methods=["GET", "POST"])
def chat():
    if request.method == "GET":
        return jsonify({"message": "Usa POST con JSON {messages: [{role, content}]}"})
    try:
        data = request.get_json(force=True)
        messages = data.get("messages", [])
        if not messages:
            return jsonify({"error": "messages required"}), 400
        user_msg = messages[-1]["content"] if messages else ""
        context = [{"role": m["role"], "content": m["content"]} for m in messages[:-1] if m["role"] in ("user", "assistant")]
        reply = ask_ai(user_msg, context)
        return jsonify({"reply": reply})
    except Exception as e:
        log.error(f"Chat endpoint error: {e}")
        return jsonify({"error": "Internal error"}), 500


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "timestamp": datetime.utcnow().isoformat()})


@app.route("/", methods=["GET"])
def index():
    return """<h1>Chess Bets Academy Bot</h1>
<p>Bot de Telegram conectado a OpenRouter AI + Supabase.</p>
<p>Configura el webhook:</p>
<code>/setWebhook?url=https://TU_URL.onrender.com/webhook</code>"""


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    t = threading.Thread(target=broadcast_value_bets, daemon=True)
    t.start()
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
