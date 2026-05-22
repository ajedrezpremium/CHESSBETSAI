import { chatWithAgent } from '@/lib/openrouter/agent'

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 })
    }

    const response = await chatWithAgent(messages)

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenRouter error:', error)
      return new Response('AI service error', { status: 502 })
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal error', { status: 500 })
  }
}
