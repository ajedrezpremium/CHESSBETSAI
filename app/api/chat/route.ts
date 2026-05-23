import { chatWithAgent, buildUserContext, buildOddsContext } from '@/lib/openrouter/agent'
import type { AgentMessage } from '@/lib/openrouter/agent'
import { checkAiQuota, incrementAiQuota } from '@/lib/ai-quota'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const quota = await checkAiQuota()
    if (!quota.allowed) {
      return Response.json({ error: quota.message }, { status: 429 })
    }

    const { messages } = await req.json()
    if (!messages || !Array.isArray(messages)) {
      return Response.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const supabase = await createClient()
    const { data: { user } } = await supabase?.auth?.getUser() || {}

    const lastUserMsg = messages.filter((m: any) => m.role === 'user').pop()
    if (user && lastUserMsg) {
      await supabase.from('conversation_memory').insert({
        user_id: user.id, role: 'user', content: lastUserMsg.content,
      })
    }

    let memoryMessages: AgentMessage[] = []
    if (user) {
      const { data: mem } = await supabase
        .from('conversation_memory')
        .select('role, content')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20)
      if (mem) {
        memoryMessages = (mem.reverse() as { role: 'user' | 'assistant' | 'system'; content: string }[]).map(m => ({ role: m.role, content: m.content }))
      }
    }

    const [userContext, oddsContext] = await Promise.all([
      buildUserContext(),
      buildOddsContext(),
    ])

    const response = await chatWithAgent(messages, userContext, oddsContext, memoryMessages)

    if (!response.ok) {
      const error = await response.text()
      console.error('OpenRouter error:', error)
      return Response.json({ error: 'AI service error' }, { status: 502 })
    }

    incrementAiQuota()

    const data = await response.json()
    const aiContent = data.choices?.[0]?.message?.content || ''

    // Save AI response to memory
    if (user && aiContent) {
      await supabase.from('conversation_memory').insert({
        user_id: user.id, role: 'assistant', content: aiContent,
      })
    }

    return Response.json({ content: aiContent })
  } catch (error) {
    console.error('Chat API error:', error)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
