"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP, glassState } from "@/lib/gsap";

// WebGL nur im Browser und erst nach dem ersten Paint laden.
const GlassBlob = dynamic(() => import("./glass-blob"), { ssr: false });

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [show3d, setShow3d] = useState(false);

  // WebGL erst laden, wenn der Browser nach dem ersten Rendern Luft hat.
  useEffect(() => {
    // Ohne WebGL (alte Geräte, deaktivierte Hardwarebeschleunigung) bleibt der Hero rein typografisch.
    const canvas = document.createElement("canvas");
    const hasWebGL = !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
    if (!hasWebGL) return;
    const start = () => setShow3d(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 1200);
    return () => clearTimeout(t);
  }, []);

  useGSAP(
    () => {
      // Scroll kühlt das Glas ab, solange der Hero sichtbar ist.
      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "bottom 20%",
        onUpdate: (self) => {
          glassState.heat = 1 - self.progress;
        },
      });

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(".hero-title", { type: "lines,words", mask: "lines" });
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(split.words, { yPercent: 110, duration: 1.4, stagger: 0.06 })
          .from(".hero-blob", { scale: 0.6, opacity: 0, duration: 2.4 }, 0.3)
          .from(".hero-meta", { opacity: 0, y: 16, duration: 1, stagger: 0.1 }, 0.7);

        gsap.to(".hero-blob", {
          yPercent: 30,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        return () => split.revert();
      });
    },
    { scope: root }
  );

  return (
    <header
      ref={root}
      className="relative isolate grid min-h-svh grid-rows-[auto_1fr_auto] overflow-hidden px-5 pb-8 pt-6 sm:px-10"
    >
      <nav aria-label="Hauptnavigation" className="hero-meta flex items-baseline justify-between gap-6">
        <a href="#" className="font-display text-xl font-bold tracking-tight [font-stretch:80%]">
          Studio Fluss
        </a>
        <ul className="flex gap-5 text-base sm:gap-8">
          <li><a className="underline-offset-4 hover:underline" href="#werkstatt">Werkstatt</a></li>
          <li><a className="underline-offset-4 hover:underline" href="#sammlung">Sammlung</a></li>
          <li><a className="underline-offset-4 hover:underline" href="#besuch">Besuch</a></li>
        </ul>
      </nav>

      <div className="hero-blob pointer-events-none absolute inset-x-0 top-[10vh] -z-10 mx-auto h-[58svh] max-w-[1100px] sm:left-auto sm:right-[-6vw] sm:top-[4vh] sm:h-[78svh] sm:w-[62vw]">
        {show3d && <GlassBlob />}
      </div>

      <div className="flex items-end">
        <h1 className="hero-title max-w-[11ch] font-display text-[clamp(3.6rem,13vw,12.5rem)] font-extrabold leading-[0.9] tracking-[-0.02em] [font-stretch:85%]">
          Glas, das noch atmet
        </h1>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <p className="hero-meta max-w-[34ch] text-lg leading-relaxed sm:text-xl">
          Wir formen Gläser, Karaffen und Leuchten frei vor der Flamme – bei 1.180 Grad, ohne Form,
          jedes Stück ein einziges Mal.
        </p>
        <p className="hero-meta text-base text-muted-foreground">
          Scrollen Sie – das Glas kühlt dabei ab.
        </p>
      </div>
    </header>
  );
}
