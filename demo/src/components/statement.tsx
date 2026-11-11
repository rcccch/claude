"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

const text =
  "Kein Glas gleicht dem anderen. Kleine Bläschen und Schlieren sind keine Fehler – sie zeigen, dass hier ein Mensch gearbeitet hat und keine Maschine.";

export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".statement-text", { type: "words", aria: "hidden" });
        gsap.fromTo(
          split.words,
          { opacity: 0.5 }, // ≥ 3:1 Kontrast auch im Ausgangszustand (WCAG AA, großer Text)
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 75%", end: "bottom 60%", scrub: true },
          }
        );
        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="inhalt" className="px-5 py-[22vh] sm:px-10">
      <p className="sr-only">{text}</p>
      <p aria-hidden="true" className="statement-text mx-auto max-w-[24ch] font-text text-[clamp(2rem,4.6vw,4.2rem)] italic leading-[1.12] tracking-[-0.01em]">
        {text}
      </p>
    </section>
  );
}
