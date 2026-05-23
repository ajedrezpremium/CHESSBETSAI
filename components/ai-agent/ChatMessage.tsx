import { cn } from '@/lib/utils'
import type { ChatMessage as ChatMessageType } from '@/types'

function renderMarkdown(text: string): string {
  let html = text
    .replace(/### (.+)/g, '<strong class="text-amber-400">$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="rounded bg-zinc-800 px-1 py-0.5 text-xs text-amber-400">$1</code>')
    .replace(/^- (.+)/gm, '<span class="block text-zinc-400">• $1</span>')
    .replace(/^\d+\. (.+)/gm, '<span class="block text-zinc-400">• $1</span>')
    .replace(/\n/g, '<br/>')
  return html
}

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex gap-3', isUser ? 'justify-end' : 'justify-start')}>
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-sm">
          <span className="text-amber-500">♟</span>
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-xl px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-amber-500/10 text-zinc-100'
            : 'bg-zinc-800/50 text-zinc-300'
        )}
      >
        {isUser ? (
          message.content
        ) : (
          <div
            className="[&_strong]:text-zinc-100 [&_br]:my-1"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
          />
        )}
      </div>
      {isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-sm text-zinc-400">
          U
        </div>
      )}
    </div>
  )
}
