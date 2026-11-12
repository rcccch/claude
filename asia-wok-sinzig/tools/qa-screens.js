// QA: Screenshots + Bestellzettel-Test. Aufruf: node tools/qa-screens.js http://localhost:3000
const { chromium } = require("playwright");
const URL = process.argv[2] || "http://localhost:3000/";
const OUT = __dirname + "/../qa/";
(async () => {
  const b = await chromium.launch();
  const fehler = [];
  const log = (p, n) => p.on("console", (m) => { if (["error", "warning"].includes(m.type())) fehler.push(`[${n}] ${m.type()}: ${m.text()}`); }).on("pageerror", (e) => fehler.push(`[${n}] pageerror: ${e.message}`));

  // ---- Mobil ----
  const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, hasTouch: true, isMobile: true });
  log(m, "mobil");
  await m.goto(URL, { waitUntil: "networkidle" });
  await m.screenshot({ path: OUT + "mobil-1-kopf.png" });
  await m.click(".kopf-cta a[href='#speisekarte']");
  await m.waitForTimeout(600);
  await m.screenshot({ path: OUT + "mobil-2-karte.png" });
  // Highlight Nr. 30
  await m.evaluate(() => document.querySelector("#kat-huhn").scrollIntoView({behavior:"instant"}));
  await m.waitForTimeout(500);
  await m.screenshot({ path: OUT + "mobil-3-highlight.png" });
  // Hinzufügen: 30, 30, 85, 34 (mit Auswahl)
  for (const nr of ["30", "30", "85"]) { await m.click(`#nr-${nr} .plus`); await m.waitForTimeout(550); }
  await m.click("#nr-34 .plus"); await m.waitForTimeout(300);
  await m.screenshot({ path: OUT + "mobil-4-auswahl.png" });
  await m.click("dialog[open] .auswahl-liste button:nth-child(2)"); await m.waitForTimeout(600);
  // Suche
  await m.click(".such-toggle"); await m.fill("#suche", "tofu"); await m.waitForTimeout(300);
  await m.screenshot({ path: OUT + "mobil-5-suche.png" });
  await m.fill("#suche", ""); 
  // Kategorien-Dialog
  await m.click(".kat-knopf"); await m.waitForTimeout(300);
  await m.screenshot({ path: OUT + "mobil-6-kategorien.png" });
  await m.keyboard.press("Escape");
  // Zettel öffnen
  await m.click(".unterleiste [data-zettel-ziel]"); await m.waitForTimeout(400);
  await m.screenshot({ path: OUT + "mobil-7-zettel.png" });
  const summe1 = await m.textContent("dialog[open] .zettel-summe");
  // Reload-Test
  await m.keyboard.press("Escape");
  await m.reload({ waitUntil: "networkidle" });
  await m.waitForTimeout(300);
  const leiste = await m.textContent(".unterleiste [data-zettel-ziel]");
  await m.click(".unterleiste [data-zettel-ziel]"); await m.waitForTimeout(300);
  await m.click("dialog[open] .zettel-aktionen .btn-gruen"); await m.waitForTimeout(400);
  await m.screenshot({ path: OUT + "mobil-8-vorlesen.png", fullPage: false });
  await m.keyboard.press("Escape");
  await m.evaluate(() => document.querySelector("#oeffnungszeiten").scrollIntoView({behavior:"instant"}));
  await m.waitForTimeout(400);
  await m.screenshot({ path: OUT + "mobil-9-info.png" });

  // ---- Desktop ----
  const d = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  log(d, "desktop");
  await d.goto(URL, { waitUntil: "networkidle" });
  await d.screenshot({ path: OUT + "desktop-1-kopf.png" });
  await d.evaluate(() => document.querySelector("#kat-vorspeisen").scrollIntoView({behavior:"instant"}));
  await d.waitForTimeout(400);
  for (const nr of ["1", "4", "17"]) { await d.click(`#nr-${nr} .plus`); await d.waitForTimeout(550); }
  await d.screenshot({ path: OUT + "desktop-2-karte-zettel.png" });
  await d.evaluate(() => document.querySelector("#kat-ente").scrollIntoView({behavior:"instant"}));
  await d.waitForTimeout(500);
  await d.screenshot({ path: OUT + "desktop-3-highlight.png" });
  await d.evaluate(() => document.querySelector("#oeffnungszeiten").scrollIntoView({behavior:"instant"}));
  await d.waitForTimeout(400);
  await d.screenshot({ path: OUT + "desktop-4-info.png" });

  // Reduced motion
  const r = await b.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  log(r, "reduced");
  await r.goto(URL, { waitUntil: "networkidle" });
  await r.click("#nr-1 .plus"); await r.waitForTimeout(100);
  const flug = await r.$(".nummer-flug");

  console.log(JSON.stringify({ summeMobil: summe1, leisteNachReload: leiste, flugBeiReducedMotion: !!flug, fehler }, null, 1));
  await b.close();
})();
