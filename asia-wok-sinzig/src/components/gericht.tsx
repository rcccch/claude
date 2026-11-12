"use client";

import { useId, useRef } from "react";
import type { Gericht, Highlight } from "@/lib/data";
import { bild, menu } from "@/lib/data";
import { euro } from "@/lib/format";
import { IconBlatt, IconChili, IconPlus } from "./icons";

function Allergene({ codes, unsicher }: { codes: string[]; unsicher?: boolean }) {
  const id = useId();
  const knopf = useRef<HTMLButtonElement>(null);
  const pop = useRef<HTMLDivElement>(null);
  if (!codes.length) return null;
  const beschreibung = codes.map((c) => `${c} ${menu.legende[c] ?? "?"}`).join(", ");

  // Popover direkt unter dem Knopf platzieren (Top-Layer, position: fixed)
  const platzieren = () => {
    const b = knopf.current?.getBoundingClientRect();
    const p = pop.current;
    if (!b || !p) return;
    const breite = Math.min(320, window.innerWidth - 32);
    p.style.position = "fixed";
    p.style.left = `${Math.max(16, Math.min(b.left, window.innerWidth - breite - 16))}px`;
    const unten = b.bottom + 8;
    p.style.top = unten + 160 > window.innerHeight ? `${Math.max(16, b.top - 8 - p.offsetHeight)}px` : `${unten}px`;
  };

  return (
    <>
      <button
        ref={knopf}
        type="button"
        className="allergen-knopf zahl"
        popoverTarget={id}
        aria-label={`Allergene und Zusatzstoffe: ${beschreibung}`}
        title={beschreibung}
      >
        {codes.join(",")}
      </button>
      <div
        ref={pop}
        id={id}
        popover="auto"
        className="allergen-pop"
        onToggle={(e) => {
          if ((e as unknown as ToggleEvent).newState === "open") platzieren();
        }}
      >
        <strong>Allergene und Zusatzstoffe</strong>
        <ul>
          {codes.map((c) => (
            <li key={c}>
              <span className="zahl">{c}</span> {menu.legende[c] ?? "unbekannt"}
            </li>
          ))}
        </ul>
        {unsicher && <p className="hinweis-unsicher">Angaben werden noch geprüft.</p>}
      </div>
    </>
  );
}

/** Beschreibung ohne „(scharf)“-Zusatz, der als Merkmal separat erscheint. */
function ohneSchaerfe(text: string | null) {
  return (text ?? "").replace(/\s*\((leicht )?scharf\)/g, "").trim();
}

function Merkmale({ g }: { g: Gericht }) {
  const hat = g.scharf || g.vegetarisch || g.allergene.length;
  if (!hat) return null;
  return (
    <div className="merkmale">
      {g.scharf && (
        <span className="merkmal merkmal-scharf">
          <IconChili />
          {g.scharf === "leicht" ? "leicht scharf" : "scharf"}
        </span>
      )}
      {g.vegetarisch && (
        <span className="merkmal merkmal-veg">
          <IconBlatt />
          vegetarisch
        </span>
      )}
      <Allergene codes={g.allergene} unsicher={g.allergene_unsicher} />
    </div>
  );
}

export function GerichtZeile({
  g,
  onAdd,
  als = "li",
}: {
  g: Gericht;
  onAdd: (g: Gericht, quelle: HTMLElement | null) => void;
  als?: "li" | "div";
}) {
  const nrRef = useRef<HTMLSpanElement>(null);
  const Tag = als;
  const name = g.name.replace(/\s*\((leicht )?scharf\)/g, "");
  const beschreibung = ohneSchaerfe(g.beschreibung);
  return (
    <Tag className="gericht" id={`nr-${g.nr}`}>
      <span className="nr zahl" ref={nrRef} aria-hidden>
        {g.nr}
      </span>
      <div>
        <h3>
          <span className="sr-only">Nr. {g.nr}: </span>
          {name}
        </h3>
        {beschreibung && <p className="zutaten">{beschreibung}</p>}
        {g.unsicher && <p className="hinweis-unsicher">Beschreibung und Preis werden noch geprüft.</p>}
        <Merkmale g={g} />
      </div>
      <div className="preis-spalte">
        <span className="preis zahl">{euro(g.preis)}</span>
        <button
          type="button"
          className="plus"
          aria-label={`Nr. ${g.nr} ${name} auf den Bestellzettel${g.auswahl ? " (Auswahl öffnet sich)" : ""}`}
          aria-haspopup={g.auswahl ? "dialog" : undefined}
          onClick={() => onAdd(g, nrRef.current)}
        >
          <IconPlus />
        </button>
      </div>
    </Tag>
  );
}

export function GerichtHighlight({
  g,
  h,
  onAdd,
}: {
  g: Gericht;
  h: Highlight;
  onAdd: (g: Gericht, quelle: HTMLElement | null) => void;
}) {
  const b = bild(h.datei);
  return (
    <li className="highlight">
      <figure>
        <img src={b.src} srcSet={b.srcSet} sizes="(min-width: 640px) 300px, 100vw" alt={h.alt} loading="lazy" decoding="async" width={800} height={1000} />
        <span className="highlight-nr zahl" aria-hidden>
          {g.nr}
        </span>
      </figure>
      <GerichtZeile g={g} onAdd={onAdd} als="div" />
    </li>
  );
}
