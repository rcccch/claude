# Designkonzept – Asia Wok Sinzig

Grundlage: `RECHERCHE.md` (8 Restaurant-Websites), Logo (`public/logo/`), Flyer, Fassade am Markt 4.

## Leitidee: „Die Nummer, bitte.“

Beim Asia Wok bestellt man am Telefon mit Nummern: „Einmal die 31 und zweimal die 85.“ Der gelbe Flyer liegt in vielen Sinziger Küchenschubladen genau dafür. Die Website setzt diesen Flyer neu, mit derselben Logik, aber gut lesbar, durchsuchbar und mit einem Merkzettel, der die Bestellung so vorbereitet, wie man sie am Telefon vorliest.

**Das eine auffällige Element sind die Gerichtnummern.** Sie stehen groß in einer eigenen Spalte, in Wokgrün und mit Tabellenziffern. Alles andere bleibt ruhig. Die Nummer taucht überall wieder auf: in der Suche („31“ findet Nr. 31), auf dem Bestellzettel und in der Vorlese-Ansicht.

Die Stimmung ist ein freundlicher, heller Imbiss am Marktplatz, kein Sternelokal. Die Farben kommen aus dem Logo und vom Haus: gelbe Fassade, grüne Schilder, graue Fensterrahmen.

## Farben (Tokens)

| Token | Hex | OKLCH | Einsatz |
|---|---|---|---|
| `--weiss` | `#ffffff` | `oklch(100% 0 0)` | Grundfläche der Speisekarte (bewusst kein Creme-Ton) |
| `--tusche` | `#1f2a17` | `oklch(26.9% 0.037 132.9)` | Text, sehr dunkles Grün statt Schwarz |
| `--wokgruen` | `#476420` | `oklch(46.5% 0.101 129.4)` | Hausfarbe: Nummern, Buttons, aktive Kategorie, Fokus |
| `--fassade` | `#f3c841` | `oklch(84.8% 0.153 90.5)` | Fassadengelb: Kopfbereich, Leiste unten, Fuß – nur große Flächen |
| `--neu` | `#fff3c4` | `oklch(96.2% 0.062 95.4)` | Hintergrund der Rubrik „Neuheiten“ und des Bestellzettels |
| `--rahmen` | `#5c6369` | `oklch(49.6% 0.013 243.8)` | Zutaten, Nebeninfos (Grau der Fensterrahmen) |
| `--chili` | `#b8400e` | `oklch(53.6% 0.164 39)` | nur für die Kennzeichnung „scharf“ |
| `--linie` | `#dfe3d6` | `oklch(90.9% 0.018 120.7)` | Trennlinien zwischen Gerichten |

**Kontraste (WCAG):**
- Tusche auf Weiß: 15:1
- Wokgrün auf Weiß: 6,8:1, Weiß auf Wokgrün ebenfalls 6,8:1
- Rahmen-Grau auf Weiß: 6,1:1
- Chili auf Weiß: 5,6:1
- Tusche auf Fassadengelb: 9,4:1
- Wokgrün auf Fassadengelb: 4,2:1. Diese Kombination nur für große Schrift ab 24 px oder für Icons.

Für dunkle Flächen (Fuß, optional) gibt es `logo-dunkel.svg`.

## Schrift

| Rolle | Schrift | Warum |
|---|---|---|
| Display, Nummern, Preise, Kategorien | **Barlow Semi Condensed** (500/600/700) | Schmale Grotesk mit Beschilderungs-Charakter wie das „WOK“-Schild an der Fassade. Starke Tabellenziffern, die Nummer und Preis tragen. Nichts Pseudo-Asiatisches. |
| Gerichte, Zutaten, Fließtext | **Atkinson Hyperlegible Next** (400/700) | Für maximale Lesbarkeit entwickelt: 1/l/I und 0/O sind klar unterscheidbar. Das passt zu einem Publikum, das oft älter ist und am Telefon Nummern und Zutaten vorliest. |

Beide Schriften liegen selbst gehostet im Projekt (`@fontsource`, `next/font/local`), es gibt keine Anfrage an Google.

**Größen (mobil → Desktop):**
- Kategorie: 30 → 40 px, Barlow 700
- Nummer: 28 → 32 px, Barlow 600, Wokgrün, tabellarisch
- Gerichtname: 18 px, Atkinson 700
- Zutaten: 16 px, Atkinson 400, Rahmen-Grau, Zeilenhöhe 1,45
- Preis: 20 px, Barlow 600, tabellarisch, rechtsbündig, Format „12,50 €“

Keine Versalien, keine dünnen Schnitte, Satzanfänge groß und alles andere normal (sentence case).

## Raster und Layout

Mobil zuerst (390 px), einspaltig, 16 px Seitenrand. Die Gerichtzeile ist ein festes Mini-Raster:

```
┌────┬──────────────────────────────┬─────────┐
│ 31 │ Hühnerfleisch „Szechuan Art“ │ 10,50 € │
│    │ mit frischem Wok-Gemüse und   │   [ + ] │
│    │ Knoblauch · scharf ¹·¹⁰·⁶     │         │
└────┴──────────────────────────────┴─────────┘
 3,5ch          flexibel                 auto
```

**Mobil (390 px):**
```
┌──────────────────────────────┐
│ ▓▓▓ fassadengelb ▓▓▓▓▓▓▓▓▓▓▓ │  Kopf: Logo (zentriert), „Asiatische Spezialitäten“
│      [Logo Asia Wok]         │  Status: ● Jetzt geöffnet · bis 21:30
│  ● Jetzt geöffnet bis 21:30  │  [ Speisekarte ]  [ 02642 99 27 97 anrufen ]
│ [Speisekarte] [Anrufen]      │  „Nur Abholung · nach ca. 10–15 Min. fertig · nur Barzahlung“
├──────────────────────────────┤
│ Neuheiten ▾  🔍  [veg][scharf]│  sticky: aktuelle Kategorie (tippen → Liste), Suche, Filter
├──────────────────────────────┤
│ Neuheiten  (gelber Grund)    │
│ 40  Gebackene Garnelen … 11,00│
│ …                            │
│ Vorspeisen                   │
│ 1   Pekingsuppe …       4,00 │
├──────────────────────────────┤
│ ▓ [📞 Anrufen] [Zettel 3 · 32,50 €] ▓ │  feste Leiste unten (fassadengelb)
└──────────────────────────────┘
```

**Desktop (1440 px):** drei Spalten, Inhalt maximal 1280 px breit.
```
┌──────────┬──────────────────────────────┬────────────────┐
│ Kategorien│  Kopf (Logo, Status, Anrufen)│                │
│ sticky,   ├──────────────────────────────┤  Bestellzettel │
│ Scrollspy │  Suche + Filter (sticky)     │  sticky,       │
│ Vorspeisen│  Speisekarte                 │  Positionen,   │
│ Salate    │  (max. 72 Zeichen Zeilenlänge│  Summe,        │
│ …         │   für Zutaten)               │  „Bestellung   │
│           │                              │   durchgeben“  │
└──────────┴──────────────────────────────┴────────────────┘
```

**Ausrichtung:**
- Linksbündig: alle Texte.
- Rechtsbündig: Preise.
- Zentriert: nur Logo und Status im Kopf.
- Unter der Karte folgen „Öffnungszeiten“ (mit Live-Status und hervorgehobenem heutigem Tag), „Abholung“, „Anfahrt & Kontakt“ und der Fuß mit Impressum und Datenschutz.

**Ohne Fotos:** Die Karte trägt sich typografisch. Das ist laut Recherche bei Hakkasan, Nobu und Momofuku Standard. Einziges Bildmotiv sind die Dampflinien aus dem Logo, als feines Linienmotiv im Kopf und als Trenner zwischen Kopf und Karte. Für spätere echte Fotos ist ein Platz unter „Anfahrt“ vorgesehen (Fassade, Terrasse am Marktbrunnen) und als `<!-- FOTO -->` markiert. Bis echte Fotos da sind, steht dort eine Karte mit Adresse und keine Attrappe.

## Speisekarte – Verhalten

- **Kategorien-Navigation:** Mobil zeigt eine sticky Leiste die aktuelle Kategorie. Antippen öffnet die vollständige Liste als natives `<dialog>`. Desktop: sticky Seitenleiste mit Scrollspy (IntersectionObserver).
- **Suche:** nach Nummer, Name oder Zutat, unscharf (ohne Umlaut-Probleme, „huhn“ findet „Hühner“). Ohne Treffer kommt der Hinweis: „Kein Gericht gefunden. Rufen Sie uns an, wir helfen gern: 02642 99 27 97“.
- **Filter:** nur „vegetarisch“ und „scharf“, weil der Flyer nur diese Kennzeichnungen kennt (vegetarisch nach der Regel des Inhabers). Die Vorschläge der Recherche („vegan“, „ohne Erdnuss“) übernehmen wir nicht, weil die Daten dafür fehlen.
- **Allergene:** Wir behalten die Ziffern 1–15 vom Flyer. Die LMIV-Buchstaben A–N aus der Recherche übernehmen wir nicht, damit Flyer und Website übereinstimmen. Die Codes stehen klein hinter den Zutaten, als Button mit Tooltip bzw. Popover („6 Soja, 10 Geschmacksverstärker“). Die Legende ist über die sticky Leiste und am Kartenende erreichbar.
- **Kennzeichnungen:** „scharf“ und „leicht scharf“ als Text mit einer kleinen Chili-Markierung (Chili-Rot), „vegetarisch“ als Text mit einem Blatt in Wokgrün. Nie nur ein Icon.
- **Gerichte mit Auswahl** (Nr. 34, 40, 99): Ein Tipp auf „+“ öffnet einen kleinen Dialog („Erdnuss-Soße / Süß-Sauer-Soße“).
- **Extras** (Beilage statt Reis +2,00 €, Extra-Soße): Sie werden auf dem Zettel einem Gericht zugeordnet oder als eigene Position angelegt.

## Bestellzettel

- **Aussehen:** wie ein Bestellblock, auf gelbem Grund (`--neu`) mit Wokgrün-Nummern. Deutlich als „Merkzettel – keine Online-Bestellung“ gekennzeichnet.
- **Positionen:** Nummer, Name, Auswahl, Menge (− / +), Notiz („ohne Koriander“), entfernen.
- **Summe:** läuft mit, mit dem Hinweis „Zahlung bei Abholung, nur bar“.
- **Speicherung:** im Browser (localStorage), bleibt beim Neuladen erhalten.
- **Abschluss „Bestellung telefonisch durchgeben“:**
  - Große Vorlese-Liste („2 × Nr. 85 Nudel-Teller“), Summe und Abholhinweis.
  - Buttons „Jetzt anrufen“, „Kopieren“ und „Drucken“ (eigenes Druck-Stylesheet).
  - Kein WhatsApp, weil es keine WhatsApp-Nummer gibt.
- **Barrierefreiheit:** per Tastatur bedienbar, Änderungen werden per `aria-live` angesagt („Nr. 31 hinzugefügt, 3 Positionen, 32,50 €“).

## Bewegung

Es gibt **einen** inszenierten Moment: Beim Hinzufügen löst sich die Nummer vom Gericht und fliegt in die Leiste bzw. Seitenleiste, die Summe zählt hoch. Das sind etwa 400 ms mit GSAP. Ansonsten gibt es nur Rückmeldungen auf Aktionen (Dialog öffnen, Menge ändern). Keine Einblend-Animationen beim Scrollen, kein Smooth-Scroll-Paket. Bei `prefers-reduced-motion` entfällt der Flug, nur die Summe wechselt.

## Abgleich mit Standard-Lösungen (selbstkritisch)

| Erster Entwurf | Warum generisch | Geändert zu |
|---|---|---|
| Cremefarbener Papiergrund (Recherche-Empfehlung „warmer Papiergrund“) | heute der häufigste Standard-Look | reines Weiß für die Karte. Wärme kommt nur über das Fassadengelb in großen Flächen. |
| Display-Serife für Kategorien | Serifen-Hero mit Creme ist der Standard-„Restaurant“-Look | schmale Beschilderungs-Grotesk (Barlow), abgeleitet vom Fassadenschild |
| Nummern als Kreis-Badges (01 / 02) | Nummern-Badges als Deko | Die Nummern sind echte Bestellnummern, als große Ziffern ohne Rahmen. Die Spalte ist Funktion, keine Dekoration. |
| Kategorien als Karten mit Schatten | Karten-Baukasten | Durchgehende Liste mit Haarlinien; nur „Neuheiten“ bekommt eine Fläche |
| Überschriften mit Versalien-Etikett darüber | typisches Template-Merkmal | keine Etiketten; die Kategorie selbst ist die Überschrift |

## Technik (Abweichung vom Agentur-Standard, begründet)

- **Next.js mit statischem Export** (`output: 'export'`), TypeScript, Tailwind v4 und shadcn/ui als Basis für Dialoge. Ergebnis ist reines HTML/CSS/JS, das auf jeden normalen Webspace passt. Vercel ist nicht nötig, steht aber als Vorschau zur Verfügung.
- **Kein Lenis, kein 3D:** Sticky-Navigation und Sprünge zu Kategorien müssen exakt und schnell sein. Weiches Scrollen würde das stören und Gewicht kosten.
- **GSAP** nur für den einen Moment beim Hinzufügen, nachgeladen.
- **Daten:** alles aus `src/data/menu.json` und `restaurant.json`.
- **Datenschutz und Karte:** Die Karte erscheint nur als Link zu OpenStreetMap und Google Maps. Keine Tracker, keine externen Schriften.
