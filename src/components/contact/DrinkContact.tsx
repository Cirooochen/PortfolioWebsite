import { useEffect, useRef, useState } from 'react'
import { Heading } from '../typography/Heading'
import { Text } from '../typography/Text'
import { Button } from '../ui/Button'
import { glassHover, glassRest } from '../ui/glass'
import { contactEmail, drinkOptions, gmailComposeUrl } from '../../data/contact'
import type { DrinkId } from '../../data/contact'

const drinkIcons: Record<DrinkId, React.ReactNode> = {
  coffee: (
    <>
      <path d="M4 9h12v4.5A5.5 5.5 0 0 1 10.5 19h-1A5.5 5.5 0 0 1 4 13.5V9Z" />
      <path d="M16 10.5h1.5a2.5 2.5 0 0 1 0 5H16" />
      <path d="M8 3.5c0 1 1 1.5 1 2.5M12 3.5c0 1 1 1.5 1 2.5" />
    </>
  ),
  tea: (
    <>
      <path d="M5 10h12v2.5a6 6 0 0 1-12 0V10Z" />
      <path d="M3.5 21h15" />
      <path d="M11 10V6.5" />
      <path d="M9.5 3.5h3v3h-3z" />
    </>
  ),
  matcha: (
    <>
      <path d="M3 12h18a9 7.5 0 0 1-18 0Z" />
      <path d="M12 12V3.5" />
      <path d="M9.5 12 10.6 5" />
      <path d="M14.5 12 13.4 5" />
    </>
  ),
  water: (
    <>
      <path d="M6 3h12l-1.6 17.1A1.5 1.5 0 0 1 14.9 21.5H9.1a1.5 1.5 0 0 1-1.5-1.4L6 3Z" />
      <path d="M6.6 9.5c1.8-1 3.6 1 5.4 0s3.6 1 5.4 0" />
    </>
  ),
}

// How long the options take to fade out before the reply appears
const EXIT_MS = 260

/**
 * "Get in touch" as a drink order: pick a drink, the options step aside, and
 * a matching reply appears with my email.
 */
export function DrinkContact() {
  // `picked` starts the options' exit; `selected` swaps in the reply
  const [picked, setPicked] = useState<DrinkId | null>(null)
  const [selected, setSelected] = useState<DrinkId | null>(null)
  const replyRef = useRef<HTMLParagraphElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const hasChosen = useRef(false)
  const drink = drinkOptions.find((d) => d.id === selected)

  useEffect(() => {
    if (!picked || selected) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = setTimeout(() => setSelected(picked), reducedMotion ? 0 : EXIT_MS)
    return () => clearTimeout(timer)
  }, [picked, selected])

  // Keep keyboard focus on whatever replaced the button that was pressed
  useEffect(() => {
    if (selected) {
      hasChosen.current = true
      replyRef.current?.focus()
    } else if (hasChosen.current) {
      optionsRef.current?.querySelector('button')?.focus()
    }
  }, [selected])

  const reset = () => {
    setSelected(null)
    setPicked(null)
  }

  return (
    // One fixed-height stage, centred, so swapping question and reply doesn't move the page
    <div className="mx-auto flex min-h-[22rem] max-w-3xl flex-col items-center justify-center text-center">
      {/* Fades out with the options; stays for screen readers after a pick */}
      <Heading
        level={2}
        className={
          selected
            ? 'sr-only'
            : `mb-12 transition-all md:mb-14 duration-[260ms] ease-out ${picked ? '-translate-y-2 opacity-0' : ''}`
        }
      >
        What's your favourite drink?
      </Heading>

      <div aria-live="polite" className="w-full">
        {drink ? (
          <div key={drink.id} className="animate-slide-up">
            <span className="mb-6 inline-flex text-text-primary">
              <svg aria-hidden width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                {drinkIcons[drink.id]}
              </svg>
            </span>
            <p
              ref={replyRef}
              tabIndex={-1}
              className="mb-6 text-2xl font-semibold leading-tight tracking-tight text-text-primary outline-none md:text-[2rem]"
            >
              {drink.reply}
            </p>
            <Text muted className="mb-3">Reach me here, and next time we meet, the drink's on me.</Text>
            <a
              href={gmailComposeUrl(drink.subject)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-lg font-medium text-text-primary md:text-xl"
            >
              <span className="wave-underline">{contactEmail}</span>
              <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </a>
            <div className="mt-14">
              <Button variant="ghost" size="sm" onClick={reset}>
                <svg aria-hidden width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Pick another drink
              </Button>
            </div>
          </div>
        ) : (
          <div
            ref={optionsRef}
            role="radiogroup"
            aria-label="Favourite drink"
            className={`mx-auto grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4 md:gap-4 ${picked ? 'pointer-events-none' : 'animate-slide-up'}`}
          >
            {drinkOptions.map((option) => {
              const active = option.id === picked
              return (
                <button
                  key={option.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setPicked(option.id)}
                  className={`flex flex-col items-center gap-4 rounded-2xl px-4 py-7 text-center transition-all duration-[260ms] ease-out hover:-translate-y-px active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus md:py-8 ${
                    active
                      ? 'border border-bg-inverse bg-bg-inverse text-text-inverse shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)]'
                      : `${glassRest} text-text-primary ${glassHover}`
                  } ${picked ? (active ? 'scale-[0.97] opacity-0 delay-100' : 'translate-y-2 opacity-0') : ''}`}
                >
                  <svg aria-hidden width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    {drinkIcons[option.id]}
                  </svg>
                  <span className="text-sm font-medium tracking-wide">{option.label}</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
