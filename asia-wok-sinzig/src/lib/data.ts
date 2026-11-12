import menuJson from "@/data/menu.json";
import restaurantJson from "@/data/restaurant.json";
import highlightsJson from "@/data/highlights.json";

export type Scharf = "leicht" | "scharf" | null;

export interface Auswahl {
  titel: string;
  optionen: string[];
}

export interface Gericht {
  nr: string;
  name: string;
  beschreibung: string | null;
  preis: number;
  allergene: string[];
  scharf: Scharf;
  vegetarisch: boolean;
  auswahl?: Auswahl;
  allergene_unsicher?: boolean;
  unsicher?: boolean;
}

export interface Kategorie {
  id: string;
  titel: string;
  untertitel: string | null;
  hinweis?: string;
  hervorheben?: boolean;
  gerichte: Gericht[];
}

export interface Extra {
  id: string;
  name: string;
  preis: number;
  gruppe?: string;
  hinweis?: string;
  aufpreis?: boolean;
  auswahl?: Auswahl;
}

export interface Highlight {
  datei: string;
  nr: string;
  format: string;
  alt: string;
}

export const menu = menuJson as unknown as {
  legende: Record<string, string>;
  legende_zusatz: string;
  kategorien: Kategorie[];
  extras: { titel: string; posten: Extra[] };
};

export const restaurant = restaurantJson;

export const highlights = highlightsJson as unknown as {
  gerichte: Highlight[];
  kategorien: { datei: string; kategorie: string; format: string; alt: string }[];
  haus: { datei: string; einsatz: string; format: string; alt: string }[];
};

export const alleGerichte: Gericht[] = menu.kategorien.flatMap((k) => k.gerichte);

export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function bild(datei: string) {
  const b = `${basePath}/img/highlights/${datei}`;
  return { src: `${b}-800.webp`, srcSet: `${b}-800.webp 800w, ${b}-1400.webp 1400w` };
}

/** Endgültige Adresse der Seite (für Canonical, Open Graph, Sitemap). Beim Build per SITE_URL setzen. */
export const SITE_URL = (process.env.SITE_URL ?? "https://reichkraft.de/asiawok").replace(/\/$/, "");
