import { useState } from 'react'

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border-primary p-4">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask about Ciro's work..."
        disabled={disabled}
        className="flex-1 rounded-lg border border-border-primary bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary outline-none transition-colors focus:border-border-focus disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-text-inverse transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M1.5 1.5l13 6.5-13 6.5V9l8-1-8-1V1.5z" />
        </svg>
      </button>
    </form>
  )
}
