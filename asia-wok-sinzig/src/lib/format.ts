const fmt = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/** 12.5 → "12,50 €" */
export function euro(betrag: number) {
  return `${fmt.format(betrag)} €`;
}

/** Für die Suche: klein, ohne Umlaute/Satzzeichen ("Hühner" → "huhner"). */
export function normalisieren(text: string) {
  return text
    .toLowerCase()
    .replace(/ß/g, "ss")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[„“"'()&,.\-–/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function telHref(e164: string) {
  return `tel:${e164}`;
}
