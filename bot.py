"""
Chess Bets Academy — Telegram Bot (Python + OpenRouter)
Deploy: Render.com, Railway, o cualquier VPS
"""
import os
import json
import logging
import requests
from flask import Flask, request, jsonify

logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

app = Flask(__name__)

TELEGRAM_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
OPENROUTER_KEY = os.environ.get("OPENROUTER_API_KEY", "")
SITE_URL = os.environ.get("SITE_URL", "https://chess-bets-academy.vercel.app")

TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}"

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


def send_telegram(chat_id: int, text: str):
    """Send a message to a Telegram chat."""
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
    }
    try:
        resp = requests.post(f"{TELEGRAM_API}/sendMessage", json=payload, timeout=10)
        resp.raise_for_status()
    except Exception as e:
        log.error(f"Error sending message: {e}")


def ask_ai(user_message: str) -> str:
    """Call OpenRouter API and return the AI response text."""
    if not OPENROUTER_KEY:
        return "❌ La IA no está configurada. El administrador debe agregar OPENROUTER_API_KEY."

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
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": user_message},
                ],
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


@app.route("/webhook", methods=["POST"])
def webhook():
    """Telegram webhook handler."""
    try:
        update = request.get_json(force=True)
        message = update.get("message", {})
        text = message.get("text", "").strip()
        chat_id = message.get("chat", {}).get("id")
        username = message.get("from", {}).get("username", "")

        if not chat_id or not text:
            return jsonify({"ok": True})

        log.info(f"Message from {username or chat_id}: {text[:50]}")

        if text.startswith("/start"):
            parts = text.split(maxsplit=1)
            code = parts[1] if len(parts) > 1 else ""
            if code:
                send_telegram(chat_id, f"🔗 Código recibido: {code}.\n\nPara conectar tu cuenta, usa este código en Chess Bets Academy → Configuración → Telegram.")
            else:
                send_telegram(chat_id, """👋 ¡Bienvenido a Chess Bets Academy!

Envíame cualquier mensaje y te responderé con IA sobre:
• Análisis de partidos
• Value bets
• Trading deportivo
• Gestión de bankroll

Comandos:
/help — Ayuda
/analizar <partido> — Analizar un partido""")
            return jsonify({"ok": True})

        if text.startswith("/help"):
            send_telegram(chat_id, """🤖 <b>Chess Bets Academy Bot</b>

Comandos:
/start — Información inicial
/help — Mostrar ayuda
/analizar &lt;partido&gt; — Analizar un partido

O simplemente escribe cualquier consulta sobre apuestas deportivas.""")
            return jsonify({"ok": True})

        if text.startswith("/analizar"):
            query = text.replace("/analizar", "").strip()
            if not query:
                send_telegram(chat_id, "❌ Uso: /analizar Real Madrid vs Barcelona")
                return jsonify({"ok": True})
            send_telegram(chat_id, "🧠 Analizando...")
            reply = ask_ai(f"Analiza este partido en profundidad: {query}")
            send_telegram(chat_id, reply)
            return jsonify({"ok": True})

        # Default: AI response
        send_telegram(chat_id, "🧠 Consultando a Live Sports Bets AI...")
        reply = ask_ai(text)
        send_telegram(chat_id, reply)
        return jsonify({"ok": True})

    except Exception as e:
        log.error(f"Webhook error: {e}")
        return jsonify({"ok": True})


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/", methods=["GET"])
def index():
    return """<h1>Chess Bets Academy Bot</h1>
<p>Bot de Telegram conectado a OpenRouter AI.</p>
<p>Configura el webhook:</p>
<code>/setWebhook?url=https://TU_URL.onrender.com/webhook</code>"""


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
