import { chatWithAgent, buildUserContext, buildOddsContext } from '@/lib/openrouter/agent'
import { checkAiQuota, incrementAiQuota } from '@/lib/ai-quota'

export async function POST(req: Request) {
  try {
    // Check AI quota
    const quota = await checkAiQuota()
    if (!quota.allowed) {
      return new Response(JSON.stringify({ error: quota.message }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const { messages } = await req.json()

    if (!messages || !Array.isArray(messages)) {
      return new Response('Invalid messages', { status: 400 })
    }

    const [userContext, oddsContext] = await Promise.all([
      buildUserContext(),
      buildOddsContext(),
    ])

    const response = await chatWithAgent(messages, userContext, oddsContext)

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenRouter error:', error)
      return new Response('AI service error', { status: 502 })
    }

    // Increment quota AFTER a successful response
    incrementAiQuota()

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
