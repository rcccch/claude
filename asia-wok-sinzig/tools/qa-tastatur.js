// Tastatur-Durchlauf + axe in geöffneten Dialogen
const { chromium } = require("playwright"); const fs = require("fs");
const AXE = fs.readFileSync("/opt/node22/lib/node_modules/@axe-core/cli/node_modules/axe-core/axe.min.js", "utf8");
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const fokus = [];
  for (let i = 0; i < 14; i++) { await p.keyboard.press("Tab"); fokus.push(await p.evaluate(() => { const e = document.activeElement; const s = getComputedStyle(e); return (e.getAttribute("aria-label") || e.textContent || e.id || e.tagName).trim().slice(0, 40) + (s.outlineStyle !== "none" ? " [Fokusrahmen]" : " [KEIN RAHMEN]"); })); }
  if (fokus[0].startsWith("Zum Inhalt")) await p.screenshot({ path: "qa/tastatur-skiplink.png" });
  // Gericht per Tastatur hinzufügen
  await p.focus("#nr-1 .plus"); await p.keyboard.press("Enter"); await p.waitForTimeout(600);
  await p.focus("#nr-34 .plus"); await p.keyboard.press("Enter"); await p.waitForTimeout(300);
  const imDialog = await p.evaluate(() => !!document.activeElement.closest("dialog[open]"));
  await p.keyboard.press("Tab"); await p.keyboard.press("Enter"); await p.waitForTimeout(600);
  const ansage = await p.textContent("[role=status]");
  const res = {};
  await p.addScriptTag({ content: AXE });
  await p.click(".unterleiste [data-zettel-ziel]"); await p.waitForTimeout(300);
  res.zettel = (await p.evaluate(async () => (await axe.run(document.querySelector("dialog[open]"))).violations.map(v => v.id)));
  await p.click("dialog[open] .zettel-aktionen .btn-gruen"); await p.waitForTimeout(300);
  res.vorlesen = (await p.evaluate(async () => (await axe.run(document.querySelector("dialog[open]"))).violations.map(v => v.id)));
  await p.keyboard.press("Escape");
  await p.click(".kat-knopf"); await p.waitForTimeout(200);
  res.kategorien = (await p.evaluate(async () => (await axe.run(document.querySelector("dialog[open]"))).violations.map(v => v.id)));
  await p.keyboard.press("Escape");
  await p.click(".allergen-knopf"); await p.waitForTimeout(200);
  res.allergenPopoverOffen = await p.evaluate(() => !!document.querySelector(".allergen-pop:popover-open"));
  console.log(JSON.stringify({ fokus, fokusImAuswahlDialog: imDialog, ansage, axeDialoge: res }, null, 1));
  await b.close();
})();
