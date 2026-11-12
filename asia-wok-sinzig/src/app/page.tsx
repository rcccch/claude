import { OrderProvider } from "@/components/order-context";
import { Speisekarte } from "@/components/speisekarte";
import { Fuss, Kopf } from "@/components/rahmen";
import { Zeiten } from "@/components/oeffnungs-status";
import { bild, highlights, restaurant } from "@/lib/data";
import { telHref } from "@/lib/format";

const haus = Object.fromEntries(highlights.haus.map((h) => [h.einsatz, h]));

export default function Startseite() {
  const a = restaurant.adresse;
  const adresse = `${a.strasse}, ${a.plz} ${a.ort}`;
  return (
    <>
      <Kopf />
      <main id="inhalt" tabIndex={-1}>
        <OrderProvider>
          <Speisekarte />
        </OrderProvider>

        <div className="info-band">
          <div className="info-raster">
            <section aria-labelledby="h-zeiten" id="oeffnungszeiten">
              <h2 id="h-zeiten">Öffnungszeiten</h2>
              <Zeiten />
            </section>

            <section aria-labelledby="h-abholung" id="abholung">
              <h2 id="h-abholung">Abholung</h2>
              <ul className="info-liste">
                <li>Telefonisch bestellen unter <a className="zahl" href={telHref(restaurant.telefon[0].e164)}>{restaurant.telefon[0].anzeige}</a>.</li>
                <li>Nach ca. 10–15 Minuten abholen, in einer Warmhalteverpackung.</li>
                <li>Zahlung bei Abholung, nur bar.</li>
                <li>Wir liefern nicht.</li>
              </ul>
              <figure className="info-foto hoch">
                <img {...bild(haus.abholung.datei)} sizes="320px" alt={haus.abholung.alt} loading="lazy" decoding="async" width={828} height={1026} />
              </figure>
            </section>

            <section aria-labelledby="h-kontakt" id="kontakt">
              <h2 id="h-kontakt">Anfahrt & Kontakt</h2>
              <address style={{ fontStyle: "normal" }}>
                <strong>{restaurant.name}</strong><br />
                {a.strasse}<br />
                {a.plz} {a.ort}
              </address>
              <p>
                Tel. <a className="zahl" href={telHref(restaurant.telefon[0].e164)}>{restaurant.telefon[0].anzeige}</a><br />
                Tel./Fax <a className="zahl" href={telHref(restaurant.telefon[1].e164)}>{restaurant.telefon[1].anzeige}</a>
              </p>
              <p>
                {restaurant.restaurant.sitzplaetze} Sitzplätze, {restaurant.restaurant.aussenplaetze}.<br />
                {restaurant.restaurant.barrierefrei}.
              </p>
              <p style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a className="btn btn-hell btn-klein" href={restaurant.karte.openstreetmap} target="_blank" rel="noopener noreferrer">
                  Karte (OpenStreetMap)<span className="sr-only"> – öffnet in neuem Tab</span>
                </a>
                <a className="btn btn-hell btn-klein" href={restaurant.karte.google_maps} target="_blank" rel="noopener noreferrer">
                  Route (Google Maps)<span className="sr-only"> – öffnet in neuem Tab</span>
                </a>
              </p>
              <figure className="info-foto">
                <img {...bild(haus.anfahrt.datei)} sizes="(min-width: 1200px) 400px, (min-width: 768px) 50vw, 100vw" alt={`${haus.anfahrt.alt} (${adresse})`} loading="lazy" decoding="async" width={1400} height={976} />
              </figure>
            </section>
          </div>
        </div>
      </main>
      <Fuss />
    </>
  );
}
