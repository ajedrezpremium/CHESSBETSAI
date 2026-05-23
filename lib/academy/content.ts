export interface QuizQuestion {
  pregunta: string
  opciones: string[]
  correcta: number
  explicacion: string
}

export interface Lesson {
  id: string
  gradoId: number
  titulo: string
  descripcion: string
  contenido: string
  duracion: string
  order: number
  quiz: QuizQuestion[]
}

export interface GradoData {
  id: number
  nombre: string
  descripcion: string
  icono: string
  color: string
  lecciones: Lesson[]
}

const leccionesGrado1: Lesson[] = [
  {
    id: '1-1',
    gradoId: 1,
    titulo: '¿Qué es una cuota?',
    descripcion: 'Entiende el concepto fundamental de las apuestas deportivas.',
    duracion: '15 min',
    order: 1,
    quiz: [
      {
        pregunta: '¿Qué representa la cuota en una apuesta deportiva?',
        opciones: [
          'La probabilidad real del evento',
          'La probabilidad implícita calculada por la casa',
          'El dinero que vas a ganar seguro',
          'El margen de la casa',
        ],
        correcta: 1,
        explicacion: 'La cuota representa la probabilidad implícita que la casa de apuestas asigna a un resultado, no necesariamente la probabilidad real.',
      },
      {
        pregunta: 'Si una cuota es 2.10, ¿cuál es su probabilidad implícita?',
        opciones: [
          '21%',
          '47.6%',
          '52.4%',
          '10%',
        ],
        correcta: 1,
        explicacion: 'La probabilidad implícita se calcula como 1 / cuota × 100 = 1 / 2.10 × 100 = 47.6%.',
      },
      {
        pregunta: '¿Qué tipo de cuota se usa comúnmente en Europa?',
        opciones: [
          'Fraccionarias',
          'Americanas',
          'Decimales',
          'Hong Kong',
        ],
        correcta: 2,
        explicacion: 'En Europa se usan las cuotas decimales, donde multiplicas tu stake directamente por la cuota.',
      },
    ],
    contenido: `## ¿Qué es una cuota?

La **cuota** es el número que la casa de apuestas asigna a un resultado. Representa:

- La **probabilidad implícita** que la casa calcula para ese resultado
- El **pago potencial** que recibirás si aciertas

### Ejemplo práctico

Imagina un partido entre el Real Madrid y el Barcelona:

| Resultado | Cuota |
|-----------|-------|
| Real Madrid | 2.10 |
| Empate | 3.40 |
| Barcelona | 3.80 |

Si apostamos 10€ al Real Madrid a cuota 2.10:
- **Ganancia neta**: 10€ × 2.10 = 21€ (11€ de beneficio)
- **Probabilidad implícita**: 1 / 2.10 = 47.6%

### Tipos de cuotas

- **Decimales** (Europa): 2.10 — multiplicas tu stake directamente
- **Fraccionarias** (UK): 11/10 — ganancia neta sobre el stake
- **Americanas**: +110 o -110 — positivas indican ganancia sobre 100$

### Fórmula clave

> **Probabilidad Implícita (%) = 1 / Cuota × 100**

Esta fórmula es la base de todo. Sin ella, no puedes detectar valor.`,
  },
  {
    id: '1-2',
    gradoId: 1,
    titulo: 'Value Betting',
    descripcion: 'Aprende a detectar apuestas con valor esperado positivo.',
    duracion: '20 min',
    order: 2,
    quiz: [
      {
        pregunta: '¿Cuándo ocurre una value bet?',
        opciones: [
          'Cuando la cuota es mayor que 2.00',
          'Cuando tu probabilidad estimada es mayor que la probabilidad implícita',
          'Cuando el equipo favorito va ganando',
          'Cuando apuestas en vivo',
        ],
        correcta: 1,
        explicacion: 'Una value bet ocurre cuando tu probabilidad estimada es mayor que la probabilidad implícita de la cuota.',
      },
      {
        pregunta: '¿Cuál es la fórmula del valor esperado?',
        opciones: [
          'Valor = Cuota / Probabilidad Real',
          'Valor = (Probabilidad Real × Cuota) - 1',
          'Valor = Probabilidad Real - Cuota',
          'Valor = 1 / Cuota × 100',
        ],
        correcta: 1,
        explicacion: 'Valor = (Probabilidad Real × Cuota) - 1. Si el resultado es positivo, tienes una value bet.',
      },
      {
        pregunta: '¿Por qué existen las value bets?',
        opciones: [
          'Porque las casas quieren regalar dinero',
          'Por errores del bookmaker y sobre-reacción del público',
          'Porque siempre hay un equipo mejor que otro',
          'Porque las cuotas son aleatorias',
        ],
        correcta: 1,
        explicacion: 'Las value bets existen por errores del bookmaker, sobre-reacción del público y otros factores del mercado.',
      },
    ],
    contenido: `## Value Betting

Una **value bet** ocurre cuando tu probabilidad estimada es **mayor** que la probabilidad implícita de la cuota.

### La fórmula del valor

> **Valor = (Probabilidad Real × Cuota) - 1**

Si el resultado es **positivo**, tienes una value bet.

### Ejemplo

Tu análisis indica que el Real Madrid tiene un **55%** de probabilidad de ganar.

La casa ofrece cuota **2.10** (probabilidad implícita = 47.6%).

**Cálculo**: (0.55 × 2.10) - 1 = **0.155 = +15.5% EV**

Esto significa que por cada 10€ apostados, tu expectativa matemática es de +1.55€.

### ¿Por qué existen las value bets?

1. **Las casas se protegen**: Añaden margen y a veces se desvían
2. **Sobre-reacción del público**: El dinero del público mueve cuotas
3. **Errores del bookmaker**: Nadie es perfecto
4. **Información privilegiada**: Tú ves algo que la casa no considera

### Ejercicio práctico

> Cuota: 3.50 | Tu probabilidad estimada: 30%
> ¿Es value? Calcula: (0.30 × 3.50) - 1 = 0.05 = +5% → **Sí, es value**`,
  },
  {
    id: '1-3',
    gradoId: 1,
    titulo: 'Gestión de Bankroll',
    descripcion: 'El pilar más importante para la sostenibilidad a largo plazo.',
    duracion: '20 min',
    order: 3,
    quiz: [
      {
        pregunta: '¿Qué porcentaje del bankroll se recomienda apostar como máximo en una sola apuesta?',
        opciones: [
          '10-15%',
          '1-5%',
          '20-30%',
          '50%',
        ],
        correcta: 1,
        explicacion: 'La regla de oro es nunca apostar más del 1-5% del bankroll en una sola apuesta.',
      },
      {
        pregunta: '¿Qué método de stake ajusta el tamaño según el valor detectado?',
        opciones: [
          'Flat Betting',
          'Stake por nivel de confianza',
          'Kelly Criterion',
          'Martingala',
        ],
        correcta: 2,
        explicacion: 'El Kelly Criterion ajusta el stake según el valor detectado usando la fórmula: (Probabilidad Real × Cuota - 1) / (Cuota - 1).',
      },
      {
        pregunta: '¿Por qué se recomienda usar Kelly fraccionado en lugar de Kelly completo?',
        opciones: [
          'Porque Kelly completo es demasiado conservador',
          'Porque Kelly completo es muy agresivo',
          'Porque Kelly completo no funciona',
          'Porque Kelly fraccionado da más beneficio',
        ],
        correcta: 1,
        explicacion: 'Kelly completo es muy agresivo, por eso se recomienda usar Kelly fraccionado al 25-50%.',
      },
    ],
    contenido: `## Gestión de Bankroll

Sin una gestión de bankroll disciplinada, **vas a perder todo tu dinero**, incluso si aciertas el 60% de tus apuestas.

### Regla de oro

> **Nunca apuestes más del 1-5% de tu bankroll en una sola apuesta.**

### Métodos de stake

#### 1. Flat Betting (Recomendado para principiantes)
Apuestas siempre la misma cantidad fija.

- Bankroll: 1000€
- Stake fijo: 20€ (2%)
- Ventaja: Simplicidad absoluta
- Desventaja: No escala con tu confianza

#### 2. Kelly Criterion (Avanzado)
Ajusta el stake según el valor detectado.

> **Stake % = (Probabilidad Real × Cuota - 1) / (Cuota - 1)**

Ejemplo: Prob real 55%, cuota 2.10
- (0.55 × 2.10 - 1) / (2.10 - 1)
- (1.155 - 1) / 1.10
- 0.155 / 1.10 = **14% del bankroll**

⚠️ **Kelly completo es muy agresivo**. Usa **Kelly fraccionado** (25-50%).

#### 3. Stake por nivel de confianza

| Confianza | Stake |
|-----------|-------|
| Baja | 0.5% |
| Media | 1% |
| Alta | 2% |
| Muy alta | 3% |

### Reglas de supervivencia

1. No persigas pérdidas (tilt)
2. No dobles después de perder (Martingala)
3. Recalcula tu bankroll semanalmente
4. Retira beneficios periódicamente`,
  },
  {
    id: '1-4',
    gradoId: 1,
    titulo: 'Probabilidades y Mercados',
    descripcion: 'Domina los diferentes mercados de apuestas y su interpretación.',
    duracion: '15 min',
    order: 4,
    quiz: [
      {
        pregunta: '¿Qué significa "X" en el mercado 1X2?',
        opciones: [
          'Victoria local',
          'Victoria visitante',
          'Empate',
          'Doble oportunidad',
        ],
        correcta: 2,
        explicacion: 'En el mercado 1X2, 1 es victoria local, X es empate y 2 es victoria visitante.',
      },
      {
        pregunta: '¿Qué significa un hándicap asiático -1.5?',
        opciones: [
          'El equipo debe perder por 2+ goles',
          'El equipo debe ganar por 2+ goles',
          'El equipo puede perder por 1 gol y la apuesta gana',
          'El equipo debe empatar',
        ],
        correcta: 1,
        explicacion: 'Hándicap -1.5 significa que el equipo debe ganar por 2 o más goles para que la apuesta sea ganadora.',
      },
      {
        pregunta: 'Si las probabilidades implícitas suman 103.3%, ¿cuál es el margen de la casa?',
        opciones: [
          '0%',
          '3.3%',
          '6.6%',
          '100%',
        ],
        correcta: 1,
        explicacion: 'El margen se calcula como la suma de probabilidades implícitas menos 100%: 103.3% - 100% = 3.3%.',
      },
    ],
    contenido: `## Probabilidades y Mercados

### Mercados principales

#### 1X2 (Resultado final)
| Símbolo | Significado |
|---------|-------------|
| 1 | Victoria local |
| X | Empate |
| 2 | Victoria visitante |

#### Hándicap Asiático
Nivela el campo quitando o dando ventaja.

- **Hándicap -1.5**: El equipo debe ganar por 2+ goles
- **Hándicap +1.5**: El equipo puede perder por 1 gol y la apuesta gana

#### Más/Menos (Totales)
- **Over 2.5 goles**: Más de 2.5 goles en el partido
- **Under 2.5 goles**: Menos de 2.5 goles

#### Mercados Live (En Vivo)
Los más rentables para value betting:
- **Próximo gol**
- **Córner siguiente**
- **Tarjeta siguiente**
- **Resultado al descanso**

### El margen de la casa

Toda cuota tiene un margen implícito:

> **Margen = Suma de probabilidades implícitas - 100%**

Para cuotas 2.10 - 3.40 - 3.80:
- 47.6% + 29.4% + 26.3% = **103.3%**
- Margen: **3.3%**

Un margen bajo (<3%) es bueno para el apostador.`,
  },
  {
    id: '1-5',
    gradoId: 1,
    titulo: 'Registro y Primeros Pasos',
    descripcion: 'Configura tu cuenta y prepara tu entorno de trabajo.',
    duracion: '10 min',
    order: 5,
    quiz: [
      {
        pregunta: '¿Cuál es la primera actividad recomendada para tu primera semana?',
        opciones: [
          'Apostar dinero real',
          'Completar Grado 1, Lecciones 1-2',
          'Crear un modelo de ML',
          'Buscar sindicatos',
        ],
        correcta: 1,
        explicacion: 'El día 1 de tu primera semana debes completar Grado 1, Lecciones 1-2.',
      },
      {
        pregunta: '¿Cuál de estas NO es una herramienta recomendada?',
        opciones: [
          'Odds Portal',
          'FlashScore',
          'CoinMarketCap',
          'SofaScore',
        ],
        correcta: 2,
        explicacion: 'CoinMarketCap es para criptomonedas, no para apuestas deportivas.',
      },
      {
        pregunta: '¿Cuál es la mentalidad inicial correcta?',
        opciones: [
          'Voy a hacerme rico rápido',
          'Voy a aprender un oficio, no hacerme rico rápido',
          'Voy a apostar todo en un solo partido',
          'Voy a seguir a tipsters famosos',
        ],
        correcta: 1,
        explicacion: 'La mentalidad es: "No voy a hacerme rico rápido. Voy a aprender un oficio."',
      },
    ],
    contenido: `## Registro y Primeros Pasos

### Checklist inicial

- [ ] Crea tu cuenta en Chess Bets Academy
- [ ] Configura tu perfil (nombre, avatar)
- [ ] Familiarízate con el dashboard
- [ ] Lee las reglas de la comunidad
- [ ] Establece tu bankroll inicial (virtual)
- [ ] Activa las notificaciones

### Tu primera semana

| Día | Actividad |
|-----|-----------|
| 1 | Completar Grado 1, Lecciones 1-2 |
| 2 | Lección 3 + ejercicios |
| 3 | Lección 4-5 + test |
| 4 | Simulador: 10 apuestas virtuales |
| 5 | Revisar resultados + análisis |
| 6-7 | Repaso y Grado 2 |

### Herramientas recomendadas

- **Odds Portal**: Comparador de cuotas
- **FlashScore**: Resultados en vivo
- **SofaScore**: Estadísticas avanzadas
- **Chess Bets AI**: Tu asistente personal

### Mentalidad inicial

> "No voy a hacerme rico rápido. Voy a aprender un oficio."

Esta es la diferencia entre un apostador y un trader profesional.`,
  },
]

const leccionesGrado2: Lesson[] = [
  {
    id: '2-1',
    gradoId: 2,
    titulo: 'Psicología del Apostador',
    descripcion: 'Conoce los sesgos cognitivos que te hacen perder dinero.',
    duracion: '20 min',
    order: 1,
    quiz: [
      {
        pregunta: '¿Cuál es la principal causa de que el 80% de los apostadores pierda dinero?',
        opciones: [
          'Falta de conocimiento técnico',
          'Falta de control emocional',
          'Malas cuotas',
          'Poca variedad de mercados',
        ],
        correcta: 1,
        explicacion: 'El 80% pierde dinero no por falta de conocimiento, sino por falta de control emocional.',
      },
      {
        pregunta: '¿En qué consiste el sesgo de confirmación?',
        opciones: [
          'Buscar información que contradiga tu apuesta',
          'Buscar información que confirme tu apuesta e ignorar la que la contradice',
          'Apostar siempre al equipo local',
          'Confiar ciegamente en las cuotas de la casa',
        ],
        correcta: 1,
        explicacion: 'El sesgo de confirmación te lleva a buscar información que confirme tu apuesta e ignorar la que la contradice.',
      },
      {
        pregunta: '¿Cuánto duele perder 10€ en comparación con ganar 10€?',
        opciones: [
          'Lo mismo',
          'La mitad',
          'El doble',
          'No duele si tienes bankroll grande',
        ],
        correcta: 2,
        explicacion: 'La aversión a la pérdida hace que perder 10€ duela el doble de lo que alegra ganar 10€.',
      },
    ],
    contenido: `## Psicología del Apostador

### El enemigo eres tú

El 80% de los apostadores pierde dinero no por falta de conocimiento, sino por **falta de control emocional**.

### Sesgos cognitivos mortales

#### 1. Sesgo de Confirmación
Buscas información que confirme tu apuesta e ignoras la que la contradice.

**Antídoto**: Busca activamente argumentos en contra.

#### 2. Sesgo de Resultado
Juzgas la calidad de una decisión por su resultado, no por el proceso.

**Ejemplo**: Haces una apuesta mala (+EV) pero pierdes — era buena decisión. Haces una apuesta mala (-EV) y ganas — era mala decisión.

#### 3. Falacia del Jugador
"Ya perdió 5 veces seguidas, tiene que ganar ahora."

**Realidad**: Los eventos independientes no tienen memoria. Una moneda no "recuerda" haber caído en cara 5 veces.

#### 4. Aversión a la Pérdida
Perder 10€ duele el doble de lo que alegra ganar 10€.

**Consecuencia**: Cierras apuestas ganadoras demasiado pronto y dejas correr las perdedoras.

### Ejercicio de autoevaluación

Pregúntate antes de cada apuesta:
1. ¿Estoy apostando por aburrimiento?
2. ¿Estoy persiguiendo una pérdida?
3. ¿Tengo un sesgo emocional hacia este equipo?
4. ¿He hecho el análisis objetivo?`,
  },
  {
    id: '2-2',
    gradoId: 2,
    titulo: 'Control del Tilt',
    descripcion: 'Aprende a identificar y gestionar el tilt emocional.',
    duracion: '15 min',
    order: 2,
    quiz: [
      {
        pregunta: '¿Qué es el tilt en el contexto de apuestas?',
        opciones: [
          'Una estrategia de apuestas avanzada',
          'Un estado emocional negativo que lleva a decisiones irracionales',
          'Un tipo de cuota en exchanges',
          'Una herramienta de análisis',
        ],
        correcta: 1,
        explicacion: 'El tilt es un estado emocional negativo que te lleva a tomar decisiones irracionales.',
      },
      {
        pregunta: '¿Cuál es el primer paso del protocolo anti-tilt?',
        opciones: [
          'Aumentar el stake para recuperarte',
          'Reconocer que estás en tilt',
          'Cerrar la app para siempre',
          'Hacer más apuestas para diluir las pérdidas',
        ],
        correcta: 1,
        explicacion: 'El primer paso es reconocerlo: "Estoy en tilt".',
      },
      {
        pregunta: '¿Qué debes hacer inmediatamente después de reconocer el tilt?',
        opciones: [
          'Apostar más para recuperarte rápido',
          'Alejarte de la app por al menos 30 minutos',
          'Cambiar de deporte',
          'Revisar estadísticas de otros partidos',
        ],
        correcta: 1,
        explicacion: 'El segundo paso es alejarte: cierra la app por al menos 30 minutos.',
      },
    ],
    contenido: `## Control del Tilt

### ¿Qué es el tilt?

Estado emocional negativo que te lleva a tomar decisiones irracionales. Viene del póker, pero en apuestas deportivas es igual de devastador.

### Señales de tilt

**Físicas**: Aumento de ritmo cardíaco, manos sudorosas, tensión muscular

**Conductuales**:
- Aumentas el stake para "recuperarte"
- Apuestas más seguido
- Apuestas en mercados que no conoces
- Entras y cierras posiciones sin análisis
- Revisas el teléfono obsesivamente

### Protocolo anti-tilt

1. **Reconócelo**: "Estoy en tilt"
2. **Aléjate**: Cierra la app. 30 minutos mínimo
3. **Re-evalúa**: ¿Qué provocó el tilt? (una pérdida, una mala racha, algo personal)
4. **Vuelve frío**: Si aún sientes emociones fuertes, espera un día
5. **Analiza**: ¿Había value en esa apuesta que perdiste? Si sí, era buena decisión aunque perdieras

### El diario emocional

Lleva un registro de tu estado emocional junto a cada apuesta:

| Fecha | Apuesta | Stake | Estado emocional | ¿Tilt? |
|-------|---------|-------|------------------|--------|
| 01/05 | Madrid @ 2.10 | 2% | Neutro | No |

> "Las pérdidas no duelen si confías en el proceso."
> — Chess Bets Academy`,
  },
  {
    id: '2-3',
    gradoId: 2,
    titulo: 'Disciplina y Rutina',
    descripcion: 'Crea hábitos de trader profesional.',
    duracion: '15 min',
    order: 3,
    quiz: [
      {
        pregunta: '¿Cuánto tiempo antes del partido debe comenzar tu rutina de análisis?',
        opciones: [
          '30 minutos',
          '1 hora',
          '2 horas',
          'Justo antes del partido',
        ],
        correcta: 2,
        explicacion: 'La rutina del trader profesional comienza 2 horas antes del partido.',
      },
      {
        pregunta: '¿Cuál es el stake máximo recomendado para apuestas normales?',
        opciones: [
          '1%',
          '3%',
          '5%',
          '10%',
        ],
        correcta: 1,
        explicacion: 'La regla de disciplina indica stake máximo del 3% en apuestas normales y 5% en altísima confianza.',
      },
      {
        pregunta: '¿Cuántas apuestas al día se recomiendan como máximo?',
        opciones: [
          '1-2',
          '3-5',
          '10-15',
          'Las que quieras mientras sean value',
        ],
        correcta: 1,
        explicacion: 'Se recomienda un máximo de 3-5 apuestas al día, priorizando calidad sobre cantidad.',
      },
    ],
    contenido: `## Disciplina y Rutina

### La rutina del trader profesional

#### Antes del partido (2 horas antes)
1. Revisar alineaciones y lesiones de última hora
2. Analizar cuotas en 3 casas diferentes
3. Calcular probabilidad real (modelo propio o estimación)
4. Detectar value bets con la fórmula
5. Anotar las picks en tu registro

#### Durante el partido
1. No mires las cuotas en vivo constantemente
2. Anota observaciones tácticas
3. Si es live trading, ejecuta tu plan (no improvises)

#### Después del partido
1. Registra el resultado (ganes o pierdas)
2. Anota qué aprendiste
3. No hagas "post-mortem emocional"

### Reglas de disciplina

1. **Stake máximo del 3%** en apuestas normales, 5% en altísima confianza
2. **Máximo 3-5 apuestas al día** (calidad > cantidad)
3. **No más de 2 apuestas simultáneas en vivo**
4. **Espera 30 minutos después de una pérdida** antes de la siguiente apuesta

### El registro de apuestas

Mantén un registro impecable. Si no lo mides, no lo mejoras.

| # | Fecha | Deporte | Partido | Mercado | Cuota | Stake | Prob Real | EV | Resultado | Bankroll |
|---|-------|---------|---------|---------|-------|-------|-----------|----|-----------|----------|`,
  },
  {
    id: '2-4',
    gradoId: 2,
    titulo: 'Test de Psicología',
    descripcion: 'Pon a prueba tu preparación mental.',
    duracion: '10 min',
    order: 4,
    quiz: [
      {
        pregunta: 'Has perdido 3 apuestas seguidas. Según la lección, ¿qué deberías hacer?',
        opciones: [
          'Aumentar el stake para recuperarte',
          'Seguir con tu plan normal o dejar de apostar por hoy',
          'Apostar a más partidos simultáneamente',
          'Cambiar de deporte',
        ],
        correcta: 1,
        explicacion: 'Perseguir pérdidas es el camino a la ruina. Debes seguir tu plan o detenerte.',
      },
      {
        pregunta: 'Si tu equipo favorito juega y ves una cuota alta, ¿qué deberías hacer?',
        opciones: [
          'Apostar porque los conoces bien',
          'Analizar objetivamente si hay value o no apostar por sesgo',
          'Apostar el doble por seguridad',
          'Seguir a otros apostadores',
        ],
        correcta: 1,
        explicacion: 'Apostar a tu equipo introduce sesgo emocional. Debes analizar objetivamente o no apostar.',
      },
      {
        pregunta: 'Ganas 5 apuestas seguidas. ¿Cuál es la mejor reacción?',
        opciones: [
          'Aumentar stakes porque estás en racha',
          'Seguir igual o retirar beneficios',
          'Apostar todo tu bankroll',
          'Compartir tus picks en redes sociales',
        ],
        correcta: 1,
        explicacion: 'El éxito pasado no garantiza el futuro. Debes seguir tu plan igual o retirar beneficios.',
      },
    ],
    contenido: `## Test de Psicología

Responde estas preguntas con honestidad:

### Pregunta 1
Has perdido 3 apuestas seguidas. ¿Qué haces?
- A) Aumento el stake para recuperarme rápido
- B) Sigo con mi plan normal
- C) Dejo de apostar por hoy

### Pregunta 2
Tu equipo favorito juega y ves una cuota alta. ¿Qué haces?
- A) Apuesto porque "los conozco bien"
- B) Analizo objetivamente si hay value
- C) No apuesto a mi equipo por sesgo

### Pregunta 3
Ganas 5 apuestas seguidas. ¿Qué haces?
- A) Aumento stakes porque "estoy on fire"
- B) Sigo exactamente igual
- C) Retiro beneficios

### Respuestas correctas

1. **B o C** — Perseguir pérdidas es el camino a la ruina
2. **B o C** — Apostar a tu equipo introduce sesgo emocional
3. **B o C** — El éxito pasado no garantiza el futuro

**Autoevaluación**: Si respondiste "A" en alguna, necesitas trabajar tu disciplina antes de apostar dinero real.`,
  },
]

const leccionesGrado3: Lesson[] = [
  {
    id: '3-1',
    gradoId: 3,
    titulo: 'Momentum en Vivo',
    descripcion: 'Aprende a leer el flujo del partido y detectar cambios de tendencia.',
    duracion: '20 min',
    order: 1,
    quiz: [
      {
        pregunta: '¿Qué es el momentum en un partido?',
        opciones: [
          'El marcador actual del partido',
          'La tendencia momentánea de un equipo durante el partido',
          'La cantidad de goles esperados',
          'La posesión total del balón',
        ],
        correcta: 1,
        explicacion: 'El momentum es la tendencia momentánea de un equipo durante un partido, que no siempre coincide con el marcador.',
      },
      {
        pregunta: '¿Cuál es una señal de momentum positivo a favor de un equipo?',
        opciones: [
          'Llevan 10+ minutos sin disparar a puerta',
          'El portero rival hace 2 paradas seguidas',
          'El rival domina la posesión al 65%',
          'Una tarjeta roja',
        ],
        correcta: 1,
        explicacion: 'Que el portero rival haga 2 paradas seguidas indica que tu equipo está generando ocasiones y tiene momentum.',
      },
      {
        pregunta: '¿Qué rango de minutos suele ser crítico para detectar oportunidades en vivo?',
        opciones: [
          'Minuto 1-15',
          'Minuto 30-45',
          'Minuto 70-80',
          'Minuto 85-90',
        ],
        correcta: 2,
        explicacion: 'El minuto 70-80 suele ser crítico, donde la fatiga y los cambios tácticos crean oportunidades de value.',
      },
    ],
    contenido: `## Momentum en Vivo

### ¿Qué es el momentum?

El **momentum** es la tendencia momentánea de un equipo durante un partido. No siempre coincide con el marcador.

### Señales de momentum positivo

**A favor del equipo**:
- 3+ ataques consecutivos en el área rival
- 2+ córners en 5 minutos
- El portero rival hace 2 paradas seguidas
- El público presiona al árbitro
- El equipo contrario pierde tiempo

**En contra del equipo**:
- Llevan 10+ minutos sin disparar a puerta
- El rival domina la posesión (65%+)
- Lesión que desestructura al equipo
- Tarjeta roja o amarilla clave

### Cómo explotar el momentum

Cuando detectes momentum claro de un equipo:
1. Si la cuota del equipo con momentum sube → **value bet**
2. Si la cuota del equipo dominado baja artificialmente → **contraria**
3. Espera el momento exacto (minuto 70-80 suele ser crítico)

### Ejemplo práctico

**Partido**: Equipo A 1-0 Equipo B (minuto 65)
**Lo que ves**: El Equipo B domina, 70% posesión, 3 ocasiones claras
**Cuota actual**: Empate a 5.00 (demasiado alta para el dominio)
**Acción**: Value bet al empate

> El marcador no siempre refleja quién está dominando.`,
  },
  {
    id: '3-2',
    gradoId: 3,
    titulo: 'Lectura Táctica',
    descripcion: 'Analiza formaciones, cambios tácticos y su impacto en las cuotas.',
    duracion: '20 min',
    order: 2,
    quiz: [
      {
        pregunta: '¿Qué formación se considera defensiva y orientada al contraataque?',
        opciones: [
          '4-3-3',
          '5-3-2',
          '4-4-2',
          '3-4-3',
        ],
        correcta: 1,
        explicacion: 'La formación 5-3-2 es defensiva y orientada al contraataque, mientras que 4-3-3 es ofensiva y 4-4-2 es equilibrada.',
      },
      {
        pregunta: '¿Qué impacto tiene una tarjeta roja en la efectividad de un equipo?',
        opciones: [
          'No tiene impacto significativo',
          'El equipo pierde aproximadamente un 30% de efectividad',
          'El equipo juega mejor con 10',
          'La efectividad se duplica',
        ],
        correcta: 1,
        explicacion: 'Una tarjeta roja reduce la efectividad del equipo aproximadamente un 30%.',
      },
      {
        pregunta: '¿Qué significa PPDA en el análisis táctico?',
        opciones: [
          'Goles esperados por partido',
          'Presión del equipo (bajo = mucha presión)',
          'Porcentaje de pases acertados',
          'Posesión en área rival',
        ],
        correcta: 1,
        explicacion: 'PPDA mide la presión del equipo; un valor bajo indica mucha presión.',
      },
    ],
    contenido: `## Lectura Táctica

### Elementos tácticos clave

#### 1. Formación inicial
- **4-3-3**: Ofensivo, presión alta
- **5-3-2**: Defensivo, contraataque
- **4-4-2**: Equilibrado

#### 2. Cambios tácticos en vivo

| Cambio | Señal | Impacto en cuotas |
|--------|-------|-------------------|
| Defensa → 3 atrás | Busca el empate | Sube cuota local |
| Delantero por defensa | Todo o nada | Sube over/under |
| Doble pivote → único | Más riesgo | Sube cuota visitante |

#### 3. Lesiones y tarjetas
- Tarjeta roja: El equipo pierde ~30% de efectividad
- Lesión del creador de juego: Impacto enorme en cuotas
- Lesión del portero: Sube over/under

#### 4. Gestión del partido
- Equipo que se conforma con el empate: Baja intensidad
- Equipo que necesita ganar: Presión alta, más riesgos

### Indicadores tácticos avanzados

- **PPDA**: Presión del equipo (bajo = mucha presión)
- **Expected Threat (xT)**: Amenaza ofensiva
- **Campo inclinado**: % de ataques en un lado
- **Línea defensiva**: Altura media de la defensa

### Patrón de apuesta táctica

Detectas que el equipo visitante:
- Se ha replegado (línea defensiva baja)
- No presiona (PPDA alto)
- El local domina pero no marca

**Acción**: Cuota del local ha subido artificialmente → value.`,
  },
  {
    id: '3-3',
    gradoId: 3,
    titulo: 'Análisis Contextual',
    descripcion: 'Factores externos que afectan el rendimiento de los equipos.',
    duracion: '15 min',
    order: 3,
    quiz: [
      {
        pregunta: '¿Qué efecto suele tener un partido de Champions en el rendimiento del siguiente partido de liga?',
        opciones: [
          'Mejora el rendimiento',
          'Posible bajón físico por fatiga',
          'No tiene efecto',
          'Solo afecta si pierden',
        ],
        correcta: 1,
        explicacion: 'Un equipo que jugó Champions puede tener un bajón físico en el siguiente partido de liga.',
      },
      {
        pregunta: '¿Cómo afecta la lluvia intensa al número de goles esperados?',
        opciones: [
          'Aumenta los goles',
          'Reduce los goles y aumenta los errores',
          'No afecta',
          'Solo afecta en el primer tiempo',
        ],
        correcta: 1,
        explicacion: 'La lluvia intensa tiende a reducir los goles y aumentar los errores.',
      },
      {
        pregunta: '¿Cuántos factores contextuales relevantes se necesitan para que el contexto sea significativo?',
        opciones: [
          '1 o más',
          '3 o más',
          '5 o más',
          'Ninguno, el contexto no importa',
        ],
        correcta: 1,
        explicacion: 'Si respondes "sí" a 3 o más preguntas de la lista mental pre-apuesta, el contexto es relevante.',
      },
    ],
    contenido: `## Análisis Contextual

### Factores pre-partido

#### 1. Calendario y fatiga
- Partido cada 3 días → rotación esperada
- Equipo jugó Champions → posible bajón físico
- Viajes largos (Europa League, Conference)

#### 2. Motivación
- Derby → más intensidad, más tarjetas
- Partido intrascendente → menos intensidad
- Final de copa → tensión, menos goles
- Descenso/Champions en juego → presión extra

#### 3. Clima
- Lluvia intensa → menos goles, más errores
- Viento → dificulta pases largos
- Calor extremo → menor ritmo en segunda parte

#### 4. Árbitro
- Árbitro tarjetero → más de 4.5 tarjetas
- Árbitro permisivo → más juego duro
- Historial del árbitro con los equipos

### Factores durante el partido

- **Minuto 30-45**: Zona de alta tensión, posibles goles
- **Minuto 75-90**: Fatiga máxima, errores defensivos
- **Descanso**: Posibles ajustes tácticos del entrenador

### Lista mental pre-apuesta

1. ¿Hay lesiones importantes?
2. ¿Calendario cargado?
3. ¿Motivación real?
4. ¿Clima adverso?
5. ¿Árbitro significativo?

Si respondes "sí" a 3+, el contexto es relevante para tu análisis.`,
  },
]

const leccionesGrado4: Lesson[] = [
  {
    id: '4-1',
    gradoId: 4,
    titulo: 'Fundamentos del Live Betting',
    descripcion: 'Entrada y salida en mercados en vivo.',
    duracion: '20 min',
    order: 1,
    quiz: [
      {
        pregunta: '¿Por qué el live betting suele ser más rentable que el pre-partido?',
        opciones: [
          'Porque hay más partidos disponibles',
          'Por sobre-reacción del mercado y menor eficiencia',
          'Porque las cuotas son fijas',
          'Porque no hay margen de la casa',
        ],
        correcta: 1,
        explicacion: 'El live betting es más rentable por la sobre-reacción del mercado y porque hay menos modelos cuantitativos en vivo.',
      },
      {
        pregunta: '¿Cuánto tiempo deberías esperar después de un gol temprano para evaluar una entrada?',
        opciones: [
          'Inmediatamente después del gol',
          '3-5 minutos a que se estabilice la cuota',
          '10-15 minutos',
          'Hasta el descanso',
        ],
        correcta: 1,
        explicacion: 'Tras un gol temprano, se recomienda esperar 3-5 minutos a que la volatilidad se estabilice.',
      },
      {
        pregunta: '¿Cuál es el stop-loss diario recomendado en live betting?',
        opciones: [
          '2% del bankroll',
          '5% del bankroll',
          '10% del bankroll',
          '20% del bankroll',
        ],
        correcta: 1,
        explicacion: 'El stop-loss diario recomendado es del 5% del bankroll.',
      },
    ],
    contenido: `## Fundamentos del Live Betting

### ¿Por qué el live betting es más rentable?

1. **Sobre-reacción**: El mercado reacciona con violencia a cada evento (gol, tarjeta, lesión)
2. **Tiempo real**: Puedes ver lo que el mercado aún no ha descontado
3. **Menos eficiencia**: Hay menos modelos cuantitativos en vivo

### Timing de entrada

| Evento | Efecto en cuota | Oportunidad |
|--------|-----------------|-------------|
| Gol temprano (0-15') | Volatilidad máxima | Esperar 5' a que se estabilice |
| Gol del favorito | Su cuota cae en picado | Buscar valor en el otro equipo |
| Tarjeta roja | Cuota del equipo con 10 sube | Entrar si el equipo defiende bien |
| Lesión del creador de juego | Cuota del equipo sube | Analizar si hay recambio |

### Estrategias de entrada

#### 1. Estrategia de sobre-reacción
Cuando un equipo recibe un gol inesperado, su cuota sube artificialmente.
**Acción**: Esperar 3-5 minutos, value si el equipo sigue jugando bien.

#### 2. Contra el momentum
Cuando el público sobre-valora a un equipo con momentum.
**Acción**: Esperar cuota alta del equipo contrario.

### Reglas de salida

1. **Cash out parcial**: Asegura beneficios parciales
2. **Stop-loss**: Máxima pérdida aceptable por sesión (ej: 5% del bankroll)
3. **Objetivo de beneficio**: Cuando tu apuesta alcanza X% de retorno, sal`,
  },
  {
    id: '4-2',
    gradoId: 4,
    titulo: 'Sobre-reacción del Mercado',
    descripcion: 'Cómo detectar y explotar las sobre-reacciones.',
    duracion: '15 min',
    order: 2,
    quiz: [
      {
        pregunta: '¿Qué es una sobre-reacción del mercado?',
        opciones: [
          'Cuando el mercado reacciona de forma racional a un evento',
          'Cuando el mercado ajusta una cuota más allá de lo racional',
          'Cuando la cuota no se mueve',
          'Cuando todos los apostadores están de acuerdo',
        ],
        correcta: 1,
        explicacion: 'Una sobre-reacción ocurre cuando el mercado ajusta una cuota más allá de lo racional después de un evento.',
      },
      {
        pregunta: '¿Cuánto puede caer la cuota de un equipo que marca un gol en los primeros 5 minutos?',
        opciones: [
          '10-20%',
          '40-60%',
          '80-100%',
          'No cambia',
        ],
        correcta: 1,
        explicacion: 'La cuota del equipo que marcó puede caer entre 40-60% tras un gol temprano.',
      },
      {
        pregunta: '¿Qué movimiento de cuota indica una sobre-reacción probable?',
        opciones: [
          'Movimiento del 10% en 30 minutos',
          'Movimiento del 50% en menos de 5 minutos',
          'Movimiento del 5% en 1 minuto',
          'Cualquier movimiento es normal',
        ],
        correcta: 1,
        explicacion: 'Un movimiento de cuota superior al 50% en menos de 5 minutos es señal de sobre-reacción probable.',
      },
    ],
    contenido: `## Sobre-reacción del Mercado

### ¿Qué es una sobre-reacción?

Cuando el mercado ajusta una cuota **más allá de lo racional** después de un evento.

### Escenarios comunes

#### Gol en los primeros 5 minutos
- La cuota del equipo que marcó cae 40-60%
- La cuota del otro equipo sube 100-200%
- **Oportunidad**: Si el gol fue temprano y el partido está igualado, value en el equipo que perdió

#### Expulsión
- El equipo con 10 hombres ve su cuota subir 200%+
- **Oportunidad**: Si es temprano (minuto 20-30) y el equipo defiende bien en inferioridad

#### Penalti fallado
- El equipo que falló ve su cuota subir significativamente
- **Oportunidad**: A veces el penalti fallado motiva al equipo

### Indicadores de sobre-reacción

| Indicador | Señal |
|-----------|-------|
| Movimiento de cuota >50% en <5 minutos | Sobre-reacción probable |
| El evento fue aleatorio (gol de rebote, error arbitral) | Mercado irracional |
| El equipo dominante está perdiendo | Cuota inflada del dominante |

### Regla práctica

> Si una cuota se mueve más del 50% en 5 minutos por un evento de alta variabilidad, hay value en la dirección contraria al movimiento.`,
  },
  {
    id: '4-3',
    gradoId: 4,
    titulo: 'Gestión de Riesgo en Vivo',
    descripcion: 'Protege tu bankroll durante el trading en vivo.',
    duracion: '15 min',
    order: 3,
    quiz: [
      {
        pregunta: '¿Cuál es el límite máximo por apuesta en live betting?',
        opciones: [
          '1% del bankroll',
          '2% del bankroll',
          '5% del bankroll',
          '10% del bankroll',
        ],
        correcta: 1,
        explicacion: 'El máximo recomendado por apuesta en vivo es del 2% del bankroll.',
      },
      {
        pregunta: '¿Cuántas apuestas simultáneas se recomiendan como máximo en vivo?',
        opciones: [
          '1',
          '2-3',
          '5-6',
          'Las que quieras',
        ],
        correcta: 1,
        explicacion: 'Se recomienda un máximo de 2-3 apuestas simultáneas en vivo para mantener el control.',
      },
      {
        pregunta: 'Si un gol va en contra de tu apuesta en vivo, ¿cuál es la mejor respuesta?',
        opciones: [
          'Doblar la apuesta para recuperarte',
          'Aceptar la pérdida y no doblar',
          'Apostar al equipo contrario',
          'Esperar al próximo partido',
        ],
        correcta: 1,
        explicacion: 'Si un gol va en contra, debes aceptar la pérdida y no doblar. La disciplina es clave.',
      },
    ],
    contenido: `## Gestión de Riesgo en Vivo

### La naturaleza del riesgo en vivo

En live betting, la velocidad de las decisiones aumenta el riesgo:

1. **Tiempo de reacción limitado**
2. **Cuotas que cambian cada segundo**
3. **Alta volatilidad emocional**

### Límites del live trading

| Límite | Recomendación |
|--------|---------------|
| Máximo por apuesta live | 2% del bankroll |
| Máximo apuestas simultáneas | 2-3 |
| Stop-loss diario | 5% del bankroll |
| Objetivo diario | 3-5% del bankroll |

### Estrategia de gestión

1. **Prepárate antes del partido**: Identifica posibles escenarios
2. **Entrada planificada**: No improvises, ejecuta tu plan
3. **Salida disciplinada**: Si ganas +50%, considera cash out parcial

### Escenarios y respuestas

| Escenario | Respuesta |
|-----------|-----------|
| Gol en contra de tu apuesta | No dobles, acepta la pérdida |
| Cuota sube favorablemente | Evalúa si el value sigue ahí |
| Partido aburrido (min 60, 0-0) | Considera under si las cuotas son atractivas |

> En live betting, la disciplina vale más que la velocidad.`,
  },
]

const leccionesGrado5: Lesson[] = [
  {
    id: '5-1',
    gradoId: 5,
    titulo: 'Scalping Deportivo',
    descripcion: 'Beneficios rápidos de pequeños movimientos de cuota.',
    duracion: '20 min',
    order: 1,
    quiz: [
      {
        pregunta: '¿En qué consiste el scalping deportivo?',
        opciones: [
          'Apostar grandes cantidades en un solo partido',
          'Entrar y salir de posiciones en segundos o minutos',
          'Apostar solo en mercados pre-partido',
          'Seguir a tipsters profesionales',
        ],
        correcta: 1,
        explicacion: 'El scalping consiste en entrar y salir de una posición en segundos o minutos, aprovechando pequeñas fluctuaciones.',
      },
      {
        pregunta: '¿Qué tipo de plataforma se necesita para hacer scalping?',
        opciones: [
          'Una casa de apuestas tradicional',
          'Un exchange como Betfair',
          'Una aplicación móvil cualquiera',
          'Una red social de apuestas',
        ],
        correcta: 1,
        explicacion: 'El scalping requiere un exchange (Betfair, Matchbook) ya que necesitas poder apostar a favor y en contra.',
      },
      {
        pregunta: '¿Cuántos ticks de beneficio se buscan típicamente en una operación de scalping?',
        opciones: [
          '10-20 ticks',
          '2-5 ticks',
          '1 tick',
          '50+ ticks',
        ],
        correcta: 1,
        explicacion: 'El objetivo típico en scalping es de 2-5 ticks por operación.',
      },
    ],
    contenido: `## Scalping Deportivo

### ¿Qué es el scalping?

El scalping consiste en **entrar y salir de una posición en segundos o minutos**, aprovechando pequeñas fluctuaciones en las cuotas.

### Requisitos

- **Exchange** (Betfair, Matchbook) — no sirven casas tradicionales
- **Conexión rápida** (<50ms de latencia)
- **Cuotas en tiempo real**
- **Capital suficiente** (mínimo 500€ recomendado)

### Patrones de scalping

#### 1. Back-Lay (Back first)
Entras a favor (back) y cuando la cuota baja, cierras en contra (lay).

**Ejemplo**:
- Back a 2.00
- Lay a 1.96
- Diferencia: 0.04 → 4 ticks de beneficio

#### 2. Lay-Back (Lay first)
Entras en contra (lay) y cuando la cuota sube, cierras a favor (back).

### Gestión en scalping

| Aspecto | Recomendación |
|---------|---------------|
| Ticks objetivo | 2-5 ticks |
| Stop loss | 3-5 ticks |
| Duración media | 10-60 segundos |
| Apuestas por hora | 10-30 |

### Herramientas necesarias

- **Betfair API** o similar
- Software de scalping (Bet Angel, Geeks Toy)
- Múltiples monitores recomendado`,
  },
  {
    id: '5-2',
    gradoId: 5,
    titulo: 'Hedging y Cobertura',
    descripcion: 'Asegura beneficios neutralizando riesgos.',
    duracion: '15 min',
    order: 2,
    quiz: [
      {
        pregunta: '¿Qué es el hedging en apuestas deportivas?',
        opciones: [
          'Apostar todo el bankroll a un solo resultado',
          'Cubrir tu apuesta inicial con una apuesta contraria',
          'Aumentar el stake después de perder',
          'Apuestas múltiples combinadas',
        ],
        correcta: 1,
        explicacion: 'El hedging consiste en cubrir tu apuesta inicial con una apuesta contraria para asegurar beneficios.',
      },
      {
        pregunta: 'Si apostaste 20€ @ 3.00 al equipo A y quieres cubrir, ¿cuánto deberías apostar al empate a 4.00 para asegurar?',
        opciones: [
          '10€',
          '15€',
          '20€',
          '25€',
        ],
        correcta: 1,
        explicacion: 'Apostando 15€ al empate a 4.00, si gana A obtienes 45€ netos y si empata obtienes 40€ netos.',
      },
      {
        pregunta: '¿Cuándo se recomienda considerar una cobertura?',
        opciones: [
          'Cuando el retorno potencial es negativo',
          'Cuando el retorno potencial es +50% o más',
          'Solo si estás perdiendo',
          'Nunca, siempre dejar correr',
        ],
        correcta: 1,
        explicacion: 'Se recomienda considerar cobertura parcial al +50% de retorno y cobertura completa al +100%.',
      },
    ],
    contenido: `## Hedging y Cobertura

### ¿Qué es el hedging?

Cubrir tu apuesta inicial con una apuesta contraria para asegurar beneficios independientemente del resultado.

### Estrategias de cobertura

#### 1. Cobertura en vivo
Apuestas al equipo A antes del partido. Van ganando 2-0 al descanso.
Cubres apostando al empate o al equipo B para asegurar.

**Ejemplo**:
- Stake: 20€ @ 3.00 → Retorno potencial: 60€
- Cobertura: 15€ al empate @ 4.00 → Retorno: 60€
- Si gana A: 60 - 15 = 45€ neto
- Si empata: 60 - 20 = 40€ neto

#### 2. Cobertura con lay en exchange
Si tienes acceso a exchange, puedes lay (apostar en contra) de tu apuesta original.

#### 3. Cobertura múltiple
Cuando tienes varias apuestas que se pueden cruzar.

### Cuándo cubrir

| Situación | ¿Cubrir? |
|-----------|----------|
+50% de retorno potencial | Considerar cobertura parcial |
+100% de retorno potencial | Cobertura recomendada |
La cuota ha bajado 50%+ | Momento ideal para cubrir |
Te juegas una cantidad significativa | Siempre cubrir |

> El hedging convierte una apuesta de riesgo en un arbitraje sin riesgo.`,
  },
  {
    id: '5-3',
    gradoId: 5,
    titulo: 'Cash Out Estratégico',
    descripcion: 'Cuándo y cómo usar el cash out.',
    duracion: '15 min',
    order: 3,
    quiz: [
      {
        pregunta: '¿Qué tipo de cash out te permite cerrar solo una parte de tu apuesta?',
        opciones: [
          'Cash Out Total',
          'Cash Out Parcial',
          'Auto Cash Out',
          'Cash Out Múltiple',
        ],
        correcta: 1,
        explicacion: 'El Cash Out Parcial te permite cerrar una parte de la apuesta y dejar correr el resto.',
      },
      {
        pregunta: '¿Cuándo NO deberías usar cash out según la lección?',
        opciones: [
          'Cuando has conseguido +100% de retorno',
          'Por miedo a perder cuando el value sigue intacto',
          'Cuando necesitas el capital para otra apuesta',
          'Cuando el contexto del partido ha cambiado',
        ],
        correcta: 1,
        explicacion: 'No debes usar cash out por miedo a perder si el value sigue intacto. Es el "error más común".',
      },
      {
        pregunta: '¿Cuándo es matemáticamente correcto aceptar un cash out?',
        opciones: [
          'Cuando el cash out ofrecido es menor que el valor esperado',
          'Cuando el cash out ofrecido es mayor que (Probabilidad Real × Retorno Potencial)',
          'Siempre que ofrezcan cash out',
          'Nunca, el cash out siempre es malo',
        ],
        correcta: 1,
        explicacion: 'Debes aceptar cash out solo si: Cash Out Ofrecido > (Probabilidad Real × Retorno Potencial).',
      },
    ],
    contenido: `## Cash Out Estratégico

### ¿Qué es el cash out?

Cerrar una apuesta antes de que termine el evento, asegurando un beneficio o limitando una pérdida.

### Tipos de cash out

#### 1. Cash Out Total
Cierras toda la apuesta. No tienes más exposición.

#### 2. Cash Out Parcial
Cierras una parte, dejas correr el resto.

#### 3. Auto Cash Out
Configuras un nivel de beneficio y se cierra automáticamente.

### Cuándo usar cash out

**SÍ usar**:
- Has conseguido +100% de retorno
- Necesitas el capital para otra apuesta
- El contexto del partido ha cambiado drásticamente

**NO usar**:
- Por miedo a perder (el famoso "uve")
- Una pérdida pequeña es aceptable
- El value sigue intacto

### El error más común

> Aceptar un cash out pequeño por miedo a perder una apuesta con value positivo

**Ejemplo**: Apostaste 10€ @ 3.00. Van ganando 1-0. Te ofrecen 15€ de cash out (+50%). Si la probabilidad real de ganar sigue siendo >66.7%, el cash out es -EV.

### Fórmula de decisión

Acepta cash out solo si:
> **Cash Out Ofrecido > (Probabilidad Real × Retorno Potencial)**

Si no, deja correr.`,
  },
]

const leccionesGrado6: Lesson[] = [
  {
    id: '6-1',
    gradoId: 6,
    titulo: 'Modelo de Poisson',
    descripcion: 'Predice goles usando la distribución de Poisson.',
    duracion: '25 min',
    order: 1,
    quiz: [
      {
        pregunta: '¿Qué distribución matemática se usa para predecir goles en un partido?',
        opciones: [
          'Distribución normal',
          'Distribución de Poisson',
          'Distribución binomial',
          'Distribución uniforme',
        ],
        correcta: 1,
        explicacion: 'La distribución de Poisson se usa para predecir la probabilidad de que ocurran X eventos (goles) en un intervalo fijo.',
      },
      {
        pregunta: 'En la fórmula P(X = k) = (λ^k × e^-λ) / k!, ¿qué representa λ (lambda)?',
        opciones: [
          'El número de goles del equipo rival',
          'El promedio de goles esperados',
          'La probabilidad de empate',
          'El número de partidos jugados',
        ],
        correcta: 1,
        explicacion: 'λ (lambda) representa el promedio de goles esperados del equipo.',
      },
      {
        pregunta: '¿Cuál es una limitación del modelo de Poisson aplicado al fútbol?',
        opciones: [
          'Es demasiado complejo de calcular',
          'No considera la dependencia entre equipos',
          'Solo funciona para la liga española',
          'Requiere 100+ partidos de datos',
        ],
        correcta: 1,
        explicacion: 'Una limitación es que no considera la dependencia entre equipos y asume consistencia durante todo el partido.',
      },
    ],
    contenido: `## Modelo de Poisson

### ¿Qué es la distribución de Poisson?

Modelo matemático que predice la probabilidad de que ocurran X eventos en un intervalo fijo.

### Aplicación al fútbol

> **Goles ∼ Poisson(λ)**

Donde λ (lambda) es el promedio de goles esperados.

### Cálculo básico

**Fórmula**: P(X = k) = (λ^k × e^-λ) / k!

Donde:
- k = número de goles
- λ = goles promedio esperados
- e = 2.71828

### Ejemplo práctico

Equipo A: λ = 1.5 goles esperados

Probabilidad de que marque exactamente 0 goles:
P(0) = (1.5^0 × e^-1.5) / 0! = 0.223 = 22.3%

Probabilidad de que marque exactamente 1 gol:
P(1) = (1.5^1 × e^-1.5) / 1! = 0.335 = 33.5%

### Tabla de probabilidades (λ = 1.5)

| Goles | Probabilidad |
|-------|-------------|
| 0 | 22.3% |
| 1 | 33.5% |
| 2 | 25.1% |
| 3 | 12.6% |
| 4+ | 6.5% |

### Limitaciones

- No considera la dependencia entre equipos
- Asume consistencia durante todo el partido
- No captura momentum ni contexto`,
  },
  {
    id: '6-2',
    gradoId: 6,
    titulo: 'Simulación Monte Carlo',
    descripcion: 'Simula miles de escenarios para calcular probabilidades reales.',
    duracion: '20 min',
    order: 2,
    quiz: [
      {
        pregunta: '¿Qué es la simulación Monte Carlo aplicada a apuestas?',
        opciones: [
          'Un juego de casino con cartas',
          'Una técnica que ejecuta miles de simulaciones para calcular probabilidades',
          'Un método para apostar en vivo',
          'Un tipo de cuota fraccionaria',
        ],
        correcta: 1,
        explicacion: 'Monte Carlo es una técnica computacional que ejecuta miles de simulaciones de un evento para calcular probabilidades.',
      },
      {
        pregunta: '¿Cuántas simulaciones se recomiendan típicamente en Monte Carlo?',
        opciones: [
          '100',
          '1,000',
          '10,000',
          '1,000,000',
        ],
        correcta: 2,
        explicacion: 'En el ejemplo de la lección se usan 10,000 simulaciones para obtener probabilidades estables.',
      },
      {
        pregunta: '¿Cuál es una ventaja de Monte Carlo sobre modelos simples como Poisson?',
        opciones: [
          'Es más fácil de calcular a mano',
          'Captura no linealidades y es fácil de extender',
          'No requiere datos históricos',
          'Funciona sin ordenador',
        ],
        correcta: 1,
        explicacion: 'Monte Carlo captura no linealidades, es fácil de extender con variables adicionales y flexible para cualquier deporte.',
      },
    ],
    contenido: `## Simulación Monte Carlo

### ¿Qué es Monte Carlo?

Técnica computacional que ejecuta **miles de simulaciones** de un evento para calcular probabilidades.

### Cómo funciona

1. Define las variables del modelo (ataque, defensa, etc.)
2. El ordenador simula el partido 10,000 veces
3. Cuenta los resultados de cada simulación
4. Calcula probabilidades: victorias / total

### Aplicación práctica

[python]
import numpy as np

def simular_partido(goles_local, goles_visitante, n=10000):
    victoria_local = 0
    empate = 0
    victoria_vis = 0
    
    for _ in range(n):
        g_local = np.random.poisson(goles_local)
        g_visit = np.random.poisson(goles_visitante)
        
        if g_local > g_visit:
            victoria_local += 1
        elif g_local == g_visit:
            empate += 1
        else:
            victoria_vis += 1
    
    return {
        "1": victoria_local / n,
        "X": empate / n,
        "2": victoria_vis / n
    }
[/python]

### Ventajas sobre modelos simples

- Captura no linealidades
- Fácil de extender (añadir variables)
- Visual e intuitivo
- Flexible para cualquier deporte

### Limitaciones

- Requiere poder computacional
- Sensible a la calidad de los inputs
- No captura eventos de baja probabilidad bien`,
  },
  {
    id: '6-3',
    gradoId: 6,
    titulo: 'Expected Value (EV+)',
    descripcion: 'El concepto más importante del betting profesional.',
    duracion: '20 min',
    order: 3,
    quiz: [
      {
        pregunta: '¿Cuál es la fórmula del Expected Value?',
        opciones: [
          'EV = Cuota / Probabilidad Real',
          'EV = (Probabilidad Real × Cuota) - 1',
          'EV = 1 / Cuota × 100',
          'EV = Probabilidad Real - Cuota',
        ],
        correcta: 1,
        explicacion: 'EV = (Probabilidad Real × Cuota) - 1. Si es positivo, la apuesta es rentable a largo plazo.',
      },
      {
        pregunta: 'Según la ley de los grandes números, ¿cuántas apuestas se necesitan para que el EV se cumpla casi exactamente?',
        opciones: [
          '100',
          '1,000',
          '10,000',
          '100,000',
        ],
        correcta: 2,
        explicacion: 'Con 10,000 apuestas, el EV se cumple casi exactamente según la ley de los grandes números.',
      },
      {
        pregunta: '¿Qué error común cometen los apostadores respecto al EV?',
        opciones: [
          'Calcular EV para todas las apuestas',
          'Confundir EV con resultado: una apuesta EV+ puede perder',
          'Usar EV solo en exchanges',
          'Apostar solo cuando el EV es negativo',
        ],
        correcta: 1,
        explicacion: 'Un error común es confundir EV con resultado. Una apuesta EV+ puede perder y una EV- puede ganar.',
      },
    ],
    contenido: `## Expected Value (EV+)

### ¿Qué es el EV?

El **Expected Value** es el beneficio o pérdida esperada de una apuesta a largo plazo.

### Fórmula fundamental

> **EV = (Probabilidad Real × Cuota) - 1**

- **EV+**: Apuesta rentable a largo plazo
- **EV-**: Apuesta perdedora a largo plazo
- **EV = 0**: Punto de equilibrio

### Ejemplo

**Apuesta**: Real Madrid @ 2.10
**Probabilidad real**: 52% (basada en tu modelo)

EV = (0.52 × 2.10) - 1 = 1.092 - 1 = **+0.092 = +9.2%**

Por cada 100€ apostados, esperas ganar 9.20€ de media.

### La ley de los grandes números

Con EV+:
- 100 apuestas: resultados muy variables
- 1,000 apuestas: te acercas al EV
- 10,000 apuestas: el EV se cumple casi exactamente

### Errores comunes

1. **Confundir EV con resultado**: Una apuesta EV+ puede perder
2. **No calcular EV**: Apostar por "intuición"
3. **Tamaño de muestra pequeño**: Juzgar una estrategia por 20 apuestas

### Tabla de referencia

| EV | Calidad | Frecuencia esperada |
|----|---------|-------------------|
| +1% a +5% | Buena | Ocasional |
| +5% a +10% | Muy buena | Poco frecuente |
| +10%+ | Excelente | Rara (2-5% de apuestas) |
| -5% o peor | Mala | Evitar siempre |

> Busca EV+, no ganadores. Esa es la mentalidad del profesional.`,
  },
]

const leccionesGrado7: Lesson[] = [
  {
    id: '7-1',
    gradoId: 7,
    titulo: 'Machine Learning en Apuestas',
    descripcion: 'Introducción a ML aplicado a predicción deportiva.',
    duracion: '25 min',
    order: 1,
    quiz: [
      {
        pregunta: '¿Por qué el Machine Learning puede superar a modelos tradicionales como Poisson?',
        opciones: [
          'Porque es más fácil de implementar',
          'Porque puede capturar relaciones no lineales y patrones complejos',
          'Porque no requiere datos históricos',
          'Porque funciona sin programación',
        ],
        correcta: 1,
        explicacion: 'ML puede capturar relaciones no lineales y patrones complejos que modelos tradicionales no detectan.',
      },
      {
        pregunta: '¿Cuál es el primer paso del pipeline de ML en betting?',
        opciones: [
          'Selección de modelo',
          'Recolección de datos',
          'Evaluación',
          'Feature engineering',
        ],
        correcta: 1,
        explicacion: 'El primer paso es la recolección de datos a través de APIs deportivas y datos históricos.',
      },
      {
        pregunta: '¿Qué algoritmo de ML se recomienda para clasificación por ser preciso, rápido y robusto?',
        opciones: [
          'Redes Bayesianas',
          'LSTM',
          'XGBoost',
          'Random Forest',
        ],
        correcta: 2,
        explicacion: 'XGBoost se recomienda para clasificación por ser preciso, rápido y robusto.',
      },
    ],
    contenido: `## Machine Learning en Apuestas

### ¿Por qué ML?

Los modelos tradicionales (Poisson, ELO) tienen limitaciones. ML puede capturar **relaciones no lineales** y **patrones complejos**.

### Pipeline de ML en betting

1. **Recolección de datos**: APIs deportivas, datos históricos
2. **Feature engineering**: Crear variables predictivas
3. **Selección de modelo**: XGBoost, Random Forest, Redes Neuronales
4. **Entrenamiento**: Datos históricos (70% train, 15% val, 15% test)
5. **Evaluación**: Precisión, Brier Score, ROI en test
6. **Producción**: Predicciones en tiempo real

### Features comunes

- Goles promedio (últimos 5, 10, 20 partidos)
- xG (expected goals) de cada equipo
- Forma reciente (puntos últimos 5 partidos)
- Lesiones de jugadores clave
- Historial head-to-head
- Días de descanso
- Distancia de viaje

### Algoritmos recomendados

| Algoritmo | Uso | Ventaja |
|-----------|-----|---------|
| XGBoost | Clasificación | Preciso, rápido, robusto |
| Random Forest | Clasificación | Interpretable |
| LSTM | Series temporales | Captura secuencias |
| Redes Bayesianas | Probabilidades | Incertidumbre calibrada |

### Advertencia

> ML no es magia. Basura entra, basura sale. La calidad de los datos importa más que el algoritmo.`,
  },
  {
    id: '7-2',
    gradoId: 7,
    titulo: 'Feature Engineering',
    descripcion: 'Crea variables predictivas efectivas.',
    duracion: '20 min',
    order: 2,
    quiz: [
      {
        pregunta: '¿Qué es el feature engineering en Machine Learning?',
        opciones: [
          'Seleccionar el mejor algoritmo',
          'Crear variables predictivas que capturen información relevante',
          'Entrenar el modelo con más datos',
          'Evaluar la precisión del modelo',
        ],
        correcta: 1,
        explicacion: 'Feature engineering consiste en crear variables (features) que capturen información relevante para tus predicciones.',
      },
      {
        pregunta: '¿Cuántas features se recomienda no superar para evitar overfitting?',
        opciones: [
          '5-10',
          '20-30',
          '50-100',
          'Cuantas más mejor',
        ],
        correcta: 1,
        explicacion: 'Se recomienda no usar más de 20-30 features para evitar overfitting.',
      },
      {
        pregunta: '¿Qué técnica de feature selection elimina features muy correlacionadas?',
        opciones: [
          'Importancia (XGBoost)',
          'PCA',
          'Correlación',
          'Selección manual',
        ],
        correcta: 2,
        explicacion: 'La correlación permite eliminar features que están muy correlacionadas entre sí.',
      },
    ],
    contenido: `## Feature Engineering

### ¿Qué es feature engineering?

Crear variables (features) que capturen información relevante para tus predicciones.

### Categorías de features

#### 1. Features de forma reciente
- Goles últimos 5 partidos (local y visitante)
- Puntos últimos 5 partidos
- Diferencias de goles
- Rachas (victorias/derrotas consecutivas)

#### 2. Features avanzadas
- xG recent (expected goals)
- Posesión media
- Efectividad defensiva
- Tarjetas por partido
- Córners por partido

#### 3. Features contextuales
- Días de descanso
- Local/Visitante
- Distancia de viaje
- Importancia del partido
- Clima esperado

### Transformaciones útiles

#### Medias móviles (últimos N partidos)
[code lang=python]
goles_media_movil_5 = df['goles'].rolling(5).mean()
[/code]

#### Ratios
[code lang=python]
efectividad = goles_marcados / tiros_a_puerta
[/code]

#### Diferencias
[code lang=python]
diff_goles = goles_local - goles_visitante
[/code]

### Feature selection

No más de 20-30 features para evitar overfitting.

| Técnica | Descripción |
|---------|-------------|
| Correlación | Eliminar features muy correlacionadas |
| Importancia (XGBoost) | Las features más importantes del modelo |
| PCA | Reducción de dimensionalidad |

> Un buen feature vale más que un modelo complejo.`,
  },
]

const leccionesGrado8: Lesson[] = [
  {
    id: '8-1',
    gradoId: 8,
    titulo: 'APIs Deportivas',
    descripcion: 'Conecta con fuentes de datos en tiempo real.',
    duracion: '20 min',
    order: 1,
    quiz: [
      {
        pregunta: '¿Qué API deportiva ofrece datos de cuotas de múltiples casas?',
        opciones: [
          'API-Football',
          'The Odds API',
          'Betfair API',
          'Twitter API',
        ],
        correcta: 1,
        explicacion: 'The Odds API proporciona cuotas pre-partido de múltiples casas de apuestas.',
      },
      {
        pregunta: '¿Cuántas requests mensuales incluye el free tier de The Odds API?',
        opciones: [
          '100',
          '500',
          '1,000',
          '10,000',
        ],
        correcta: 1,
        explicacion: 'The Odds API tiene un free tier de 500 requests por mes.',
      },
      {
        pregunta: '¿Qué buena práctica se recomienda al trabajar con APIs deportivas?',
        opciones: [
          'Llamar a la API cada segundo',
          'Cachear respuestas para no exceder límites',
          'Usar siempre la misma API',
          'No implementar reintentos',
        ],
        correcta: 1,
        explicacion: 'Se recomienda cachear respuestas para no exceder los límites de las APIs.',
      },
    ],
    contenido: `## APIs Deportivas

### APIs recomendadas

#### The Odds API
- **Precio**: Free tier (500 requests/mes)
- **Deportes**: Fútbol, baloncesto, tenis, béisbol, hockey
- **Datos**: Cuotas pre-partido de múltiples casas

#### API-Football
- **Precio**: ~25$/mes
- **Deportes**: Fútbol (60+ ligas)
- **Datos**: Alineaciones, estadísticas, eventos en vivo

#### Betfair API
- **Precio**: Gratis (comisiones por apuesta)
- **Deportes**: Todos
- **Datos**: Cuotas de exchange, volumen de apuestas

### Ejemplo básico

[code lang=javascript]
const response = await fetch(
  'https://api.the-odds-api.com/v4/sports/soccer/odds/?apiKey=TU_KEY&regions=uk&markets=h2h'
)
const data = await response.json()
[/code]

### Buenas prácticas
- Cachea respuestas para no exceder límites
- Usa WebSockets para datos en vivo
- Implementa reintentos con backoff`,
  },
  {
    id: '8-2',
    gradoId: 8,
    titulo: 'Scraping y Automatización',
    descripcion: 'Extrae datos de páginas web de forma automatizada.',
    duracion: '20 min',
    order: 2,
    quiz: [
      {
        pregunta: '¿Qué debes revisar antes de hacer scraping a un sitio web?',
        opciones: [
          'El diseño de la página',
          'El robots.txt y los términos de servicio',
          'El código fuente de la página',
          'Las redes sociales del sitio',
        ],
        correcta: 1,
        explicacion: 'Debes revisar robots.txt y términos de servicio para asegurarte de que el scraping está permitido.',
      },
      {
        pregunta: '¿Qué herramienta se usa para browser automation en Python?',
        opciones: [
          'BeautifulSoup',
          'Playwright',
          'cheerio',
          'Puppeteer',
        ],
        correcta: 1,
        explicacion: 'Playwright se usa para browser automation en Python, mientras que Puppeteer es para Node.js.',
      },
      {
        pregunta: '¿Qué herramienta de CI/CD se menciona para automatizar scrapers diarios?',
        opciones: [
          'Jenkins',
          'GitHub Actions',
          'Travis CI',
          'CircleCI',
        ],
        correcta: 1,
        explicacion: 'GitHub Actions se menciona para programar scrapers diarios y almacenar resultados en Supabase.',
      },
    ],
    contenido: `## Scraping y Automatización

### Consideraciones legales
- Revisa robots.txt y términos de servicio
- No sobrecargues servidores (rate limiting)
- Muchos sitios prohíben el scraping explícitamente

### Stack tecnológico

| Herramienta | Uso |
|-------------|-----|
| BeautifulSoup | HTML parsing (Python) |
| Playwright | Browser automation |
| cheerio | HTML parsing (Node.js) |
| Puppeteer | Headless browser |

### Estructura de un scraper

[code lang=python]
import requests
from bs4 import BeautifulSoup

def scrape_cuotas(url):
    response = requests.get(url, headers={
        'User-Agent': 'Mozilla/5.0...'
    })
    soup = BeautifulSoup(response.text, 'html.parser')
    # Extraer datos...
    return cuotas
[/code]

### Automatización con GitHub Actions
- Programa scrapers diarios
- Almacena resultados en Supabase
- Recibe alertas cuando encuentras value`,
  },
]

const leccionesGrado9: Lesson[] = [
  {
    id: '9-1',
    gradoId: 9,
    titulo: 'Sistemas Multi-Variable',
    descripcion: 'Combina múltiples fuentes de datos en un modelo unificado.',
    duracion: '25 min',
    order: 1,
    quiz: [
      {
        pregunta: '¿Qué enfoque usan los mejores apostadores según la lección?',
        opciones: [
          'Usar una sola métrica confiable',
          'Combinar decenas de variables en un sistema integrado',
          'Seguir solo las cuotas de Betfair',
          'Apostar únicamente en vivo',
        ],
        correcta: 1,
        explicacion: 'Los mejores apostadores combinan decenas de variables en un sistema integrado.',
      },
      {
        pregunta: '¿Qué técnica se usa para combinar múltiples modelos en uno solo?',
        opciones: [
          'Selección manual del mejor modelo',
          'Ensemble (promedio ponderado)',
          'Usar solo el modelo más simple',
          'Alternar modelos cada semana',
        ],
        correcta: 1,
        explicacion: 'Se usa un Ensemble que promedia ponderadamente los resultados de múltiples modelos.',
      },
      {
        pregunta: '¿Qué significa que unas probabilidades estén "bien calibradas"?',
        opciones: [
          'Que siempre aciertan',
          'Que eventos con 60% de probabilidad ganan el 60% de las veces',
          'Que son mayores que las de la casa',
          'Que se actualizan cada minuto',
        ],
        correcta: 1,
        explicacion: 'Probabilidades bien calibradas significa que eventos con 60% de probabilidad ganan el 60% de las veces.',
      },
    ],
    contenido: `## Sistemas Multi-Variable

### La ventaja cuantitativa

Los mejores apostadores no usan una sola métrica. Combinan **decenas de variables** en un sistema integrado.

### Arquitectura del sistema

[code]
Datos históricos → Feature Engineering → Modelo 1 (XGBoost)
                                      → Modelo 2 (Poisson)
                                      → Modelo 3 (ELO)
                                             ↓
                                   Ensemble (promedio ponderado)
                                             ↓
                                   Probabilidades calibradas
                                             ↓
                                   Value Bet Detection
[/code]

### Variables del sistema

| Categoría | Variables |
|-----------|-----------|
| Ataque | Goles, xG, tiros, efectividad |
| Defensa | Goles recibidos, xGA, clean sheets |
| Forma | Últimos 5, tendencia, rachas |
| Contexto | Lesiones, viajes, motivación |
| Mercado | Cuotas, movimiento de cuotas, volumen |

### Calibración

Ajusta tus probabilidades para que sean **bien calibradas**:
- Eventos con 60% de prob → ganan el 60% de las veces
- Uso de Platt Scaling o Isotonic Regression`,
  },
  {
    id: '9-2',
    gradoId: 9,
    titulo: 'Live Value Bet Radar',
    descripcion: 'Sistema de detección de value en tiempo real.',
    duracion: '20 min',
    order: 2,
    quiz: [
      {
        pregunta: '¿Cada cuánto tiempo se recomienda consultar la API deportiva en un sistema de detección en tiempo real?',
        opciones: [
          'Cada 5 segundos',
          'Cada 30 segundos',
          'Cada 5 minutos',
          'Cada hora',
        ],
        correcta: 1,
        explicacion: 'La arquitectura del sistema consulta la API deportiva cada 30 segundos.',
      },
      {
        pregunta: '¿Qué condiciones debe cumplir una value bet para ser detectada por el radar?',
        opciones: [
          'EV > 5% y odds > 1.50',
          'EV > 10% y odds > 2.00',
          'Cualquier EV positivo',
          'Odds > 5.00',
        ],
        correcta: 0,
        explicacion: 'El detector busca EV > 5% y odds > 1.50 para generar una alerta de value bet.',
      },
      {
        pregunta: '¿Qué es un "steam move" en el contexto del radar?',
        opciones: [
          'Una cuota que no se mueve',
          'Una cuota moviéndose rápidamente en una dirección',
          'Una cuota muy baja',
          'Una cuota de un deporte poco conocido',
        ],
        correcta: 1,
        explicacion: 'Un steam move es una cuota que se mueve rápidamente en una dirección, indicando actividad significativa.',
      },
    ],
    contenido: `## Live Value Bet Radar

### Arquitectura en tiempo real

[code]
API Deportiva (cada 30s)
    ↓
Comparador de cuotas (múltiples casas)
    ↓
Calculadora de probabilidades
    ↓
Detector de value (EV > 5%)
    ↓
Alerta (WebSocket / Push notification)
[/code]

### Lógica de detección constante

[code lang=javascript]
function detectValueBet(odds, yourProb) {
  const impliedProb = 1 / odds
  const ev = (yourProb * odds) - 1
  
  if (ev > 0.05 && odds > 1.50) {
    return { 
      value: true, 
      ev: ev, 
      recomendacion: 'Entrar' 
    }
  }
  return { value: false }
}
[/code]

### Tipos de alertas

- **Value bet detectada**: EV > 5% y odds anormalmente altas
- **Steam move**: Cuota moviéndose rápidamente en una dirección
- **Corrección de error**: Cuota que claramente está mal
- **Oportunidad de arbitraje**: Back y lay que crean ganancia segura`,
  },
]

const leccionesGrado10: Lesson[] = [
  {
    id: '10-1',
    gradoId: 10,
    titulo: 'Mentalidad Grandmaster',
    descripcion: 'La mentalidad que separa a los profesionales del resto.',
    duracion: '20 min',
    order: 1,
    quiz: [
      {
        pregunta: '¿Cuál es el primer principio del Grandmaster?',
        opciones: [
          'Ganar siempre',
          'Proceso sobre resultados',
          'Apostar grande en confianza alta',
          'Seguir a los mejores tipsters',
        ],
        correcta: 1,
        explicacion: 'Un Grandmaster sabe que una buena decisión puede dar mal resultado. Proceso sobre resultados.',
      },
      {
        pregunta: '¿Cuántas apuestas sin beneficio pueden tener incluso los mejores del mundo?',
        opciones: [
          '50',
          '100',
          '200',
          '500',
        ],
        correcta: 2,
        explicacion: 'Los mejores del mundo tienen rachas de hasta 200 apuestas sin beneficio.',
      },
      {
        pregunta: '¿Qué actividad NO forma parte de la rutina del Grandmaster?',
        opciones: [
          'Revisar mercados por la mañana',
          'Live trading por la tarde',
          'Apostar a todos los partidos disponibles',
          'Revisión del día por la noche',
        ],
        correcta: 2,
        explicacion: 'La rutina incluye revisión matutina, live trading y revisión nocturna, pero no apostar a todo.',
      },
    ],
    contenido: `## Mentalidad Grandmaster

### El camino al dominio

Llegar a Grandmaster no es solo cuestión de técnica. Es una transformación completa.

### Principios del Grandmaster

#### 1. Proceso sobre resultados
Un Grandmaster sabe que una buena decisión puede dar mal resultado. Y viceversa.

> "Juzga la calidad de tu decisión, no el resultado."

#### 2. Paciencia estratégica
- Una temporada completa es una muestra
- Los mejores del mundo tienen rachas de 200 apuestas sin beneficio
- La disciplina de 5 años construye una fortuna

#### 3. Mejora continua
- Revisa cada apuesta (ganes o pierdas)
- Lleva un diario detallado
- Busca siempre un ángulo nuevo
- Nunca dejes de aprender

### Rutina del Grandmaster

| Hora | Actividad |
|------|-----------|
| Mañana | Revisar mercados, análisis pre-partido |
| Tarde | Live trading, ejecución |
| Noche | Revisión del día, estudio |
| Semanal | Análisis de ROI, ajustes de bankroll |
| Mensual | Revisión de estrategia, nuevo aprendizaje |

### El círculo virtuoso

[code]
Estudio → Análisis → Apuestas EV+ → Resultados
    ↑                                  ↓
    └── Revisión ←── Aprendizaje ←────┘
[/code]

> Un Grandmaster no nace, se hace. Apuesta por apuesta, lección por lección.`,
  },
  {
    id: '10-2',
    gradoId: 10,
    titulo: 'Operativa Profesional',
    descripcion: 'Gestión avanzada de bankroll y sindicatos.',
    duracion: '20 min',
    order: 2,
    quiz: [
      {
        pregunta: '¿Cuántas cuentas en diferentes casas se recomienda tener?',
        opciones: [
          '1-2',
          '3-5',
          '10-15',
          'Cuantas más mejor',
        ],
        correcta: 1,
        explicacion: 'Se recomienda tener 3-5 cuentas en diferentes casas para evitar limitación de stake.',
      },
      {
        pregunta: '¿Qué porcentaje del capital se recomienda destinar a value betting?',
        opciones: [
          '20%',
          '50%',
          '70%',
          '100%',
        ],
        correcta: 1,
        explicacion: 'El 50% del capital se recomienda destinarlo a value betting para crecimiento estable.',
      },
      {
        pregunta: '¿Cuándo se recomienda considerar formar un sindicato profesional?',
        opciones: [
          'Cuando tienes 10,000€',
          'Cuando tu capital alcanza 50,000€+',
          'Cuando empiezas a apostar',
          'Solo si eres un inversor institucional',
        ],
        correcta: 1,
        explicacion: 'Cuando tu capital alcanza 50,000€+, puedes considerar formar un sindicato profesional.',
      },
    ],
    contenido: `## Operativa Profesional

### Gestión de bankroll avanzada

#### Múltiples cuentas
- 3-5 cuentas en diferentes casas
- Evita limitación de stake (casas limitan a ganadores)
- Uso de familiares/amigos de confianza (legal)

#### Diversificación
| Cartera | % del capital | Objetivo |
|---------|---------------|----------|
| Value betting | 50% | Crecimiento estable |
| Arbitraje | 20% | ROI bajo pero seguro |
| Live trading | 20% | Oportunidades agudas |
| Especulativo | 10% | Alta rentabilidad potencial |

### Sindicato profesional

Cuando tu capital alcanza 50,000€+, considera formar un sindicato:
1. **Pool de capital**: Varios inversores aportan
2. **Distribución de apuestas**: Cada miembro se especializa
3. **Escalabilidad**: Apuestas grandes sin mover cuotas

### Relación con casas

- **Eres un cliente, no un enemigo**
- Retira beneficios regularmente
- No llames la atención (stakes demasiado grandes)
- Mantén perfil bajo en redes sociales`,
  },
]

export const gradosData: GradoData[] = [
  {
    id: 1,
    nombre: 'Fundamentos',
    descripcion: 'Probabilidades, cuotas, value betting y gestión de bankroll.',
    icono: '♟',
    color: 'bg-zinc-800',
    lecciones: leccionesGrado1,
  },
  {
    id: 2,
    nombre: 'Psicología',
    descripcion: 'Control emocional, disciplina y gestión del tilt.',
    icono: '🧠',
    color: 'bg-purple-900/30',
    lecciones: leccionesGrado2,
  },
  {
    id: 3,
    nombre: 'Lectura de Partidos',
    descripcion: 'Momentum, contexto, ritmo y presión en vivo.',
    icono: '📊',
    color: 'bg-blue-900/30',
    lecciones: leccionesGrado3,
  },
  {
    id: 4,
    nombre: 'Live Betting',
    descripcion: 'Timing, entradas, sobre-reacciones del mercado.',
    icono: '⚡',
    color: 'bg-amber-900/30',
    lecciones: leccionesGrado4,
  },
  {
    id: 5,
    nombre: 'Trading Deportivo',
    descripcion: 'Scalping, hedging y cashout en exchanges.',
    icono: '📈',
    color: 'bg-emerald-900/30',
    lecciones: leccionesGrado5,
  },
  {
    id: 6,
    nombre: 'Modelos Matemáticos',
    descripcion: 'Poisson, Monte Carlo y Expected Value+.',
    icono: 'π',
    color: 'bg-red-900/30',
    lecciones: leccionesGrado6,
  },
  {
    id: 7,
    nombre: 'IA Aplicada',
    descripcion: 'Machine learning, predicciones y automatización.',
    icono: '🤖',
    color: 'bg-cyan-900/30',
    lecciones: leccionesGrado7,
  },
  {
    id: 8,
    nombre: 'Bots & Automatización',
    descripcion: 'APIs, scraping y alertas automáticas.',
    icono: '⚙️',
    color: 'bg-zinc-800',
    lecciones: leccionesGrado8,
  },
  {
    id: 9,
    nombre: 'Quant Betting',
    descripcion: 'Sistemas avanzados, análisis multi-variable y detección de anomalías.',
    icono: '🔬',
    color: 'bg-indigo-900/30',
    lecciones: leccionesGrado9,
  },
  {
    id: 10,
    nombre: 'Grandmaster Syndicate',
    descripcion: 'Estrategia profesional, gestión avanzada y mindset élite.',
    icono: '👑',
    color: 'bg-amber-900/30',
    lecciones: leccionesGrado10,
  },
]

export function getGradoById(id: number): GradoData | undefined {
  return gradosData.find((g) => g.id === id)
}

export function getLessonById(gradoId: number, lessonId: string): Lesson | undefined {
  const grado = getGradoById(gradoId)
  return grado?.lecciones.find((l) => l.id === lessonId)
}
