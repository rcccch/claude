import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Newsreader } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

// next/font lädt die Schriften zur Build-Zeit und hostet sie selbst (kein Google-Request im Browser).
const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  display: "swap",
});

const text = Newsreader({
  variable: "--font-text",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://studio-fluss.example"),
  title: "Studio Fluss – mundgeblasenes Glas aus der Oberlausitz",
  description:
    "Gläser, Karaffen und Leuchten, frei vor der Flamme geformt. Werkstatt mit Verkauf in Weißwasser, Besuch nach Anmeldung.",
  openGraph: {
    title: "Studio Fluss",
    description: "Mundgeblasenes Glas aus der Oberlausitz.",
    locale: "de_DE",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#e9eef2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${display.variable} ${text.variable} antialiased`}>
      <body>
        <a href="#inhalt" className="skip-link">
          Zum Inhalt springen
        </a>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
