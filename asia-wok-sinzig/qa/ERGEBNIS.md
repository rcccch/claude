# QA-Ergebnis – 12.11.2026

Production-Build (`pnpm build`, statischer Export) lokal ausgeliefert und mit Playwright/Chromium geprüft.

| Prüfung | Ergebnis |
|---|---|
| `pnpm build` | ohne Fehler und Warnungen |
| `tsc --noEmit` | sauber |
| Lighthouse mobil | Performance 93 · Accessibility 100 · Best Practices 100 · SEO 100 (LCP 3,1 s simuliert, CLS 0,001) |
| Lighthouse Desktop | 100 · 100 · 100 · 100 (LCP 0,7 s, CLS 0) |
| axe (WCAG 2.2 AA + Best Practice) | Start, Impressum, Datenschutz: 0 Verstöße; geöffnete Dialoge (Zettel, Vorlesen, Kategorien): 0 Verstöße |
| Tastatur | Skip-Link, alle Bedienelemente mit sichtbarem Fokus, Gericht per Enter hinzufügen, Fokus im Auswahldialog, Escape schließt |
| `aria-live` | z. B. „Nr. 34 Hühnerfleisch „Japan Art“, Erdnuss-Soße hinzugefügt. Zettel: 2 Gerichte, 15,50 €.“ |
| Bestellzettel | 2× Nr. 30 + Nr. 85 + Nr. 34 (Auswahl Süß-Sauer) = 44,00 € ✔; nach Neuladen erhalten ✔ |
| `prefers-reduced-motion` | keine fliegende Nummer, kein weiches Scrollen ✔ |
| Preise | alle 103 Preise auf der Seite = `menu.json` (0 Abweichungen); `menu.json` wurde zweimal gegen die Flyer-Fotos geprüft |
| Konsole | Startseite: 0 Fehler, 0 Warnungen. Hinweis: Headless-Chromium meldet beim *Verlassen* der Seite „preloaded but not used“ für die Schriften – tritt beim normalen Laden nicht auf. |

Screenshots: `mobil-*.png` (390×844), `desktop-*.png` (1440×900), `tastatur-skiplink.png`. Berichte: `lighthouse-*.report.html`, `axe.json`.
