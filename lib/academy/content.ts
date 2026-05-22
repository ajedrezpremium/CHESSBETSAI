export interface Lesson {
  id: string
  gradoId: number
  titulo: string
  descripcion: string
  contenido: string
  duracion: string
  order: number
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
