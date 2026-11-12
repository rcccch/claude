"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { euro } from "@/lib/format";

export interface Position {
  key: string;
  nr: string; // "" bei Extras
  name: string;
  preis: number;
  auswahl?: string;
  menge: number;
  notiz: string;
}

type Aktion =
  | { typ: "add"; pos: Omit<Position, "key" | "menge" | "notiz"> }
  | { typ: "menge"; key: string; delta: number }
  | { typ: "entfernen"; key: string }
  | { typ: "notiz"; key: string; notiz: string }
  | { typ: "leeren" }
  | { typ: "laden"; positionen: Position[] };

const SPEICHER = "asiawok-bestellzettel-v1";

function reducer(state: Position[], a: Aktion): Position[] {
  switch (a.typ) {
    case "add": {
      const key = `${a.pos.nr || a.pos.name}|${a.pos.auswahl ?? ""}`;
      const da = state.find((p) => p.key === key);
      if (da) return state.map((p) => (p.key === key ? { ...p, menge: p.menge + 1 } : p));
      return [...state, { ...a.pos, key, menge: 1, notiz: "" }];
    }
    case "menge":
      return state
        .map((p) => (p.key === a.key ? { ...p, menge: p.menge + a.delta } : p))
        .filter((p) => p.menge > 0);
    case "entfernen":
      return state.filter((p) => p.key !== a.key);
    case "notiz":
      return state.map((p) => (p.key === a.key ? { ...p, notiz: a.notiz } : p));
    case "leeren":
      return [];
    case "laden":
      return a.positionen;
  }
}

interface Ctx {
  positionen: Position[];
  anzahl: number;
  summe: number;
  hinzufuegen: (pos: Omit<Position, "key" | "menge" | "notiz">, quelle?: HTMLElement | null) => void;
  menge: (key: string, delta: number) => void;
  entfernen: (key: string) => void;
  notiz: (key: string, notiz: string) => void;
  leeren: () => void;
  ansage: string;
}

const OrderContext = createContext<Ctx | null>(null);

export function useOrder() {
  const c = useContext(OrderContext);
  if (!c) throw new Error("useOrder außerhalb von OrderProvider");
  return c;
}

/** Fliegende Nummer beim Hinzufügen: einziger inszenierter Moment der Seite. */
async function nummerFliegen(quelle: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const ziel = [...document.querySelectorAll<HTMLElement>("[data-zettel-ziel]")].find(
    (el) => el.offsetParent !== null,
  );
  if (!ziel) return;
  const { gsap } = await import("gsap");
  const q = quelle.getBoundingClientRect();
  const z = ziel.getBoundingClientRect();
  const flug = document.createElement("span");
  flug.className = "nummer-flug";
  flug.textContent = quelle.textContent;
  flug.style.left = `${q.left}px`;
  flug.style.top = `${q.top}px`;
  document.body.appendChild(flug);
  gsap.to(flug, {
    x: z.left + z.width / 2 - q.left - q.width / 2,
    y: z.top + z.height / 2 - q.top - q.height / 2,
    scale: 0.5,
    opacity: 0.2,
    duration: 0.45,
    ease: "power2.in",
    onComplete: () => {
      flug.remove();
      gsap.fromTo(ziel, { scale: 1.08 }, { scale: 1, duration: 0.25, ease: "power2.out", clearProps: "transform" });
    },
  });
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [positionen, dispatch] = useReducer(reducer, []);
  const [ansage, setAnsage] = useState("");
  const [bereit, setBereit] = useState(false);

  useEffect(() => {
    try {
      const roh = localStorage.getItem(SPEICHER);
      if (roh) dispatch({ typ: "laden", positionen: JSON.parse(roh) });
    } catch {
      /* Speicher nicht verfügbar – Zettel funktioniert trotzdem */
    }
    setBereit(true);
  }, []);

  useEffect(() => {
    if (!bereit) return;
    try {
      localStorage.setItem(SPEICHER, JSON.stringify(positionen));
    } catch {
      /* ignorieren */
    }
  }, [positionen, bereit]);

  const anzahl = positionen.reduce((s, p) => s + p.menge, 0);
  const summe = positionen.reduce((s, p) => s + p.menge * p.preis, 0);

  const melde = useCallback((text: string) => setAnsage(text), []);

  const value = useMemo<Ctx>(() => {
    const zusammenfassung = (pos: Position[]) => {
      const a = pos.reduce((s, p) => s + p.menge, 0);
      const su = pos.reduce((s, p) => s + p.menge * p.preis, 0);
      return `${a} ${a === 1 ? "Gericht" : "Gerichte"}, ${euro(su)}`;
    };
    return {
      positionen,
      anzahl,
      summe,
      ansage,
      hinzufuegen: (pos, quelle) => {
        const neu = reducer(positionen, { typ: "add", pos });
        dispatch({ typ: "add", pos });
        melde(`${pos.nr ? `Nr. ${pos.nr} ` : ""}${pos.name}${pos.auswahl ? `, ${pos.auswahl}` : ""} hinzugefügt. Zettel: ${zusammenfassung(neu)}.`);
        if (quelle) void nummerFliegen(quelle);
      },
      menge: (key, delta) => {
        const p = positionen.find((x) => x.key === key);
        const neu = reducer(positionen, { typ: "menge", key, delta });
        dispatch({ typ: "menge", key, delta });
        if (p) melde(`${p.nr ? `Nr. ${p.nr}` : p.name}: ${Math.max(p.menge + delta, 0)} Stück. Zettel: ${zusammenfassung(neu)}.`);
      },
      entfernen: (key) => {
        const p = positionen.find((x) => x.key === key);
        const neu = reducer(positionen, { typ: "entfernen", key });
        dispatch({ typ: "entfernen", key });
        if (p) melde(`${p.nr ? `Nr. ${p.nr}` : p.name} entfernt. Zettel: ${zusammenfassung(neu)}.`);
      },
      notiz: (key, notiz) => dispatch({ typ: "notiz", key, notiz }),
      leeren: () => {
        dispatch({ typ: "leeren" });
        melde("Bestellzettel geleert.");
      },
    };
  }, [positionen, anzahl, summe, ansage, melde]);

  return (
    <OrderContext.Provider value={value}>
      {children}
      <p className="sr-only" aria-live="polite" role="status">
        {ansage}
      </p>
    </OrderContext.Provider>
  );
}
