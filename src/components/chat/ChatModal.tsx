import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { Heading } from '../typography/Heading'
import { Text } from '../typography/Text'
import { Button } from '../ui/Button'
import { useChat } from '../../hooks/useChat'

interface ChatModalProps {
  onClose: () => void
}

export function ChatModal({ onClose }: ChatModalProps) {
  const { messages, isLoading, sendMessage } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-overlay animate-fade-in">
      <div
        className="flex h-[min(640px,85vh)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-border-primary bg-bg-primary shadow-xl animate-slide-up"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-primary px-5 py-4">
          <div>
            <Heading level={4}>Chat with Ciro's AI</Heading>
            <Text size="sm" muted>Ask me anything about Ciro's work</Text>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 5L5 15M5 5l10 10" />
            </svg>
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <Text muted size="sm">No messages yet.</Text>
                <Text muted size="sm">Ask about Ciro's projects, design philosophy, or experience!</Text>
              </div>
            </div>
          )}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-bg-tertiary px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-text-tertiary animate-pulse-dot" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-text-tertiary animate-pulse-dot" style={{ animationDelay: '300ms' }} />
                  <span className="h-2 w-2 rounded-full bg-text-tertiary animate-pulse-dot" style={{ animationDelay: '600ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  )
}
