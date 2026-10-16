interface ChatButtonProps {
  onClick: () => void
}

export function ChatButton({ onClick }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 flex size-14 items-center justify-center rounded-full border border-white/70 bg-white/55 text-text-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_30px_-10px_rgba(0,0,0,0.25),0_2px_6px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.06] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/85 hover:shadow-[inset_0_1px_0_rgba(255,255,255,1),0_16px_36px_-12px_rgba(0,0,0,0.3),0_4px_10px_rgba(0,0,0,0.06)] active:translate-y-0 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
      aria-label="Open chat"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  )
}
