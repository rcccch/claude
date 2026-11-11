"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/** Geteilter Zustand zwischen GSAP (Scroll) und dem WebGL-Render-Loop. */
export const glassState: { heat: number } = {
  /** 1 = glühend heiß (Seitenanfang), 0 = abgekühlt */
  heat: 1,
};

export { gsap, ScrollTrigger, SplitText, useGSAP };
