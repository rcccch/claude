import Link from "next/link";
import { basePath, restaurant } from "@/lib/data";
import { telHref } from "@/lib/format";
import { OeffnungsStatus } from "./oeffnungs-status";
import { IconTelefon } from "./icons";

const tel = restaurant.telefon[0];

export function Kopf() {
  return (
    <header className="kopf">
      <img className="kopf-logo" src={`${basePath}/logo/logo.svg`} alt="" width={1573} height={1402} fetchPriority="high" />
      <h1>
        <span className="sr-only">Asia Wok Sinzig – </span>
        {restaurant.slogan}
      </h1>
      <OeffnungsStatus />
      <div className="kopf-cta">
        <a className="btn btn-gruen" href="#speisekarte">Speisekarte</a>
        <a className="btn btn-hell" href={telHref(tel.e164)}>
          <IconTelefon className="w-5 h-5" /> <span className="zahl">{tel.anzeige.replace(" / ", " ")}</span> anrufen
        </a>
      </div>
      <p className="kopf-info">Nur Abholung, nach ca. 10–15 Minuten fertig. Zahlung nur bar.</p>
    </header>
  );
}

export function Fuss() {
  return (
    <footer className="fuss">
      <div className="fuss-inhalt">
        <p style={{ margin: 0 }}>
          {restaurant.name}, {restaurant.adresse.strasse}, {restaurant.adresse.plz} {restaurant.adresse.ort}
        </p>
        <nav aria-label="Rechtliches">
          <Link href="/impressum/">Impressum</Link>
          <Link href="/datenschutz/">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}
