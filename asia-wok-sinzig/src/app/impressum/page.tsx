import type { Metadata } from "next";
import Link from "next/link";
import { Fuss } from "@/components/rahmen";

export const metadata: Metadata = { title: "Impressum – Asia Wok Sinzig", robots: { index: true, follow: true } };

export default function Seite() {
  return (
    <>
      <main className="rechtsseite" id="inhalt" tabIndex={-1}>
        <Link href="/">← Zur Startseite</Link>
        <h1>Impressum</h1>
        <div className="platzhalter">
          <p><strong>Platzhalter:</strong> Der Text für die Impressum wird vom Inhaber geliefert und hier eingesetzt.</p>
        </div>
        
      </main>
      <Fuss />
    </>
  );
}
