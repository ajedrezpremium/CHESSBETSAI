'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import { SuggestedQuestions } from './SuggestedQuestions'
import type { ChatMessage as ChatMessageType } from '@/types'
import { MessageCircle, X, Send, Brain } from 'lucide-react'

const SUGGESTIONS = [
  '¿Qué partidos tienen mejor value hoy?',
  'Analiza el Barcelona vs Real Madrid',
  '¿Cómo gestionar mi bankroll?',
  'Explica el Kelly Criterion',
  '¿Qué es una value bet?',
  'Estrategias para live betting',
]

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '0',
      role: 'assistant',
      content: '¡Hola! Soy **Live Sports Bets AI**. Estoy aquí para analizar partidos en vivo, detectar value bets y ayudarte en tu formación. ¿En qué puedo ayudarte?',
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async (text?: string) => {
    const msg = (text || input).trim()
    if (!msg || loading) return

    setShowSuggestions(false)

    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    const RENDER_API = 'https://chessbetsai.onrender.com/chat'
    const LOCAL_API = '/api/chat'

    try {
      let reply = ''

      try {
        const res = await fetch(RENDER_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, userMsg].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        })
        if (res.ok) {
          const data = await res.json()
          reply = data.reply || ''
        }
      } catch {}

      if (!reply) {
        try {
          const res = await fetch(LOCAL_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [...messages, userMsg].map((m) => ({
                role: m.role,
                content: m.content,
              })),
            }),
          })
          if (res.ok) {
            const reader = res.body?.getReader()
            const decoder = new TextDecoder()
            if (reader) {
              const assistantId = (Date.now() + 1).toString()
              setMessages((prev) => [
                ...prev,
                { id: assistantId, role: 'assistant', content: '', timestamp: Date.now() },
              ])
              while (true) {
                const { done, value } = await reader.read()
                if (done) break
                const text = decoder.decode(value)
                const lines = text.split('\n').filter((l) => l.startsWith('data: '))
                for (const line of lines) {
                  const data = line.slice(6)
                  if (data === '[DONE]') continue
                  try {
                    const parsed = JSON.parse(data)
                    const content = parsed.choices?.[0]?.delta?.content || ''
                    setMessages((prev) => {
                      const copy = [...prev]
                      const last = copy[copy.length - 1]
                      if (last.role === 'assistant' && last.id === assistantId) {
                        copy[copy.length - 1] = { ...last, content: last.content + content }
                      }
                      return copy
                    })
                  } catch {}
                }
              }
              return
            }
          }
        } catch {}
      }

      if (reply) {
        setMessages((prev) => [
          ...prev,
          { id: (Date.now() + 1).toString(), role: 'assistant', content: reply, timestamp: Date.now() },
        ])
      } else {
        throw new Error('No response')
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Lo siento, hubo un error al comunicarme con el servidor. Intenta de nuevo.',
          timestamp: Date.now(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!open && (
        <div className="fixed bottom-6 right-6 z-50 group">
          <button
            onClick={() => setOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-black shadow-lg shadow-amber-500/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-amber-500/40"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
          <span className="absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-200 opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
            LSBets AI
          </span>
        </div>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[380px] flex-col rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-3">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-semibold text-zinc-100">Live Sports Bets AI</span>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-lg p-1 text-zinc-500 hover:text-zinc-300">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {showSuggestions && messages.length === 1 && (
              <SuggestedQuestions
                questions={SUGGESTIONS}
                onSelect={(q) => handleSend(q)}
              />
            )}

            {loading && (
              <div className="flex items-center gap-2 pl-2">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-amber-500" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-amber-500 [animation-delay:0.1s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-amber-500 [animation-delay:0.2s]" />
                </div>
                <span className="text-xs text-zinc-500">Analizando...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-zinc-700 p-4">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Analiza un partido..."
                className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 placeholder-zinc-500 outline-none focus:border-amber-500/50"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-black disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
