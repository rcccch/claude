"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const steps = [
  {
    title: "Schmelzen",
    temp: "1.180 °C",
    text: "Quarzsand, Soda und Kalk schmelzen über Nacht im Hafenofen zu einer zähen, leuchtenden Masse.",
  },
  {
    title: "Anfangen",
    temp: "1.050 °C",
    text: "Mit der Pfeife nehmen wir einen Tropfen auf und drehen ihn, bis er rund und gleichmäßig ist.",
  },
  {
    title: "Blasen",
    temp: "900 °C",
    text: "Ein ruhiger Atemzug, dann Holz, Wasser und Schwerkraft. Hier entsteht die Form – ohne Model.",
  },
  {
    title: "Kühlen",
    temp: "480 °C → 20 °C",
    text: "Vierzehn Stunden im Kühlofen nehmen dem Glas die Spannung. Erst dann darf es auf den Tisch.",
  },
];

export function Process() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section
      id="werkstatt"
      ref={root}
      aria-labelledby="werkstatt-titel"
      className="overflow-hidden bg-cobalt-deep py-24 text-primary-foreground min-[900px]:flex min-[900px]:h-svh min-[900px]:flex-col min-[900px]:justify-center min-[900px]:py-0"
    >
      <h2
        id="werkstatt-titel"
        className="px-5 font-display text-[clamp(2.4rem,6vw,5rem)] font-bold leading-none tracking-tight [font-stretch:80%] sm:px-10"
      >
        Vom Feuer zur Form
      </h2>
      <ol
        ref={track}
        className="mt-14 grid gap-12 px-5 sm:px-10 min-[900px]:flex min-[900px]:w-max min-[900px]:gap-[6vw] min-[900px]:pr-[20vw]"
      >
        {steps.map((s, i) => (
          <li key={s.title} className="max-w-[30rem] min-[900px]:w-[34vw]">
            <div className="flex items-baseline gap-4 border-t border-white/25 pt-5">
              <span className="font-display text-6xl font-extrabold text-ember tabular-nums" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="font-display text-3xl font-bold">{s.title}</h3>
            </div>
            <p className="mt-2 text-ember">{s.temp}</p>
            <p className="mt-4 max-w-[38ch] text-lg leading-relaxed text-white/85">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
