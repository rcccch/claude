# Asia Wok Sinzig – Website

Diese Website besteht nur aus fertigen Dateien (HTML, CSS, JavaScript), ohne Backend. Sie läuft auf jedem normalen Webspace. Alle Inhalte kommen aus drei JSON-Dateien.

## Gerichte und Preise ändern

Alle Speisen stehen in **`src/data/menu.json`**. Jedes Gericht sieht so aus:

```json
{
  "nr": "31",
  "name": "Hühnerfleisch „Szechuan Art“",
  "beschreibung": "mit frischem Wok-Gemüse und Knoblauch (scharf)",
  "preis": 10.5,
  "allergene": ["1", "10", "6"],
  "scharf": "scharf",
  "vegetarisch": false
}
```

| Feld | Bedeutung |
|---|---|
| `preis` | Zahl mit **Punkt** (`10.5` = 10,50 €). Die Seite zeigt automatisch „10,50 €“ an. |
| `scharf` | `"scharf"`, `"leicht"` oder `null` |
| `vegetarisch` | `true` oder `false` (vegetarisch heißt: kein Fleisch oder Fisch in Name und Zutaten) |
| `allergene` | Ziffern laut Legende (`"legende"` oben in derselben Datei) |
| `auswahl` | optional; der Gast muss dann zwischen Varianten wählen, z. B. `{"titel": "Bitte wählen", "optionen": ["Erdnuss-Soße", "Süß-Sauer-Soße"]}` |
| `allergene_unsicher` / `unsicher` | vorläufige Angabe; entfernen, sobald sie geprüft ist |
| `flyer_original` | Text vor der Korrektur von Tippfehlern, nur zur Nachverfolgung |

- **Gericht hinzufügen:** einen Eintrag in der passenden Kategorie (`kategorien[…].gerichte`) ergänzen. Die Reihenfolge in der Datei ist auch die Reihenfolge auf der Seite.
- **Neuheiten:** Die Kategorie mit `"id": "neuheiten"` steht ganz oben und ist gelb hinterlegt.
- **Extras** (Reis, Soßen): unter `extras.posten`.

Weitere Dateien:

- **Restaurantdaten** (Telefon, Öffnungszeiten, Abholung, Zahlung): `src/data/restaurant.json`. Die Öffnungszeiten stehen dort zweimal: unter `tage` für den Live-Status „Jetzt geöffnet“, unter `anzeige` für die Tabelle. Bei Änderungen bitte beide anpassen.
- **Fotos:** `src/data/highlights.json` legt fest, welches Foto zu welcher Gerichtnummer gehört. Die Bilder liegen in `public/img/highlights/`, jeweils als `name-800.webp` und `name-1400.webp`.
- **Logo:** `public/logo/`, siehe `logo-arbeit/LOGO.md`.

## Bauen

Voraussetzungen: Node.js ab Version 22 und pnpm.

```bash
pnpm install
```

```bash
pnpm build
```

Danach liegt die fertige Website im Ordner **`out/`**.

Die Adresse der Website ist für Suchmaschinen und Vorschaubilder wichtig. Sie wird beim Bauen gesetzt:

```bash
SITE_URL=https://www.beispiel.de pnpm build
```

Liegt die Seite in einem **Unterordner**, wie aktuell `https://reichkraft.de/asi/`:

```bash
SITE_URL=https://reichkraft.de/asi BASE_PATH=/asi pnpm build
```

Dafür gibt es zwei Kurzbefehle:

- `pnpm build:live` baut die Seite für `reichkraft.de/asi`.
- `pnpm zip` macht dasselbe und legt zusätzlich die fertige Datei `upload/asia-wok-website-asi.zip` an.

Vor dem Hochladen lokal ansehen: `pnpm start` und dann http://localhost:3000 im Browser öffnen.

## Hochladen

**Mit der ZIP-Datei:** `asia-wok-website-asi.zip` enthält den fertigen Ordner `asi/`. Diesen Ordner in das Hauptverzeichnis von reichkraft.de entpacken bzw. hochladen. Danach muss `https://reichkraft.de/asi/index.html` existieren.

**Ohne ZIP:** 
Den **Inhalt** des Ordners `out/` per FTP/SFTP in das Webverzeichnis des Webspace kopieren, also in den Zielordner bzw. Unterordner. Weitere Einstellungen am Server sind nicht nötig. Hinweis: `robots.txt` und `sitemap.xml` liegen im Unterordner. Suchmaschinen lesen eine `robots.txt` aber nur im Hauptverzeichnis der Domain; die Sitemap kann man stattdessen in der Google Search Console einreichen, weil jede Seite als eigener Ordner mit `index.html` angelegt ist (`/impressum/`, `/datenschutz/`).

## Impressum und Datenschutz

Platzhalter in `src/app/impressum/page.tsx` und `src/app/datenschutz/page.tsx` durch die gelieferten Texte ersetzen, dann neu bauen.

## Technik (Abweichung vom Agentur-Standard)

- **Statischer Export statt Vercel:** Next.js mit `output: "export"` und `trailingSlash`, weil die Seite auf normalen Webspace soll.
- **Keine shadcn-Komponenten:** Die Seite nutzt native `<dialog>`- und `popover`-Elemente. Das spart JavaScript und ist von Haus aus barrierefrei.
- **Kein Lenis, kein 3D:** Die Sprünge zu den Kategorien und die mitlaufende Leiste müssen exakt und schnell sein.
- **GSAP:** nur für einen einzigen Moment, die fliegende Nummer beim Hinzufügen. Es wird erst dann nachgeladen.
- **Schriften:** selbst gehostet unter `src/app/fonts/` (SIL Open Font License).
- **Datenschutz:** keine Cookies, keine Tracker, keine externen Anfragen. Die Karte ist nur ein Link zu OpenStreetMap bzw. Google Maps. Der Bestellzettel wird nur im Browser gespeichert (`localStorage`).

## Qualitätssicherung

Ergebnisse stehen in `qa/` (siehe `qa/ERGEBNIS.md`). Die Prüf-Skripte liegen in `tools/`. Dafür muss die Seite lokal laufen (`pnpm start`):

| Skript | Prüft |
|---|---|
| `node tools/qa-screens.js http://localhost:3000/` | Screenshots und Bestellzettel |
| `node tools/qa-tastatur.js` | Tastaturbedienung und Barrierefreiheit in den Dialogen |
| `node tools/qa-preise.js` | jeden Preis auf der Seite gegen `menu.json` |
