---
name: webagentur
description: Webagentur-Arbeitsweise für alles rund um Webdesign und Webentwicklung. IMMER selbstständig verwenden, sobald es um eine Website, Landingpage, Webshop, Webdesign, Redesign, UI/UX, Branding fürs Web, Animationen, 3D im Web, SEO, Performance, Barrierefreiheit oder Deployment einer Seite geht – auch ohne dass der Nutzer „Webagentur“ sagt. Prüft den Werkzeugkasten, fragt bei neuen Projekten das Briefing ab, legt den Projektordner an und arbeitet dann nach CLAUDE.md.
---

# Webagentur – Projektstart

Arbeite nach der `CLAUDE.md` im Repo-Root. Sprich Deutsch.

## 1. Werkzeugkasten prüfen (still, ohne den Nutzer zu fragen)
Prüfe kurz, ob die Skills `shadcn`, `web-design-guidelines` und `vercel-react-best-practices` unter `~/.claude/skills/` liegen und `lighthouse`, `axe` und `vercel` im PATH sind.
Fehlt etwas: Führe `bash setup-agentur.sh` im Repo-Root aus (dauert ein paar Minuten) und sag in einem Satz, dass der Werkzeugkasten installiert wurde.
Fehlende Logins (Context7, Figma, Vercel) blockieren den Start nicht. Erwähne sie nur, wenn sie für den nächsten Schritt nötig sind.

## 2. Briefing abfragen (alle Fragen in EINER Nachricht)
Geht es um ein bestehendes Projekt (Ordner mit `docs/briefing.md` vorhanden) oder nur um eine kleine Frage bzw. Änderung, dann ohne Briefing direkt im passenden Projekt weiterarbeiten.
Ist der Projektordner schon vorhanden und `docs/briefing.md` ausgefüllt, überspringe das und mach in der dort notierten Phase weiter.
Sonst stelle diese Fragen gesammelt und sag dazu, dass Stichworte genügen und Unbekanntes leer bleiben darf:

1. **Projekt:** Wie heißt das Unternehmen bzw. Projekt? Was bietet es an, für wen, und was unterscheidet es?
2. **Ziel:** Was soll die Seite erreichen (Anfragen, Verkäufe, Portfolio, Recruiting …)? Was ist die eine Handlung, die Besucher ausführen sollen?
3. **Umfang:** Eine Landingpage oder mehrere Seiten? Welche?
4. **Marke:** Gibt es Logo, Farben oder Schriften, die bleiben müssen, oder habe ich freie Hand?
5. **Referenzen:** 2–3 Websites, die gefallen, und eine, die nicht gefällt, jeweils mit einem Satz warum.
6. **Inhalte:** Gibt es Texte, Fotos oder Projekte? Oder soll ich Texte vorschlagen?
7. **Extras:** Sprachen, Kontaktformular, Buchung, Shop, CMS? Gibt es eine Domain oder eine Deadline?

## 3. Projekt anlegen, sobald die Antworten da sind
- Ordnername: Projektname in Kleinbuchstaben mit Bindestrichen, z. B. `baeckerei-kurz/`, direkt im Repo-Root (kein eigenes Git-Repo darin).
- Trage die Antworten in `<projekt>/docs/briefing.md` ein, mit Status „Phase 2: Art Direction“.
- Fasse das Briefing in 3–5 Zeilen zusammen. Wenn etwas Wesentliches fehlt, frag genau einmal nach. Sonst triff sinnvolle Annahmen und markiere sie als Annahme.

## 4. Starten
Erarbeite die Art Direction in `<projekt>/docs/art-direction.md` (Skill `frontend-design`): Leitidee, Typo-Paarung, Farbwelt als OKLCH-Tokens, Bildsprache, Motion-Prinzipien, Referenzen. Zeige sie kompakt im Chat und hol die Freigabe ein. Nach der Freigabe geht es mit Design → Umsetzung → QA → Deployment weiter, wie in `CLAUDE.md` beschrieben.

Nach jedem abgeschlossenen Schritt: committen und pushen, damit nichts verloren geht. Der Cloud-Container ist temporär.
