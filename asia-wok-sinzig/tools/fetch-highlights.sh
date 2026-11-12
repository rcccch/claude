#!/usr/bin/env bash
# Lädt die Highlight-Fotos von der bisherigen Seite nach public/img/highlights/ (nicht im Git-Repo).
set -euo pipefail
cd "$(dirname "$0")/../public/img/highlights"
for n in duck chicken noodles noodles2 facade entrance window; do
  for w in 800 1400; do curl -fsSL -o "$n-$w.webp" "https://reichkraft.de/asiawok/img/$n-$w.webp"; done
done
ls -1
