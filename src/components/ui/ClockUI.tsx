import { useState, useEffect } from 'react'

const locations = [
  { label: 'Berlin', tz: 'Europe/Berlin' },
  { label: 'Urumqi', tz: 'Asia/Urumqi' },
]

function AnalogClock({ date }: { date: Date }) {
  const s = date.getSeconds()
  const m = date.getMinutes()
  const h = date.getHours() % 12

  const secDeg = s * 6
  const minDeg = m * 6 + s * 0.1
  const hrDeg = h * 30 + m * 0.5

  return (
    <svg width="52" height="52" viewBox="0 0 52 52">
      <circle cx="26" cy="26" r="24" fill="none" stroke="var(--color-gray-400)" strokeWidth="1.2" />
      {[...Array(12)].map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const x1 = 26 + 20 * Math.sin(angle)
        const y1 = 26 - 20 * Math.cos(angle)
        const x2 = 26 + 22 * Math.sin(angle)
        const y2 = 26 - 22 * Math.cos(angle)
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--color-gray-500)" strokeWidth="1" />
      })}
      <line
        x1="26" y1="26"
        x2={26 + 12 * Math.sin((hrDeg * Math.PI) / 180)}
        y2={26 - 12 * Math.cos((hrDeg * Math.PI) / 180)}
        stroke="var(--color-text-primary)" strokeWidth="2" strokeLinecap="round"
      />
      <line
        x1="26" y1="26"
        x2={26 + 17 * Math.sin((minDeg * Math.PI) / 180)}
        y2={26 - 17 * Math.cos((minDeg * Math.PI) / 180)}
        stroke="var(--color-text-primary)" strokeWidth="1.5" strokeLinecap="round"
      />
      <line
        x1="26" y1="26"
        x2={26 + 19 * Math.sin((secDeg * Math.PI) / 180)}
        y2={26 - 19 * Math.cos((secDeg * Math.PI) / 180)}
        stroke="#c0392b" strokeWidth="1" strokeLinecap="round"
      />
      <circle cx="26" cy="26" r="1.5" fill="var(--color-text-primary)" />
    </svg>
  )
}

export function ClockUI() {
  const [now, setNow] = useState(new Date())
  const [activeIdx, setActiveIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const getDateInTz = (tz: string) => {
    const str = now.toLocaleString('en-US', { timeZone: tz })
    return new Date(str)
  }

  const activeDate = getDateInTz(locations[activeIdx].tz)

  return (
    <div className="flex items-center gap-3.5">
      <AnalogClock date={activeDate} />
      <div className="flex flex-col gap-0.5">
        {locations.map((loc, i) => (
          <button
            key={loc.label}
            onClick={() => setActiveIdx(i)}
            className="flex items-center gap-1.5 bg-transparent border-none cursor-pointer p-0 text-xs tracking-wide"
          >
            <span className={`text-[11px] min-w-5 ${i === activeIdx ? 'text-text-primary' : 'text-text-tertiary'}`}>
              {i === activeIdx ? '[•]' : '[ ]'}
            </span>
            <span className={i === activeIdx ? 'font-medium text-text-primary' : 'text-text-tertiary'}>
              {loc.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
