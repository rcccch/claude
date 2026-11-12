import type { Metadata } from "next";
import Link from "next/link";
import { Fuss } from "@/components/rahmen";

export const metadata: Metadata = { title: "Datenschutzerklärung – Asia Wok Sinzig", robots: { index: true, follow: true } };

export default function Seite() {
  return (
    <>
      <main className="rechtsseite" id="inhalt" tabIndex={-1}>
        <Link href="/">← Zur Startseite</Link>
        <h1>Datenschutzerklärung</h1>
        <div className="platzhalter">
          <p><strong>Platzhalter:</strong> Der Text für die Datenschutzerklärung wird vom Inhaber geliefert und hier eingesetzt.</p>
        </div>
        <h2>Technische Hinweise für die Erstellung</h2>
        <ul>
          <li>Die Website setzt keine Cookies und keine Analyse- oder Tracking-Werkzeuge ein.</li>
          <li>Schriften werden vom eigenen Server geladen, nicht von Google Fonts.</li>
          <li>Der Bestellzettel wird nur im Browser des Besuchers gespeichert (localStorage) und nicht übertragen.</li>
          <li>Links zu OpenStreetMap und Google Maps führen erst beim Anklicken zu diesen Anbietern.</li>
          <li>Beim Aufruf verarbeitet der Webhoster technisch notwendige Daten (z. B. IP-Adresse in Server-Logs).</li>
        </ul>
      </main>
      <Fuss />
    </>
  );
}
