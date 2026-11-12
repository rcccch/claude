# Logo – Herkunft und Dateien
\nFertige Logo-Dateien: `public/logo/` (logo.svg, logo.png, logo-dunkel.*, Favicon, App-Icons). Zwischenschritte: `_varianten/` in diesem Ordner.

**Quelle:** `flyer/04_titelseite_logo-quer.jpg` (schärfste, größte und geradeste Abbildung, ohne Glanzlicht). Keine Originaldatei vorhanden. Falls es eine gibt (PDF/AI/EPS von der Druckerei), hat sie Vorrang.

## Dateien
| Datei | Zweck |
|---|---|
| `logo.svg` | **Hauptlogo**, Vektor, farbkorrigiert, 10 Farben |
| `logo.png` | dasselbe als transparentes PNG, 3000 px breit |
| `logo-dunkel.svg` / `.png` | für dunkle Hintergründe (helleres Grün, dunkler Schatten) |
| `favicon.svg`, `favicon.ico` (16/32/48) | nur Wok + Flammen (Schrift wäre unlesbar) |
| `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` | App-Icons (Apple mit cremefarbenem Grund) |

## Arbeitsschritte
1. Foto 90° gedreht, zugeschnitten (`logo-arbeit/_varianten/00`, `01`). Verzerrung so gering, dass keine Entzerrung nötig war.
2. Freistellen mit `rembg` → `birefnet-general` deutlich besser als `isnet-general-use` (das verlor den Schriftzug). Weißer Leuchtschein hinter dem Wok bewusst entfernt, Dampf vollständig erhalten.
3. Real-ESRGAN x4plus (ONNX, CPU) auf Bild und Alphakanal → 3146 × 2805 px; gelbe Farbsäume per Hintergrund-Entmischung entfernt (`05`).
4. Farben per k-Means auf 10 reduziert, `vtracer` (Farbmodus, Splines) → `07`, auf Palette eingerastet → `08_logo_foto-farben.svg`.
5. Farbkorrektur: Foto 4 hat warmes Licht (Papiergelb im Foto `#c69500`). Kanalverstärkung ≈ 1,22 und Grün auf `#5b7a2e` gesetzt (Mittel aus Foto 1 und 4). → `08_logo_farbkorrigiert.svg` = `logo.svg`.
6. Alternative mit weichen Verläufen: `logo-arbeit/_varianten/10_raster_esrgan_farbkorrigiert.png` (Wok ohne Farbabstufungen, Schrift etwas weicher).

Skripte: `../tools/` (upscale.py, compose.py, vec.py, snap.py, export.js).

## Palette (farbkorrigiert)
Grün `#5b7a2e` · Schatten `#3b2a14` · Wokrand `#924918` · Orange `#df5209` `#e77811` `#ee9d41` · Gelb `#eaa206` · Dampf `#f4b869` `#fbd49a` · Braun `#bb8549`

## Offen
- Echtes Logo-Grün unbekannt (Foto 1: `#374d2c`, Foto 4: `#585b1b`, korrigiert `#5b7a2e`). Bitte Druckdaten oder Pantone-Angabe der Druckerei.
- Kleine gelbe Lichtkanten zwischen Schrift und Schatten (z. B. im „o“) stammen aus dem Original-Logo und sind erhalten.
