import { restaurant } from "./data";

type Spanne = [string, string];
const TAGE = ["so", "mo", "di", "mi", "do", "fr", "sa"] as const;
const TAGNAME = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];

/** Uhrzeit und Datum in Sinzig, unabhängig von der Zeitzone des Geräts. */
export function jetztInSinzig(d = new Date()) {
  const teile = new Intl.DateTimeFormat("de-DE", {
    timeZone: "Europe/Berlin",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23", weekday: "short",
  }).formatToParts(d);
  const g = (t: string) => teile.find((p) => p.type === t)?.value ?? "";
  const jahr = +g("year"), monat = +g("month"), tag = +g("day");
  const wochentag = new Date(Date.UTC(jahr, monat - 1, tag)).getUTCDay();
  return { jahr, monat, tag, wochentag, minuten: +g("hour") * 60 + +g("minute") };
}

function ostersonntag(j: number) {
  const a = j % 19, b = Math.floor(j / 100), c = j % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const monat = Math.floor((h + l - 7 * m + 114) / 31), tag = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(j, monat - 1, tag);
}

/** Gesetzliche Feiertage Rheinland-Pfalz. */
export function istFeiertag(j: number, m: number, t: number) {
  const fest = ["1-1", "5-1", "10-3", "11-1", "12-25", "12-26"];
  if (fest.includes(`${m}-${t}`)) return true;
  const tagMs = 86400000, o = ostersonntag(j), heute = Date.UTC(j, m - 1, t);
  return [-2, 1, 39, 50, 60].some((n) => o + n * tagMs === heute);
}

const zuMin = (s: string) => { const [h, mi] = s.split(":").map(Number); return h * 60 + mi; };

function spannenFuer(j: number, m: number, t: number, wochentag: number): Spanne[] {
  const oz = restaurant.oeffnungszeiten;
  if (istFeiertag(j, m, t)) return oz.feiertage as Spanne[];
  return oz.tage[TAGE[wochentag]] as Spanne[];
}

export interface Status {
  offen: boolean;
  text: string;
  heuteIndex: number; // 0 = Mo … 6 = So, für Hervorhebung
}

/** "Jetzt geöffnet · bis 21:30 Uhr" bzw. "Geschlossen · öffnet heute um 17:00 Uhr". */
export function oeffnungsStatus(d = new Date()): Status {
  const n = jetztInSinzig(d);
  const heuteIndex = (n.wochentag + 6) % 7;
  const heute = spannenFuer(n.jahr, n.monat, n.tag, n.wochentag);
  for (const [von, bis] of heute) {
    if (n.minuten >= zuMin(von) && n.minuten < zuMin(bis)) {
      return { offen: true, text: `Jetzt geöffnet bis ${bis} Uhr`, heuteIndex };
    }
  }
  const spaeter = heute.find(([von]) => zuMin(von) > n.minuten);
  if (spaeter) return { offen: false, text: `Geschlossen · öffnet heute um ${spaeter[0]} Uhr`, heuteIndex };
  for (let plus = 1; plus <= 7; plus++) {
    const dt = new Date(Date.UTC(n.jahr, n.monat - 1, n.tag + plus));
    const sp = spannenFuer(dt.getUTCFullYear(), dt.getUTCMonth() + 1, dt.getUTCDate(), dt.getUTCDay());
    if (sp.length) {
      const wann = plus === 1 ? "morgen" : TAGNAME[dt.getUTCDay()];
      return { offen: false, text: `Geschlossen · öffnet ${wann} um ${sp[0][0]} Uhr`, heuteIndex };
    }
  }
  return { offen: false, text: "Geschlossen", heuteIndex };
}
