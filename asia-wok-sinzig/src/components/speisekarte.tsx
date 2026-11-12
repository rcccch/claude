"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { bild, highlights, menu, restaurant, type Auswahl, type Gericht } from "@/lib/data";
import { euro, normalisieren, telHref } from "@/lib/format";
import { GerichtHighlight, GerichtZeile } from "./gericht";
import { useOrder } from "./order-context";
import { Vorlesen, ZettelInhalt } from "./zettel";
import { IconBlatt, IconChili, IconPfeil, IconPlus, IconSuche, IconTelefon, IconX } from "./icons";

const tel = restaurant.telefon[0];
const highlightNachNr = new Map(highlights.gerichte.map((h) => [h.nr, h]));
const katBild = new Map(highlights.kategorien.map((k) => [k.kategorie, k]));

// Suchindex einmal vorbereiten
const index = new Map(
  menu.kategorien.flatMap((k) =>
    k.gerichte.map((g) => [g, normalisieren(`${g.nr} ${g.name} ${g.beschreibung ?? ""} ${k.titel}`)] as const),
  ),
);

function passt(g: Gericht, q: string, veg: boolean, scharf: boolean) {
  if (veg && !g.vegetarisch) return false;
  if (scharf && !g.scharf) return false;
  if (!q) return true;
  if (/^\d+[a-z]?$/.test(q)) return g.nr.toLowerCase() === q || g.nr.startsWith(q);
  const text = index.get(g) ?? "";
  return q.split(" ").every((wort) => text.includes(wort));
}

type AuswahlZiel = { nr: string; name: string; preis: number; auswahl: Auswahl; quelle: HTMLElement | null };

export function Speisekarte() {
  const { hinzufuegen, anzahl, summe } = useOrder();
  const [suche, setSuche] = useState("");
  const [veg, setVeg] = useState(false);
  const [scharf, setScharf] = useState(false);
  const [aktiv, setAktiv] = useState(menu.kategorien[0].id);
  const [auswahlZiel, setAuswahlZiel] = useState<AuswahlZiel | null>(null);
  const [suchOffen, setSuchOffen] = useState(false);

  const katDialog = useRef<HTMLDialogElement>(null);
  const auswahlDialog = useRef<HTMLDialogElement>(null);
  const zettelDialog = useRef<HTMLDialogElement>(null);
  const vorlesenDialog = useRef<HTMLDialogElement>(null);

  const q = normalisieren(suche);
  const gefiltert = q !== "" || veg || scharf;
  const kategorien = useMemo(
    () =>
      menu.kategorien
        .map((k) => ({ ...k, gerichte: k.gerichte.filter((g) => passt(g, q, veg, scharf)) }))
        .filter((k) => k.gerichte.length > 0),
    [q, veg, scharf],
  );
  const treffer = kategorien.reduce((s, k) => s + k.gerichte.length, 0);
  const extrasSichtbar = !gefiltert;

  // Scrollspy: aktiv ist die letzte Kategorie, deren Anfang die Leiste erreicht hat
  useEffect(() => {
    let raf = 0;
    const pruefen = () => {
      raf = 0;
      const leiste = document.querySelector(".kartenleiste")?.getBoundingClientRect().bottom ?? 80;
      const abschnitte = [...document.querySelectorAll<HTMLElement>("[data-kategorie]")];
      let id = abschnitte[0]?.dataset.kategorie;
      for (const a of abschnitte) if (a.getBoundingClientRect().top <= leiste + window.innerHeight * 0.25) id = a.dataset.kategorie;
      if (id) setAktiv(id);
    };
    const beiScroll = () => { if (!raf) raf = requestAnimationFrame(pruefen); };
    pruefen();
    window.addEventListener("scroll", beiScroll, { passive: true });
    window.addEventListener("resize", beiScroll);
    return () => { window.removeEventListener("scroll", beiScroll); window.removeEventListener("resize", beiScroll); cancelAnimationFrame(raf); };
  }, [kategorien, extrasSichtbar]);

  // Bei neuer Suche/Filter: Anfang der Trefferliste zeigen, falls weggescrollt
  useEffect(() => {
    if (!gefiltert) return;
    const karte = document.getElementById("speisekarte");
    if (karte && karte.getBoundingClientRect().top < 0) karte.scrollIntoView({ behavior: "instant" as ScrollBehavior });
  }, [q, veg, scharf, gefiltert]);

  const aktivTitel =
    aktiv === "extras" ? menu.extras.titel : (menu.kategorien.find((k) => k.id === aktiv)?.titel ?? "Speisekarte");

  const gerichtAdd = useCallback(
    (g: Gericht, quelle: HTMLElement | null) => {
      const name = g.name.replace(/\s*\((leicht )?scharf\)/g, "");
      if (g.auswahl) {
        setAuswahlZiel({ nr: g.nr, name, preis: g.preis, auswahl: g.auswahl, quelle });
        auswahlDialog.current?.showModal();
        return;
      }
      hinzufuegen({ nr: g.nr, name, preis: g.preis }, quelle);
    },
    [hinzufuegen],
  );

  const zuKategorie = (id: string) => {
    katDialog.current?.close();
    document.getElementById(`kat-${id}`)?.scrollIntoView();
    document.getElementById(`kat-${id}`)?.querySelector<HTMLElement>("h2")?.focus({ preventScroll: true });
  };

  const navListe = (
    <>
      {kategorien.map((k) => (
        <li key={k.id}>
          <a
            href={`#kat-${k.id}`}
            aria-current={aktiv === k.id ? "true" : undefined}
            onClick={(e) => {
              e.preventDefault();
              zuKategorie(k.id);
            }}
          >
            <span>{k.titel}</span>
            <small className="zahl kat-anzahl">{k.gerichte.length}</small>
          </a>
        </li>
      ))}
      {extrasSichtbar && (
        <li>
          <a href="#kat-extras" aria-current={aktiv === "extras" ? "true" : undefined} onClick={(e) => { e.preventDefault(); zuKategorie("extras"); }}>
            <span>{menu.extras.titel}</span>
            <small className="zahl kat-anzahl">{menu.extras.posten.length}</small>
          </a>
        </li>
      )}
    </>
  );

  return (
    <div className="karte-raster">
      <nav className="seitennav" aria-label="Kategorien der Speisekarte">
        <h2>Kategorien</h2>
        <ol>{navListe}</ol>
      </nav>

      <div className="karte" id="speisekarte">
        <div className="kartenleiste">
          <div className="leiste-zeile">
            <button
              type="button"
              className="kat-knopf"
              aria-haspopup="dialog"
              onClick={() => katDialog.current?.showModal()}
            >
              <span>{aktivTitel}</span>
              <IconPfeil />
              <span className="sr-only">– alle Kategorien anzeigen</span>
            </button>
            <button
              type="button"
              className="chip such-toggle"
              aria-expanded={suchOffen || gefiltert}
              aria-controls="such-bereich"
              onClick={() => {
                const neu = !suchOffen;
                setSuchOffen(neu);
                if (neu) setTimeout(() => document.getElementById("suche")?.focus(), 0);
              }}
            >
              <IconSuche className="w-4 h-4" /> {gefiltert ? "Filter aktiv" : "Suchen & Filtern"}
            </button>
          </div>
          <div className="leiste-ausklapp" id="such-bereich" data-offen={suchOffen || gefiltert ? "true" : "false"}>
          <div className="leiste-zeile">
            <div className="suche" role="search">
              <IconSuche />
              <label htmlFor="suche" className="sr-only">Speisekarte durchsuchen</label>
              <input
                id="suche"
                type="search"
                inputMode="search"
                autoComplete="off"
                placeholder="Nummer, Gericht oder Zutat"
                value={suche}
                onChange={(e) => setSuche(e.target.value)}
              />
              {suche && (
                <button type="button" className="suche-leeren" onClick={() => setSuche("")} aria-label="Suche löschen">
                  <IconX />
                </button>
              )}
            </div>
          </div>
          <div className="filter" role="group" aria-label="Filter">
            <button type="button" className="chip" aria-pressed={veg} onClick={() => setVeg((v) => !v)}>
              <IconBlatt className="w-3.5 h-3.5" /> vegetarisch
            </button>
            <button type="button" className="chip" aria-pressed={scharf} onClick={() => setScharf((v) => !v)}>
              <IconChili className="w-3.5 h-3.5" /> scharf
            </button>
            <a className="chip-link" href="#legende">Allergene</a>
          </div>
          </div>
          <p className="sr-only" aria-live="polite">
            {gefiltert ? `${treffer} ${treffer === 1 ? "Gericht" : "Gerichte"} gefunden` : ""}
          </p>
        </div>

        {treffer === 0 && (
          <div className="leer">
            <p>Kein Gericht gefunden. Rufen Sie uns an, wir helfen gern weiter.</p>
            <a className="btn btn-gruen" href={telHref(tel.e164)}>
              <IconTelefon className="w-5 h-5" /> {tel.anzeige}
            </a>
          </div>
        )}

        {kategorien.map((k) => {
          const kb = katBild.get(k.id);
          return (
            <section
              key={k.id}
              id={`kat-${k.id}`}
              className="kategorie"
              data-kategorie={k.id}
              data-hervorheben={k.hervorheben ? "true" : undefined}
              aria-labelledby={`h-${k.id}`}
            >
              <h2 id={`h-${k.id}`} tabIndex={-1}>{k.titel}</h2>
              {(k.untertitel || k.hinweis) && <p className="kat-sub">{k.untertitel ?? k.hinweis}</p>}
              {kb && !gefiltert && (
                <div className="kat-bild">
                  <img {...bild(kb.datei)} sizes="(min-width: 1024px) 720px, 100vw" alt={kb.alt} loading="lazy" decoding="async" width={1400} height={725} />
                </div>
              )}
              <ul className="gerichte">
                {k.gerichte.map((g) => {
                  const h = highlightNachNr.get(g.nr);
                  return h && !gefiltert ? (
                    <GerichtHighlight key={g.nr} g={g} h={h} onAdd={gerichtAdd} />
                  ) : (
                    <GerichtZeile key={g.nr} g={g} onAdd={gerichtAdd} />
                  );
                })}
              </ul>
            </section>
          );
        })}

        {extrasSichtbar && (
          <section id="kat-extras" className="kategorie" data-kategorie="extras" aria-labelledby="h-extras">
            <h2 id="h-extras" tabIndex={-1}>{menu.extras.titel}</h2>
            <ul className="gerichte extras-liste">
              {menu.extras.posten.map((e) => (
                <li key={e.id} className="gericht">
                  <div>
                    <h3>{e.name}</h3>
                    {(e.hinweis || e.gruppe) && <p className="zutaten">{e.hinweis ?? e.gruppe}</p>}
                  </div>
                  <div className="preis-spalte">
                    <span className="preis zahl">{e.aufpreis ? "+ " : ""}{euro(e.preis)}</span>
                    <button
                      type="button"
                      className="plus"
                      aria-label={`${e.name} auf den Bestellzettel`}
                      onClick={(ev) => {
                        const name = e.hinweis ? `${e.hinweis}:` : e.name;
                        if (e.auswahl) {
                          setAuswahlZiel({ nr: "", name: e.hinweis ? "Statt Reis" : e.gruppe ?? e.name, preis: e.preis, auswahl: e.auswahl, quelle: null });
                          auswahlDialog.current?.showModal();
                        } else hinzufuegen({ nr: "", name: e.gruppe ? `${e.gruppe}: ${e.name}` : name, preis: e.preis }, ev.currentTarget);
                      }}
                    >
                      <IconPlus />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section id="legende" className="legende" aria-labelledby="h-legende">
          <h2 id="h-legende">Allergene und Zusatzstoffe</h2>
          <dl className="zahl">
            {Object.entries(menu.legende).map(([c, t]) => (
              <div key={c} style={{ display: "contents" }}>
                <dt>{c}</dt>
                <dd>{t}</dd>
              </div>
            ))}
          </dl>
          <p>{menu.legende_zusatz}.</p>
          <p>Alle Preise in Euro inkl. MwSt. Fragen zu Allergenen beantworten wir gern telefonisch.</p>
        </section>
      </div>

      <aside className="zettel-seite" aria-labelledby="zettel-titel-seite">
        <ZettelInhalt kopfId="zettel-titel-seite" onDurchgeben={() => vorlesenDialog.current?.showModal()} />
      </aside>

      {/* Handy: feste Leiste unten */}
      <div className="platz-unten" aria-hidden />
      <div className="unterleiste">
        <a className="btn btn-hell" href={telHref(tel.e164)}>
          <IconTelefon className="w-5 h-5" /> Anrufen
        </a>
        <button
          type="button"
          className="btn btn-tusche"
          data-zettel-ziel
          aria-haspopup="dialog"
          onClick={() => zettelDialog.current?.showModal()}
        >
          {anzahl > 0 ? (<>Zettel <span className="zahl">· {anzahl} · {euro(summe)}</span></>) : "Bestellzettel"}
        </button>
      </div>

      {/* Dialog: alle Kategorien */}
      <dialog ref={katDialog} className="blatt" aria-labelledby="kat-dialog-titel">
        <div className="blatt-inhalt">
          <div className="blatt-kopf">
            <h2 id="kat-dialog-titel">Kategorien</h2>
            <form method="dialog"><button className="schliessen" aria-label="Schließen"><IconX /></button></form>
          </div>
          <ol className="kat-liste">{navListe}</ol>
        </div>
      </dialog>

      {/* Dialog: Auswahl (z. B. Soße) */}
      <dialog ref={auswahlDialog} className="blatt" aria-labelledby="auswahl-titel" onClose={() => setAuswahlZiel(null)}>
        <div className="blatt-inhalt">
          <div className="blatt-kopf">
            <h2 id="auswahl-titel">
              {auswahlZiel?.nr ? <span className="zahl" style={{ color: "var(--color-wokgruen)" }}>{auswahlZiel.nr} </span> : null}
              {auswahlZiel?.name}
            </h2>
            <form method="dialog"><button className="schliessen" aria-label="Abbrechen"><IconX /></button></form>
          </div>
          <p style={{ margin: 0 }}>{auswahlZiel?.auswahl.titel}:</p>
          <div className="auswahl-liste">
            {auswahlZiel?.auswahl.optionen.map((o) => (
              <button
                key={o}
                type="button"
                className="btn btn-hell"
                onClick={() => {
                  const z = auswahlZiel!;
                  auswahlDialog.current?.close();
                  hinzufuegen({ nr: z.nr, name: z.name, preis: z.preis, auswahl: o }, z.quelle);
                }}
              >
                <span>{o}</span>
                <span className="zahl">{euro(auswahlZiel!.preis)}</span>
              </button>
            ))}
          </div>
        </div>
      </dialog>

      {/* Dialog: Zettel auf dem Handy */}
      <dialog ref={zettelDialog} className="blatt" aria-labelledby="zettel-titel-blatt">
        <div className="blatt-inhalt" style={{ padding: 0 }}>
          <form method="dialog" style={{ position: "absolute", right: 12, top: 12, zIndex: 1 }}>
            <button className="schliessen" aria-label="Zettel schließen"><IconX /></button>
          </form>
          <ZettelInhalt
            kopfId="zettel-titel-blatt"
            onDurchgeben={() => {
              zettelDialog.current?.close();
              vorlesenDialog.current?.showModal();
            }}
          />
        </div>
      </dialog>

      <Vorlesen ref={vorlesenDialog} onClose={() => {}} />
    </div>
  );
}
