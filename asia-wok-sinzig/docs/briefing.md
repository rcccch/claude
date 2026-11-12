# Briefing – Asia Wok Sinzig

**Status:** Phase 3 abgeschlossen (Daten, Logo, Recherche, Designkonzept) – wartet auf Freigabe, danach Phase 4 Umsetzung.

## Kunde
- Asia Wok, „Asiatische Spezialitäten“, Markt 4, 53489 Sinzig
- Tel. 02642 / 99 27 97, Tel./Fax 02642 / 99 24 57
- Mo–Fr 11:30–15:00 und 17:00–21:30, So u. Feiertage 13:00–21:00, Samstag Ruhetag
- Flyer „Gültig ab 1.8.2026“, Fotos in `../flyer/`

## Ziel
Gäste (überwiegend mobil) finden schnell Speisekarte, Öffnungszeiten, Kontakt und rufen an, um zu bestellen/abzuholen. Haupthandlung: **anrufen**.

## Umfang
One-Pager (Hero, Speisekarte mit Suche/Filter, Öffnungszeiten mit Live-Status, Lieferung & Abholung, Kontakt & Anfahrt) + Impressum + Datenschutz (Platzhalter). Interaktiver Bestellzettel (Merkzettel, keine Online-Bestellung) mit localStorage, Telefon-Ansicht, Kopieren, Drucken, ggf. WhatsApp.

## Marke
Logo vom Flyer (grüner Schriftzug „Asia Wok“ + dampfender Wok) bleibt, wird freigestellt + vektorisiert. Grün = Hausfarbe. Keine Klischees (kein Rot-Gold, keine Drachen, keine Pseudo-Asia-Schriften außer im Logo).

## Inhalte
Alle Daten aus dem Flyer → `src/data/restaurant.json`, `src/data/menu.json`. Nichts erfinden: keine Geschichte, keine Fake-Bewertungen, keine KI-Food-Fotos. Plätze für echte Fotos kennzeichnen. Bilder aus dem Web nur nach Rechteklärung.

## Technik (Abweichung vom Agentur-Standard)
Statisch exportierbar für beliebigen Webspace (kein Vercel-Zwang): Next.js mit `output: 'export'` oder Astro – Entscheidung mit Begründung im Projekt-README. Inhalte aus JSON, Fonts selbst gehostet, keine Tracker, Karte nur als Link/Zwei-Klick.

## Referenzen (laut Kunde)
Hakkasan, Yauatcha, BAO London, Momofuku, Din Tai Fung, Nobu + eigene Recherche → `RECHERCHE.md`, Konzept → `DESIGN.md`.
