'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import { Button } from '@/components/ui/button'
import type { ChatMessage as ChatMessageType } from '@/types'
import { MessageCircle, X, Send, Brain } from 'lucide-react'

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '0',
      role: 'assistant',
      content: '¡Hola! Soy Live Sports Bets AI. Estoy aquí para analizar partidos en vivo, detectar value bets y ayudarte en tu formación. ¿En qué puedo ayudarte?',
      timestamp: Date.now(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      if (!res.ok) throw new Error('Error')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        const assistantId = (Date.now() + 1).toString()
        setMessages((prev) => [
          ...prev,
          {
            id: assistantId,
            role: 'assistant',
            content: '',
            timestamp: Date.now(),
          },
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
                  copy[copy.length - 1] = {
                    ...last,
                    content: last.content + content,
                  }
                }
                return copy
              })
            } catch {}
          }
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Lo siento, hubo un error. Intenta de nuevo.',
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
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-black shadow-lg shadow-amber-500/30 transition-all hover:scale-110 hover:shadow-xl hover:shadow-amber-500/40"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[380px] flex-col rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-700 px-4 py-3">
            <div className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-semibold text-zinc-100">
                Live Sports Bets AI
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-zinc-500 hover:text-zinc-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-amber-500" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-amber-500 [animation-delay:0.1s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-amber-500 [animation-delay:0.2s]" />
                </div>
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
                onClick={handleSend}
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
