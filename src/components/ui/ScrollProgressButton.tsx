import { useEffect, useRef, useState } from "react";
import { getLenis } from "../../hooks/useLenis";

// Adapted from Ciro's ScrollLinkedProgressBtn (Customized-Components), without the motion and icon libraries

/** Reading progress at which the ring turns into a back-to-top button */
const showArrowAt = 0.2;
/** Progress before the ring fades in, so it stays out of the way at the very top */
const showRingAt = 0.02;

const size = 56;
const stroke = 2;
// The ring sits on the button's edge and doubles as its border
const radius = (size - stroke) / 2;
const circumference = 2 * Math.PI * radius;

function pageProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

/**
 * A ring in the corner that fills as the page is read. Past 60% it shows an
 * arrow and becomes a button that scrolls back to the top.
 */
export function ScrollProgressButton() {
  const ringRef = useRef<SVGCircleElement>(null);
  const [started, setStarted] = useState(false);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = pageProgress();
      // The ring is drawn straight from scroll; only the thresholds go through React
      ringRef.current?.style.setProperty(
        "stroke-dashoffset",
        String(circumference * (1 - progress)),
      );
      setStarted(progress >= showRingAt);
      setShowArrow(progress >= showArrowAt);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const backToTop = () => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(0, { immediate: reduced });
    else window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    // The button hides at the top, so hand focus to the page title instead of losing it
    const title = document.querySelector<HTMLElement>("main h1");
    if (title) {
      title.tabIndex = -1;
      title.focus({ preventScroll: true });
    }
  };

  return (
    <div
      aria-hidden={!showArrow}
      className={`fixed bottom-6 right-6 z-40 transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-opacity ${
        started
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Same frosted surface as the scrolled navbar */}
      <div className="relative size-14 rounded-full bg-bg-primary/45 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.2)] backdrop-blur-md">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0 -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            className="stroke-cs-rule"
          />
          <circle
            ref={ringRef}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            className="stroke-cs-accent"
          />
        </svg>

        <button
          type="button"
          onClick={backToTop}
          inert={!showArrow}
          aria-label="Back to top"
          className={`absolute inset-0 flex items-center justify-center rounded-full text-cs-ink transition-[opacity,scale] duration-300 ease-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus motion-reduce:transition-opacity motion-reduce:hover:scale-100 ${
            showArrow ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
