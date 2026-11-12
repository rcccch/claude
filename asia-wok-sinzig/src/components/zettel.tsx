"use client";

import { forwardRef, useState } from "react";
import { restaurant } from "@/lib/data";
import { euro, telHref } from "@/lib/format";
import { useOrder, type Position } from "./order-context";
import { IconMinus, IconPlus, IconTelefon, IconX } from "./icons";

const tel = restaurant.telefon[0];

function PositionZeile({ p }: { p: Position }) {
  const { menge, entfernen, notiz } = useOrder();
  const [notizOffen, setNotizOffen] = useState(p.notiz !== "");
  const bez = p.nr ? `Nr. ${p.nr}` : p.name;
  return (
    <li className="zettel-pos">
      <div className="zettel-pos-kopf">
        <span className="nr zahl" aria-hidden>{p.nr}</span>
        <span className="zettel-pos-name">
          {p.name}
          {p.auswahl && <span className="zettel-pos-auswahl">{p.auswahl}</span>}
        </span>
        <span className="preis zahl">{euro(p.preis * p.menge)}</span>
      </div>
      <div className="zettel-pos-steuerung">
        <button type="button" className="mini" onClick={() => menge(p.key, -1)} aria-label={`${bez}: eins weniger`}>
          <IconMinus />
        </button>
        <span className="menge zahl" aria-label={`${p.menge} Stück`}>{p.menge}</span>
        <button type="button" className="mini" onClick={() => menge(p.key, 1)} aria-label={`${bez}: eins mehr`}>
          <IconPlus />
        </button>
        <button type="button" className="text-knopf" aria-expanded={notizOffen} onClick={() => setNotizOffen((o) => !o)}>
          Notiz
        </button>
        <button type="button" className="text-knopf" onClick={() => entfernen(p.key)} aria-label={`${bez} entfernen`}>
          Entfernen
        </button>
      </div>
      {notizOffen && (
        <label className="notiz">
          <span className="sr-only">Notiz zu {bez}</span>
          <input
            type="text"
            value={p.notiz}
            maxLength={80}
            placeholder="z. B. ohne Zwiebeln"
            onChange={(e) => notiz(p.key, e.target.value)}
          />
        </label>
      )}
    </li>
  );
}

/** Inhalt des Bestellzettels – genutzt in der Seitenleiste (Desktop) und im Blatt (Handy). */
export function ZettelInhalt({ onDurchgeben, kopfId }: { onDurchgeben: () => void; kopfId: string }) {
  const { positionen, anzahl, summe, leeren } = useOrder();
  return (
    <div className="zettel">
      <div className="zettel-kopf">
        <h2 id={kopfId}>Bestellzettel</h2>
        <span className="display zahl" style={{ fontWeight: 700, fontSize: "1.125rem" }} data-zettel-ziel>
          {anzahl} {anzahl === 1 ? "Gericht" : "Gerichte"}
        </span>
      </div>
      <p className="zettel-hinweis">Merkzettel für Ihre telefonische Bestellung – keine Online-Bestellung.</p>
      {positionen.length === 0 ? (
        <p className="zettel-leer">Tippen Sie bei einem Gericht auf „+“, um es zu notieren.</p>
      ) : (
        <>
          <ul className="zettel-liste">
            {positionen.map((p) => (
              <PositionZeile key={p.key} p={p} />
            ))}
          </ul>
          <div className="zettel-summe">
            <span>Summe</span>
            <span className="zahl">{euro(summe)}</span>
          </div>
          <p className="zettel-hinweis" style={{ marginTop: 6 }}>Zahlung bei Abholung, nur bar.</p>
          <div className="zettel-aktionen">
            <button type="button" className="btn btn-gruen" onClick={onDurchgeben}>
              Bestellung telefonisch durchgeben
            </button>
            <button type="button" className="text-knopf" onClick={leeren}>
              Zettel leeren
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function bestellText(positionen: Position[], summe: number) {
  const zeilen = positionen.map((p) => {
    const nr = p.nr ? `Nr. ${p.nr} ` : "";
    const aus = p.auswahl ? ` (${p.auswahl})` : "";
    const no = p.notiz ? ` – ${p.notiz}` : "";
    return `${p.menge} × ${nr}${p.name}${aus}${no} – ${euro(p.preis * p.menge)}`;
  });
  return [`Bestellung Asia Wok Sinzig`, ...zeilen, `Summe: ${euro(summe)}`, `Zur Abholung, Zahlung bar.`].join("\n");
}

/** Abschlussansicht: gut vorlesbare Liste für das Telefonat. */
export const Vorlesen = forwardRef<HTMLDialogElement, { onClose: () => void }>(function Vorlesen({ onClose }, ref) {
  const { positionen, summe } = useOrder();
  const [kopiert, setKopiert] = useState(false);
  const kopieren = async () => {
    try {
      await navigator.clipboard.writeText(bestellText(positionen, summe));
      setKopiert(true);
      setTimeout(() => setKopiert(false), 2500);
    } catch {
      setKopiert(false);
    }
  };
  return (
    <dialog ref={ref} className="blatt" aria-labelledby="vorlesen-titel" onClose={onClose}>
      <div className="blatt-inhalt vorlesen druckbereich">
        <div className="blatt-kopf">
          <h2 id="vorlesen-titel">Ihre Bestellung zum Durchgeben</h2>
          <form method="dialog" className="druck-aus">
            <button className="schliessen" aria-label="Schließen"><IconX /></button>
          </form>
        </div>
        <p style={{ margin: "0 0 8px" }}>
          Rufen Sie uns an und lesen Sie die Nummern vor: <strong className="zahl">{tel.anzeige}</strong>
        </p>
        <ol>
          {positionen.map((p) => (
            <li key={p.key}>
              <span className="menge-gross zahl">{p.menge} ×</span>
              <span>
                {p.nr && <span className="nr-gross zahl">Nr. {p.nr} </span>}
                {p.name}
                {p.auswahl && <span className="notiz-text">{p.auswahl}</span>}
                {p.notiz && <span className="notiz-text">Notiz: {p.notiz}</span>}
              </span>
              <span className="zahl display" style={{ fontWeight: 600 }}>{euro(p.preis * p.menge)}</span>
            </li>
          ))}
        </ol>
        <div className="vorlesen-summe">
          <span>Summe</span>
          <span className="zahl">{euro(summe)}</span>
        </div>
        <p style={{ marginTop: 10 }}>{restaurant.bestellung.hinweis} Zahlung nur bar.</p>
        <div className="vorlesen-aktionen druck-aus">
          <a className="btn btn-gruen" href={telHref(tel.e164)}>
            <IconTelefon className="w-5 h-5" /> Jetzt anrufen
          </a>
          <button type="button" className="btn btn-hell" onClick={kopieren}>
            {kopiert ? "Kopiert" : "Kopieren"}
          </button>
          <button type="button" className="btn btn-hell" onClick={() => window.print()}>
            Drucken
          </button>
        </div>
        <p className="zettel-hinweis druck-aus" style={{ marginTop: 12 }}>
          Dies ist ein Merkzettel. Ihre Bestellung gilt erst, wenn Sie sie telefonisch aufgegeben haben.
        </p>
      </div>
    </dialog>
  );
});
