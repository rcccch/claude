// Jeder Preis auf der Seite gegen menu.json (die Daten wurden gegen die Flyer-Fotos geprüft)
const { chromium } = require("playwright");
const menu = require("../src/data/menu.json");
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  await p.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const seite = await p.$$eval(".gericht[id^=nr-]", (els) => els.map((e) => [e.id.slice(3), e.querySelector(".preis").textContent]));
  const soll = Object.fromEntries(menu.kategorien.flatMap((k) => k.gerichte.map((g) => [g.nr, g.preis.toFixed(2).replace(".", ",") + " €"])));
  const fehler = seite.filter(([nr, pr]) => soll[nr] !== pr.replace(/ /g, " "));
  const fehlt = Object.keys(soll).filter((nr) => !seite.find(([n]) => n === nr));
  console.log(`Gerichte auf der Seite: ${seite.length}, in menu.json: ${Object.keys(soll).length}, Abweichungen: ${fehler.length}, fehlend: ${fehlt.length}`, fehler, fehlt);
  await b.close();
})();
