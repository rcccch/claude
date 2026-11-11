# Setup-Bericht Webagentur – 11.11.2026

> **Wichtig vorab:** Diese Sitzung lief nicht auf deinem Rechner, sondern in einem **temporären Cloud-Container** von Claude Code (claude.ai/code). Alles unten ist dort installiert und getestet. Der Container wird aber nach einer Weile gelöscht. Damit der Werkzeugkasten dauerhaft bei dir läuft, gibt es `setup-agentur.sh`: Es installiert das identische Set mit einem Befehl (siehe Punkt 2.1).

Getestet mit Claude Code 2.1.322, Node 22, Linux.

**Standard-Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · shadcn/ui (Base UI) · GSAP 3.15 inkl. ScrollTrigger/SplitText · Lenis · three + React Three Fiber + drei · next/font · Vercel · pnpm

---

## 1. Installiert und getestet

| Name | Typ | Wofür | Quelle | Status |
|---|---|---|---|---|
| frontend-design | Plugin (Skill) | Eigenständige Art Direction, Typo, Layout gegen KI-Einheitslook | Anthropic, offizieller Marketplace | ✅ geladen, in der Demo genutzt |
| gsap-skills (8 Skills) | Plugin | GSAP Core, Timeline, ScrollTrigger, Plugins, React, Performance | GreenSock (offiziell), Marketplace `greensock/gsap-skills` | ✅ geladen, in der Demo genutzt (SplitText-A11y-Fix kam daher) |
| shadcn | Skill | Komponenten hinzufügen, Theming, Registry | shadcn (offiziell), `skills add shadcn/ui` | ✅ geladen (nur modellseitig, kein Slash-Befehl) |
| vercel-react-best-practices | Skill | React/Next.js-Performance-Regeln beim Schreiben | Vercel Labs (offiziell) | ✅ geladen |
| web-design-guidelines | Skill | UX/A11y-Review nach Vercels Web Interface Guidelines | Vercel Labs (offiziell) | ✅ geladen |
| modern-web-guidance | Plugin (Skill) | Native Web-Plattform statt Legacy-JS (Chrome, Edge, Firefox, MDN) | Google Chrome, offizieller Marketplace | ✅ geladen |
| Playwright | Plugin (MCP) | Browser steuern, Screenshots, Konsole | Microsoft, offizieller Marketplace (bei dir schon über claude.ai synchronisiert) | ✅ verbunden, für die QA genutzt |
| Context7 | MCP + Regel + Skill (`ctx7 setup --oauth`) | Aktuelle Doku zu allen Bibliotheken | Upstash (offiziell), npm `ctx7` | ⚠️ installiert, **Login über /mcp nötig**; API anonym getestet ✅. Das Marketplace-Plugin ist deaktiviert, sonst wären die Tools doppelt da |
| Figma | Plugin (MCP + 15 Skills) | Figma-Designs auslesen, Design-to-Code, Code Connect | Figma (offiziell), offizieller Marketplace | ⚠️ installiert, **Login über /mcp nötig** |
| typescript-lsp | Plugin (LSP) | Typfehler, Go-to-Definition | Anthropic, offizieller Marketplace | ✅ Sprachserver startet (23 Features) |
| commit-commands | Plugin | `/commit`, `/commit-push-pr` | Anthropic, offizieller Marketplace | ✅ geladen |
| typescript-language-server 6.0.3 + typescript 5.9.3 | CLI | Unterbau für den LSP (TS 7 hat kein `tsserver` mehr → bewusst 5.9) | npm | ✅ |
| Lighthouse 13.6 | CLI | Performance, SEO, Best Practices, A11y | Google, npm | ✅ in der QA genutzt |
| axe-core CLI 4.14 | CLI | WCAG-2.2-AA-Prüfung | Deque, npm | ✅ in der QA genutzt |
| Vercel CLI 65.14 | CLI | Deployment, Previews, Env-Variablen | Vercel, npm | ✅ installiert, Login fehlt |
| gh 2.89, pnpm 10.28, git | CLI | GitHub, Pakete | waren vorhanden | ✅ |
| `setup-agentur.sh` | Skript | Installiert alles oben auf deinem Rechner | hier erstellt | ✅ Syntax geprüft, Einzelschritte hier getestet |
| `CLAUDE.md` | Agentur-Regeln | Prozess, Stack, Tool-Zuordnung, Qualitäts- und QA-Pflicht | hier erstellt | ✅ wird geladen |

**Demo** (`demo/`, fiktive Glasbläserei „Studio Fluss“). Inhalt: GSAP-SplitText-Hero, eigener GLSL-Shader-Glastropfen in R3F, der beim Scrollen von außen nach innen abkühlt, Lenis, gepinnte horizontale Prozess-Sektion, Scroll-gekoppelter Text und shadcn-Buttons.

| Prüfung | Ergebnis |
|---|---|
| Build, TypeScript, ESLint | ✅ ohne Fehler |
| Screenshots Desktop 1440 px + Mobil (iPhone 13) | ✅ `demo/qa/`, kein horizontaler Überlauf |
| axe (WCAG 2.2 AA) | ✅ 0 Verstöße |
| Lighthouse A11y / Best Practices / SEO | ✅ 100 / 100 / 100 (mobil + desktop) |
| Lighthouse Performance ohne WebGL (Fallback-Pfad) | ✅ 97 mobil, LCP 0,8 s, CLS 0 |
| Lighthouse Performance mit WebGL | ⚠️ 69 mobil / 70 desktop. Der Container hat **keine GPU**, deshalb wird WebGL per Software gerendert. Gegenprobe ohne WebGL: TBT fällt von 134 s auf 0,2 s. Auf echter Hardware ist das so **nicht gemessen**, siehe To-do 2.3. |
| Tastatur | ✅ Skip-Link zuerst, logische Tab-Reihenfolge, sichtbarer Fokus |
| `prefers-reduced-motion` | ✅ Animationen und Lenis aus, 3D statisch, keine Fehler |
| Konsole | 0 Fehler. 1 Warnung `THREE.Clock deprecated` kommt aus React Three Fiber 9.8 selbst (behoben erst in v10-alpha) und ist harmlos. |

Während der QA gefunden und behoben: abgeschnittener Shader, kollidierende Headline-Buchstaben, Shader-Uniforms ohne Wirkung, trübe Farbmischung, SplitText-ARIA-Fehler, Kontrast 1,46:1 im Scroll-Text, **Absturz der Seite ohne WebGL** (jetzt sauberer Fallback). Außerdem lädt WebGL erst im Leerlauf und pausiert außerhalb des sichtbaren Bereichs.

---

## 2. Dafür brauche ich deine Hilfe

### 2.1 Werkzeugkasten auf deinen Rechner holen (zuerst!)
**Warum:** Der Cloud-Container ist temporär. Gesichert ist alles bereits auf GitHub: https://github.com/rcccch/claude (✅ erledigt).
1. Auf deinem Rechner im Terminal:
   ```bash
   git clone https://github.com/rcccch/claude.git ~/webagentur
   ```
   ```bash
   cd ~/webagentur && bash setup-agentur.sh
   ```
2. Claude Code neu starten (`cd ~/webagentur && claude`), danach Punkt 4.
3. Diesen Prompt nicht noch einmal einfügen: `setup-agentur.sh` installiert das fertige, geprüfte Set in wenigen Minuten.

### 2.2 Soll das auch in Cloud-Sitzungen automatisch da sein?
Falls du weiter über claude.ai/code arbeitest: Trag in den Umgebungseinstellungen (Umgebungsmenü in der Titelleiste der Sitzung → Bearbeiten → *Setup script*) diese Zeile ein. Jede neue Cloud-Sitzung installiert das Set dann selbst:
```bash
git clone https://github.com/rcccch/claude.git ~/webagentur && bash ~/webagentur/setup-agentur.sh
```
Ist das Repo privat, musst du es in den Umgebungseinstellungen unter *Repositories* hinzufügen. Diesen Weg habe ich nicht getestet.

### 2.3 Performance mit 3D auf echter Hardware messen
**Warum:** Hier ging es nur ohne GPU (siehe oben). Nach Schritt 2.1 auf deinem Rechner:
```bash
cd ~/webagentur/demo && pnpm install && pnpm build && pnpm start
```
Dann in Chrome: DevTools → Lighthouse → Mobil → Analysieren. Oder sag mir lokal „QA für demo“.

### 2.4 Entscheidung: Plugin „small-business“
Aus deinem claude.ai-Konto wird ein Plugin „small-business“ mit **~35 Konnektoren** (Gmail, Drive, Shopify, Stripe, HubSpot …) in jede Sitzung synchronisiert. Ich habe es **nicht** installiert. Es bringt 107 Tools in jede Coding-Sitzung, kostet also Kontext und überschneidet sich teils (Canva, Wix). Wenn du es beim Webentwickeln nicht brauchst, schalte es in den claude.ai-Einstellungen unter Plugins für Claude Code aus. Ich habe es nicht angefasst, weil es zu deinem Konto gehört.

---

## 3. Hier musst du dich anmelden

| Dienst | Kosten | Link | Danach eintragen / bestätigen |
|---|---|---|---|
| GitHub | kostenlos (private Repos inklusive) | https://github.com/signup | Terminal: `gh auth login` |
| Vercel | **Hobby kostenlos, aber nur nicht-kommerziell.** Für Kundenprojekte: **Pro 20 US-$/Nutzer/Monat** inkl. 20 $ Nutzungsguthaben | https://vercel.com/signup | Terminal: `vercel login`. Pro im Dashboard unter Settings → Billing |
| Context7 | kostenlos (laut Drittquellen ca. 500–1.000 Anfragen/Monat, aktuell prüfen); Pro ca. 10–20 US-$/Monat | https://context7.com | Claude Code: neu starten, dann `/mcp` → `context7` → *Authenticate*. Optionaler API-Key (`ctx7sk-…`) aus https://context7.com/dashboard in `~/.zshrc` bzw. `~/.bashrc` als `export CONTEXT7_API_KEY="ctx7sk-…"`, **nie in ein Repo** |
| Figma | Remote-MCP geht mit jedem Plan, mit kostenlosem Konto aber nur wenige Abrufe. Sinnvoll: Professional mit **Dev-Seat ca. 12 $** oder **Full-Seat ca. 16 $/Monat** (Quellen widersprechen sich, bitte auf figma.com/pricing prüfen) | https://www.figma.com/signup | Claude Code: `/mcp` → `figma` → *Authenticate*. Nur nötig, wenn du mit Figma-Vorlagen arbeitest |

---

## 4. Sonstige To-dos für dich
1. **Claude Code neu starten** nach `setup-agentur.sh`, damit Plugins, Skills und LSP laden.
2. `/mcp` aufrufen: `context7` (eigener Server, kein Plugin) und `figma` authentifizieren. Playwright muss **verbunden** zeigen.
3. Mit `/plugin` kontrollieren: 7 Plugins aktiv (frontend-design, gsap-skills, playwright, figma, typescript-lsp, modern-web-guidance, commit-commands). Steht Playwright doppelt drin (einmal „synced“ von claude.ai), eins davon deaktivieren.
4. Optional: `npx next telemetry disable` (Next.js sendet sonst anonyme Nutzungsdaten).
5. Optional: Für `--dangerously-skip-permissions` lieber den Auto-Modus (`Shift+Tab`) nutzen. Er ist sicherer und fragt bei riskanten Aktionen nach.

---

## 5. Bewusst nicht installiert

| Kandidat | Grund |
|---|---|
| Chrome DevTools MCP (Google) | Zweite Browser-Automatisierung neben Playwright. Performance-Messung übernimmt die Lighthouse-CLI ohne Dauer-Kontextkosten. |
| Vercel-Plugin (offiziell) | Injiziert bei **jedem** Sitzungsstart ~64 KB Vercel-Kontext in alle Projekte, 55 Skills, Telemetrie standardmäßig an. Vercel CLI + react-best-practices-Skill decken das schlanker ab. Bei Bedarf pro Projekt aktivieren. |
| GitHub MCP | Braucht ein Personal Access Token und viele Tools im Kontext. `gh` + commit-commands können dasselbe. |
| Motion (Framer Motion) | Zweites Animations-Framework. GSAP ist seit der Webflow-Übernahme komplett kostenlos (inkl. SplitText, MorphSVG) und Standard bei Awwwards-Seiten. |
| shadcn MCP | Muss pro Projekt eingerichtet werden und überschneidet sich mit offiziellem Skill + CLI. |
| Superpowers (obra) | Großes eigenes Prozess-Framework, das mit dem Agentur-Prozess in CLAUDE.md konkurriert. |
| Superdesign, Canva, Adobe | Braucht eigene Konten/Canvas bzw. nicht Kern der Webentwicklung. Überschneidung mit frontend-design. |
| Community-GSAP/„Awwwards“-Skills, google-labs shadcn-Skill | Doppelt zu den offiziellen Hersteller-Skills, teils widersprüchliche Regeln. |
| Iconify-, Unsplash-, Icons8-MCP | Kleine Community-Projekte bzw. kostenpflichtig. Icons: lucide (shadcn-Standard); Bilder pro Projekt lizenzieren. |
| browser-use | Zweite Browser-Automatisierung, Cloud-Konto. |
| security-guidance, code-review (Plugins) | LLM-Prüfung bei jedem Stopp (Kosten, Latenz). `/security-review` und `/code-review` sind schon eingebaut. |
| Netlify-, Cloudflare-Skills | Hosting ist auf Vercel festgelegt. |
| migrate-radix-to-base | Kam ungefragt mit dem shadcn-Paket, nicht nötig → wieder entfernt. |

---

## 6. So nutzt du die Agentur ab jetzt
Starte Claude Code in `~/webagentur`. Jedes Projekt bekommt einen Unterordner.

1. **Neues Projekt:** „Neues Projekt `baeckerei-kurz`: Website für eine Bio-Bäckerei in Leipzig, Zielgruppe Familien, Ton warm und handwerklich. Starte mit Briefing-Fragen, dann Art Direction zur Freigabe.“
2. **Aus Figma:** „Setze diesen Figma-Frame als Startseite in `kanzlei-weber` um: <Figma-Link>. Übernimm die Variablen als Tailwind-Tokens.“
3. **Motion-Highlight:** „Bau in `atelier-lux` einen Hero mit WebGL-Shader und einer Scroll-Sequenz, in der das Produkt sich aufbaut. Halte Lighthouse mobil über 90.“
4. **QA-Runde:** „Mach die komplette QA-Pflicht für `baeckerei-kurz` und lege Screenshots und Werte in `qa/` ab.“
5. **Livegang:** „Deploy `baeckerei-kurz` als Vercel-Preview und gib mir den Link zur Abnahme.“
