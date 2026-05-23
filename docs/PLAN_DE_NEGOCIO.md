# PLAN DE NEGOCIO — CHESS BETS ACADEMY

## 1. Resumen Ejecutivo

**Chess Bets Academy** es una plataforma SaaS freemium de formación y análisis cuantitativo de apuestas deportivas en vivo, potenciada por inteligencia artificial. Opera en el mercado hispanohablante con un modelo de negocio B2C basado en suscripciones mensuales y publicidad segmentada.

**Mercado objetivo:** Traders deportivos, apostantes recreacionales y profesionales de habla hispana que buscan pasar de un enfoque especulativo a uno cuantitativo y sistemático.

**Diferenciador clave:** Agente IA propietario con contexto completo del usuario (bankroll, ELO, racha, historial) + cuotas en vivo reales de más de 10 ligas (The Odds API). Única plataforma que integra formación por grados tipo cinturón, certificaciones, simulador en vivo y un bot de Telegram con alertas de value bets.

**Estado actual:** MVP funcional desplegado en producción (chess-bets-academy.vercel.app) con 16 rutas, sistema de autenticación, pasarela de 10 grados con 29 lecciones y 87 preguntas de quiz, chat IA contextual, panel live trading con cuotas reales, perfil con estadísticas avanzadas y panel de administración.

---

## 2. Modelo de Negocio

### 2.1. Planes de Suscripción

| Plan | Precio | Ingreso Anual por Usuario | Margen Estimado |
|------|--------|---------------------------|-----------------|
| **Free** | 0 € | 0 € | — (adquisición) |
| **Pro** | 29 €/mes | 348 €/año | ~70 % |
| **Elite** | 99 €/mes | 1.188 €/año | ~80 % |

### 2.2. Fuentes de Ingreso

| Fuente | Descripción | Peso Estimado Año 3 |
|--------|-------------|---------------------|
| Suscripciones Pro | Plan principal, 29 €/mes | 55 % |
| Suscripciones Elite | Plan premium, 99 €/mes | 25 % |
| Publicidad | Anuncios en plan Free (red de afiliados de casas de apuestas, banners display) | 12 % |
| API Access | Clientes B2B que consumen la API de análisis (incluido en Elite, venta por separado a empresas) | 5 % |
| Consultoría / Webinars | Sesiones personalizadas mensuales para clientes Elite | 3 % |

### 2.3. Estructura de Costes

| Concepto | Coste Mensual | Observaciones |
|----------|---------------|---------------|
| Vercel (Hosting) | 0 € | Plan free tier (Hobby) |
| Supabase (Base de datos + Auth) | 0 € | Free tier hasta 500 MB / 50.000 usuarios |
| OpenRouter (IA) | 1-3 €/mes | Uso actual mínimo; escalará con usuarios de pago |
| The Odds API | 0 € | 500 peticiones/mes free |
| Render (Bot Telegram) | 7 €/mes | Plan Starter (7 USD/mes) |
| Dominio | 0 € | chess-bets-academy.vercel.app (subdominio Vercel) |
| **Total** | **~10 €/mes** | Coste fijo actual, escalable |

---

## 3. Previsiones Financieras (3 Años)

### 3.1. Proyección de Usuarios

| Métrica | Mes 1 | Mes 6 | Año 1 | Año 2 | Año 3 |
|---------|-------|-------|-------|-------|-------|
| Usuarios registrados | 150 | 1.200 | 5.000 | 25.000 | 100.000 |
| Usuarios activos (MAU) | 80 | 600 | 2.500 | 12.000 | 45.000 |
| Tasa conversión Free → Pro | 3 % | 5 % | 7 % | 9 % | 12 % |
| Tasa conversión Free → Elite | 0,5 % | 1 % | 1,5 % | 2 % | 3 % |
| Usuarios Pro | 2 | 30 | 175 | 1.080 | 5.400 |
| Usuarios Elite | 0 | 6 | 37 | 240 | 1.350 |

### 3.2. Ingresos por Suscripciones

| Periodo | Pro (29 €) | Elite (99 €) | Total Suscripciones |
|---------|------------|--------------|---------------------|
| **Mes 1** | 58 € | 0 € | **58 €** |
| **Mes 6** | 870 € | 594 € | **1.464 €** |
| **Año 1** | 5.075 € | 3.663 € | **8.738 €** |
| **Año 2** | 31.320 € | 23.760 € | **55.080 €** |
| **Año 3** | 156.600 € | 133.650 € | **290.250 €** |

### 3.3. Ingresos por Publicidad (Plan Free)

| Periodo | Impresiones/mes | CPM estimado | Ingreso Publicidad |
|---------|----------------|--------------|---------------------|
| Mes 1-3 | 2.400 | 2,50 € | 6 €/mes |
| Mes 4-6 | 18.000 | 2,50 € | 45 €/mes |
| Año 1 | 75.000 | 3,00 € | 225 €/mes |
| Año 2 | 360.000 | 3,50 € | 1.260 €/mes |
| Año 3 | 1.350.000 | 4,00 € | 5.400 €/mes |

### 3.4. Cuenta de Resultados Proyectada

| Concepto | Año 1 | Año 2 | Año 3 |
|----------|-------|-------|-------|
| **Ingresos Suscripciones** | 8.738 € | 55.080 € | 290.250 € |
| **Ingresos Publicidad** | 1.350 € | 15.120 € | 64.800 € |
| **Ingresos API B2B** | 0 € | 3.000 € | 18.000 € |
| **Ingresos Consultoría** | 0 € | 2.400 € | 12.000 € |
| **Ingresos Totales** | **10.088 €** | **75.600 €** | **385.050 €** |
| | | | |
| Hosting (Vercel + Render) | 84 € | 500 € | 2.500 € |
| Supabase | 0 € | 180 € | 900 € |
| OpenRouter (IA) | 600 € | 6.000 € | 30.000 € |
| The Odds API | 0 € | 600 € | 3.000 € |
| Marketing / Adquisición | 1.000 € | 10.000 € | 50.000 € |
| **Costes Totales** | **1.684 €** | **17.280 €** | **86.400 €** |
| | | | |
| **EBITDA** | **8.404 €** | **58.320 €** | **298.650 €** |
| **Margen EBITDA** | **83 %** | **77 %** | **78 %** |

### 3.5. KPIS Críticos

| KPI | Año 1 | Año 2 | Año 3 |
|-----|-------|-------|-------|
| CAC (Coste Adquisición Cliente) | 5 € | 8 € | 10 € |
| LTV (Free) | 0 € | 0 € | 0 € |
| LTV (Pro) | 150 € | 280 € | 450 € |
| LTV (Elite) | 500 € | 900 € | 1.500 € |
| Churn mensual | 12 % | 8 % | 5 % |
| Payback period | 3 meses | 2 meses | 1 mes |

---

## 4. Valor Estratégico del Agente IA

### 4.1. Posicionamiento Competitivo

| Competidor | Precio | IA Contextual | Formación Estructurada | Cuotas en Vivo | Certificaciones | Bot Telegram |
|-----------|--------|---------------|----------------------|----------------|-----------------|--------------|
| **Chess Bets Academy** | 29-99 €/mes | ✅ Completo (bankroll, ELO, racha, historial) | ✅ 10 grados tipo cinturón | ✅ 10+ ligas reales | ✅ Descargable | ✅ Value alerts |
| Tipster IA (genérico) | 15-50 €/mes | ❌ Solo picks | ❌ Sin formación | ✅ | ❌ | ✅ |
| Betfair Academy | Gratis | ❌ Sin IA | ✅ | ❌ | ❌ | ❌ |
| TradersDeApuestas | 20-40 €/mes | ❌ Sin IA | ✅ | ❌ | ❌ | ❌ |
| Cursos tradicionales | 200-500 € | ❌ Sin IA | ✅ Fijo | ❌ | ❌ | ❌ |

### 4.2. Ventajas Competitivas del Agente IA

1. **Contexto completo del usuario:** El agente conoce bankroll, ELO, XP, racha actual, historial de apuestas y plan de suscripción. Las respuestas se personalizan automáticamente al perfil de riesgo y nivel del usuario.

2. **Cuotas en vivo en tiempo real:** El agente consulta The Odds API durante la conversación para proporcionar análisis basados en cuotas actuales de más de 10 ligas europeas.

3. **Detección de value bets:** El chatbot puede identificar oportunidades de valor comparando cuotas reales con probabilidades estimadas, integrado con el sistema de alertas del bot de Telegram.

4. **Aprendizaje progresivo:** El agente refuerza los conceptos aprendidos en los grados de la academia, adaptando su nivel de respuesta al progreso real del usuario.

5. **Preguntas sugeridas inteligentes:** Seis chips contextuales que cambian según la sección y el perfil del usuario, facilitando la adopción incluso para usuarios sin experiencia técnica.

### 4.3. Monetización de la IA

El agente IA es la principal palanca de conversión Free → Pro:

- **Free:** 5 consultas/día (suficiente para probar, insuficiente para dependency)
- **Pro:** Ilimitadas (enganche por valor)
- **Elite:** Ilimitadas + modo Full con análisis en tiempo real extendido

**Estrategia:** El límite de 5 consultas/día en Free actúa como "nudge" de conversión. Los usuarios que experimentan el valor del agente IA tienden a actualizar para eliminar la restricción.

---

## 5. Estrategia de Crecimiento

### 5.1. Canales de Adquisición

| Canal | Coste | Efectividad Estimada | Prioridad |
|-------|-------|---------------------|-----------|
| SEO (contenido académico gratuito) | Bajo | Alta (largo plazo) | Crítica |
| Telegram (comunidad + alerts) | Bajo | Muy Alta | Crítica |
| YouTube (tutoriales, análisis) | Medio | Alta | Alta |
| Afiliados (tipsters, influencers) | CPA 10-20 € | Media | Media |
| Google Ads (branding + conversión) | Alto | Baja (inicial) | Baja |

### 5.2. Embudo de Conversión

```
Visitante → Registro Free (20 %)
  → Consume academia (40 %)
    → Usa chat IA (60 %)
      → Alcanza límite 5 consultas/día (30 %)
        → Actualiza a Pro (15 % de los que alcanzan el límite)
```

**Ratio de conversión total estimado: ~7 % Free → Pago.**

---

## 6. ANEXO: INFORME TÉCNICO

### 6.1. Arquitectura Web

| Componente | Tecnología | Versión | Propósito |
|-----------|-----------|---------|-----------|
| Framework | Next.js | 16.2.6 (Turbopack) | SSR, App Router, optimización |
| Lenguaje | TypeScript | 5.x | Tipado estático, seguridad |
| Estilos | Tailwind CSS | 4.x | Utility-first, responsive |
| Base de datos | Supabase (PostgreSQL) | — | Datos relacionales, RLS |
| Autenticación | Supabase Auth | — | Email/password, Google OAuth |
| IA | OpenRouter | — | Proveedor multi-modelo (GPT-4, Claude, Gemini) |
| Cuotas deportivas | The Odds API | v4 | 10+ ligas, cuotas en vivo |
| Bot Telegram | Python Flask | 3.x | Alertas, comandos, webhook |
| Hosting web | Vercel | — | Deploy automático, edge network |
| Hosting bot | Render.com | — | Web service Python |

### 6.2. Estructura del Proyecto

```
chess-bets-academy/
├── app/                    # Next.js App Router
│   ├── (auth)/             # Login, Register
│   ├── (dashboard)/        # Dashboard, Perfil, Settings, Academy, Live, Upgrade
│   ├── admin/              # Panel de administración (Sidebar + API)
│   ├── api/                # API routes (chat, odds, progress, telegram)
│   └── layout.tsx          # Root layout con Navbar, Footer, ChatBot
├── components/             # React components
│   ├── academy/            # GradoCard, LessonCard, LessonViewer, Quiz, Certificate
│   ├── admin/              # SidebarNav
│   ├── ai-agent/           # ChatBot, ChatMessage, SuggestedQuestions
│   ├── layout/             # Navbar, Footer
│   ├── live/               # LiveEventCard, ValueBetCard
│   └── ui/                 # Button, StatCard
├── lib/                    # Lógica de negocio
│   ├── academy/            # Contenido de grados y lecciones (29 lecciones, 87 quizzes)
│   ├── admin/              # Servicio de administración
│   ├── ai-quota/           # Control de límites diarios de IA
│   ├── membership/         # Planes de suscripción (Free/Pro/Elite)
│   ├── odds/               # Cliente de Odds API, calculadora de value bets
│   ├── openrouter/         # Agente IA (system prompt, contexto usuario, odds)
│   ├── stats/              # Estadísticas de dashboard
│   └── supabase/           # Clientes Supabase (server, browser, admin)
├── supabase/migrations/    # 6 migraciones SQL
│   ├── 00001_initial.sql
│   ├── 00002_betting_history.sql
│   ├── 00003_telegram_subscriptions.sql
│   ├── 00004_user_preferences.sql
│   ├── 00005_profile_enhancements.sql
│   └── 00006_ai_query_limits.sql
└── bot.py                  # Bot Telegram (Render.com)
```

### 6.3. Agente IA: Arquitectura del Sistema

```
Usuario → Chat UI (componente React)
  → POST /api/chat
    → checkAiQuota()                    # Verifica límite diario (Free: 5/día)
    → buildUserContext()                # Bankroll, ELO, XP, racha, plan, historial
    → buildOddsContext()                # Cuotas en vivo de 10+ ligas
    → chatWithAgent(messages, ctx)      # POST OpenRouter con system prompt dinámico
      → OpenRouter (GPT-4o / Claude)
        → Response stream (SSE)
          → incrementAiQuota()          # Incrementa contador tras respuesta exitosa
```

**System prompt dinámico:** Se construye en tiempo real inyectando:
- Datos del usuario (nombre, bankroll, ELO, XP, racha, plan)
- Contexto de cuotas (eventos activos, mejores cuotas)
- Instrucciones de personalidad (entrenador cuantitativo, estilo socrático, español)

### 6.4. Bot de Telegram

| Aspecto | Detalle |
|---------|---------|
| Lenguaje | Python 3.11+ |
| Framework | Flask + python-telegram-bot (webhook) |
| Base de datos | Supabase REST (misma BD que la web) |
| Comandos | `/start`, `/connect`, `/help`, `/analizar`, `/alerts`, `/resumen`, `/stop` |
| Value bets | Hilo background cada 5 minutos |
| Hosting | Render.com (Starter, ~7 €/mes) |
| Webhook | POST `chessbetsai.onrender.com/webhook` |

### 6.5. Seguridad y Control de Acceso

- **Proxy de rutas:** Middleware en `proxy.ts` protege rutas autenticadas
- **RLS en Supabase:** Row-Level Security en todas las tablas
- **Roles:** Admin / Student, con paneles separados
- **Auth:** Sesiones JWT con refresh automático
- **API Keys:** ODDS_API_KEY, OPENROUTER_API_KEY, SUPABASE_SERVICE_KEY almacenadas en variables de entorno de Vercel

### 6.6. Despliegue y CI/CD

| Plataforma | Servicio | Trigger |
|-----------|----------|---------|
| Vercel | Web (Next.js) | Push a rama principal |
| Render.com | Bot (Python) | Push a rama principal |
| Supabase | DB, Auth, Storage | Migraciones manuales vía SQL Editor |

### 6.7. Stack Completo de Dependencias

**Web (Node.js 22):**
- next@16, react@19, typescript@5
- @supabase/supabase-js, @supabase/ssr
- tailwindcss@4, lucide-react
- OpenRouter API (streaming SSE)

**Bot (Python 3.11):**
- flask, python-telegram-bot
- supabase (REST client), requests
- threading, schedule

**Infraestructura:**
- Vercel (serverless edge + Node.js)
- Supabase (PostgreSQL 15 + Auth + Storage)
- Render.com (Web Service Python)
- The Odds API (cuotas deportivas)
- OpenRouter (IA Gateway)

---

*Documento generado el 23 de mayo de 2026. Proyecciones basadas en métricas de plataformas SaaS educativas comparables y datos de mercado del sector de apuestas deportivas online en España y Latinoamérica.*
