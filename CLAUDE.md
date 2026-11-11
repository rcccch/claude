# Webagentur – Arbeitsregeln

> **Geltungsbereich:** Diese Regeln und der Skill `webagentur` gelten **nur**, wenn es um Webdesign oder Webentwicklung geht (Websites, Landingpages, UI/UX, Web-Animation/3D, SEO, Performance, Barrierefreiheit, Deployment). Bei allen anderen Themen (Mails, Texte, Recherche, Buchhaltung, allgemeine Fragen …) ignorierst du diese Datei: kein Briefing, kein Werkzeug-Check, keine Projektordner, keine Commits.

Jedes Kundenprojekt liegt in einem eigenen Unterordner (`./<kunde-projekt>/`) dieses Repos. Ein separates Repo bekommt ein Projekt erst, wenn es gewünscht wird. Kommunikation mit mir auf Deutsch, Code und Commits auf Englisch.

**Sitzungsstart:** Sobald es um Webdesign oder Webentwicklung geht, nutze den Skill `webagentur` selbstständig, auch ohne dass der Nutzer ihn nennt. Er prüft den Werkzeugkasten und fragt das Briefing gesammelt ab, danach geht es los. Nach jedem abgeschlossenen Schritt committen und pushen, denn Cloud-Container sind temporär.

## Arbeitsweise (immer in dieser Reihenfolge)
1. **Briefing**: Ziel, Zielgruppe, Inhalte, Tonalität, Referenzen und Must-haves klären. Offene Punkte gesammelt fragen, nicht einzeln.
2. **Art Direction / Moodboard**: Konzept in `docs/art-direction.md` festhalten: Leitidee, Typo-Paarung, Farbwelt (OKLCH-Tokens), Bildsprache, Motion-Prinzipien, 2–3 Referenzen mit Begründung. Erst nach Freigabe weiter.
3. **Design**: Design-Tokens in `globals.css` (`@theme`), Layout-Raster, Schlüsselscreens als echte Seiten. Bei Figma-Vorlage: Figma-MCP (`get_design_context`, `get_variable_defs`) als Quelle.
4. **Umsetzung**: Standard-Stack (unten), Komponenten klein und typisiert.
5. **QA**: siehe QA-Pflicht. Ohne bestandene QA gilt nichts als fertig.
6. **Deployment**: Vercel-Preview → Abnahme → Production. Secrets nur in `.env.local` bzw. Vercel-Env, nie in Git.

## Standard-Stack
| Bereich | Wahl |
|---|---|
| Framework | Next.js (App Router, aktuelle stabile Version) + React + TypeScript strict |
| Styling | Tailwind CSS v4 (CSS-first, Tokens in `@theme`) |
| UI-Komponenten | shadcn/ui (als Quellcode, immer an das Branding angepasst), Icons: lucide-react |
| Animation | GSAP inkl. ScrollTrigger und SplitText (komplett kostenlos), `@gsap/react` (`useGSAP`) |
| Smooth Scroll | Lenis, an den GSAP-Ticker gekoppelt |
| 3D / WebGL | three + @react-three/fiber + @react-three/drei, eigene GLSL-Shader; lazy laden |
| Fonts | `next/font` (selbst gehostet, kein Google-CDN, DSGVO) |
| Bilder | `next/image`, AVIF/WebP, feste Seitenverhältnisse |
| Hosting | Vercel |
| Paketmanager | pnpm |

Abweichungen nur mit Begründung im Projekt-README. Kein zweites Animations-Framework (kein Motion/Framer Motion), keine zweite Komponentenbibliothek.

## Welches Werkzeug wofür
- **frontend-design** (Plugin): bei jeder neuen Seite/Komponente für die ästhetische Richtung.
- **shadcn** (Skill): Komponenten hinzufügen, theming, Registry.
- **gsap-skills** (Plugin): jede Animation, ScrollTrigger, React-Integration.
- **Context7** (MCP): aktuelle Doku zu Next.js, Tailwind, R3F, drei, Lenis usw. abfragen, bevor APIs aus dem Gedächtnis genutzt werden.
- **modern-web-guidance** (Plugin, Chrome/MDN): native Plattform-Features (View Transitions, `:has()`, Container Queries, Popover) vor JS-Lösungen.
- **vercel-react-best-practices** (Skill): beim Schreiben und Refactoring von React-/Next-Code.
- **web-design-guidelines** (Skill): UX-/A11y-Review vor jeder Abnahme.
- **Figma** (MCP): nur wenn eine Figma-Vorlage existiert.
- **Playwright** (MCP): Browser öffnen, klicken, Screenshots, Konsole.
- **Lighthouse** und **axe** (CLI): Performance-, SEO- und Barrierefreiheits-Messung.
- **TypeScript-LSP** (Plugin): Typfehler und Navigation.
- **commit-commands** (Plugin) + `gh` CLI: Commits, PRs. **vercel** CLI: Deployment.

## Qualitätsstandards
- Voll responsive ab 360 px bis 2560 px, Touch und Tastatur bedienbar.
- Lighthouse ≥ 90 in Performance, Accessibility, Best Practices, SEO (mobil gemessen, Production-Build).
- WCAG 2.2 AA: Kontrast ≥ 4.5:1 (Text) bzw. 3:1 (groß/UI), sichtbarer Fokus, semantisches HTML, Alt-Texte, Skip-Link, `prefers-reduced-motion` respektieren (Animationen reduziert, Lenis aus).
- Keine generischen KI-Templates: kein Standard-Lila-Verlauf, kein Inter/Roboto als einzige Schrift, keine austauschbaren Hero-Karten-Raster. Jede Seite bekommt eine eigenständige Typografie (Display + Text, bewusst gepaart) und eine eigene Farbwelt.
- SEO: Metadata-API, Open Graph, `sitemap.ts`, `robots.ts`, strukturierte Daten wo sinnvoll, ein `h1` pro Seite.
- Performance: 3D und schwere Bibliotheken per `dynamic()`/lazy, keine Layout-Shifts, Bilder mit Größenangaben.
- Rechtliches (DE): Impressum, Datenschutzerklärung, keine externen Requests (Fonts, Tracking) ohne Einwilligung.

## QA-Pflicht (vor jeder Übergabe)
1. `pnpm build` ohne Fehler und Warnungen, `tsc --noEmit` sauber.
2. Production-Build lokal starten, mit Playwright öffnen.
3. Screenshots Desktop (1440×900) und Mobil (390×844) ansehen und kritisch bewerten: Typo, Abstände, Überläufe, Kontraste.
4. Browser-Konsole: 0 Fehler, 0 Warnungen.
5. `lighthouse <url> --preset=desktop` und mobil; `axe <url>` → 0 Verstöße.
6. Tastatur-Durchlauf (Tab-Reihenfolge, Fokus sichtbar) und `prefers-reduced-motion` prüfen.
7. Screenshots und Werte im Projekt unter `qa/` ablegen.
