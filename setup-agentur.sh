#!/usr/bin/env bash
# Richtet den Webagentur-Werkzeugkasten für Claude Code im User-Scope ein.
# Ausführen auf deinem eigenen Rechner (macOS/Linux, Windows via WSL):
#   bash setup-agentur.sh
# Voraussetzungen: Claude Code >= 2.1, Node.js >= 22.13, npm, git.
# Keine API-Keys, keine Konten: Logins erledigst du danach über /mcp in Claude Code.
set -euo pipefail

echo "==> Prüfe Voraussetzungen"
command -v claude >/dev/null || { echo "Claude Code fehlt: https://code.claude.com"; exit 1; }
command -v node   >/dev/null || { echo "Node.js fehlt: https://nodejs.org (LTS)"; exit 1; }
claude --version

echo "==> Marketplaces (offiziell Anthropic + offiziell GreenSock)"
claude plugin marketplace add anthropics/claude-plugins-official || true
claude plugin marketplace add greensock/gsap-skills || true
claude plugin marketplace update || true

echo "==> Plugins (User-Scope)"
for p in \
  frontend-design@claude-plugins-official \
  playwright@claude-plugins-official \
  figma@claude-plugins-official \
  typescript-lsp@claude-plugins-official \
  modern-web-guidance@claude-plugins-official \
  commit-commands@claude-plugins-official \
  gsap-skills@gsap-skills
do
  claude plugin install "$p" --scope user -y || echo "!! $p fehlgeschlagen – bitte manuell prüfen"
done

echo "==> Context7 (offizielles Upstash-Setup: MCP mit OAuth + Regel + Skill)"
# Ersetzt das context7-Plugin aus dem Marketplace (sonst doppelte Tools).
claude plugin disable context7@claude-plugins-official --scope user >/dev/null 2>&1 || true
npx -y ctx7@latest setup --claude --mcp --oauth --yes

echo "==> Skills (global, nur für Claude Code)"
npx -y skills@latest add vercel-labs/agent-skills \
  --skill web-design-guidelines --skill vercel-react-best-practices -g -a claude-code -y
npx -y skills@latest add shadcn/ui --skill shadcn -g -a claude-code -y

echo "==> CLI-Werkzeuge (global via npm)"
# typescript@5.9: TypeScript 7 liefert kein tsserver mehr, das der LSP braucht.
npm install -g pnpm lighthouse @axe-core/cli vercel typescript-language-server typescript@5.9.3

echo "==> Playwright-Browser für Screenshots/QA"
if [ -n "${PLAYWRIGHT_BROWSERS_PATH:-}" ] && [ -d "$PLAYWRIGHT_BROWSERS_PATH" ]; then
  echo "Playwright-Browser bereits vorhanden ($PLAYWRIGHT_BROWSERS_PATH) – übersprungen"
else
  npx -y playwright@latest install chromium
fi

echo
echo "Fertig. Jetzt:"
echo "  1. Claude Code neu starten"
echo "  2. In Claude Code: /mcp → context7 → Authenticate (kostenloses Konto)"
echo "  3. In Claude Code: /mcp → figma → Authenticate (Figma-Konto)"
echo "  4. gh auth login   und   vercel login   im Terminal"
