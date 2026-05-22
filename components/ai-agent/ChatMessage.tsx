import { cn } from '@/lib/utils'
import type { ChatMessage as ChatMessageType } from '@/types'

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user'

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-sm">
          ♟
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-xl px-4 py-2 text-sm leading-relaxed',
          isUser
            ? 'bg-amber-500/10 text-zinc-100'
            : 'bg-zinc-800/50 text-zinc-300'
        )}
      >
        {message.content}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm text-zinc-400">
          U
        </div>
      )}
    </div>
  )
}
