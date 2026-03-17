import { Text } from '../typography/Text'
import type { ChatMessage as ChatMessageType } from '../../types'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-accent text-text-inverse rounded-br-md'
            : 'bg-bg-tertiary text-text-primary rounded-bl-md'
        }`}
      >
        <Text size="sm" className={isUser ? '!text-text-inverse' : ''}>
          {message.content}
        </Text>
      </div>
    </div>
  )
}
