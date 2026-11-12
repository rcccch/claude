import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { restaurant, menu, SITE_URL } from "@/lib/data";

const barlow = localFont({
  src: [
    { path: "./fonts/barlow-semi-condensed-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/barlow-semi-condensed-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/barlow-semi-condensed-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-barlow",
  display: "swap",
});
const atkinson = localFont({
  src: [
    { path: "./fonts/atkinson-hyperlegible-next-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/atkinson-hyperlegible-next-latin-700-normal.woff2", weight: "700" },
  ],
  variable: "--font-atkinson",
  display: "swap",
});

const beschreibung =
  "Asia Wok am Markt 4 in Sinzig: Speisekarte mit über 100 asiatischen Gerichten, Öffnungszeiten und Abholung. Telefonisch bestellen unter 02642 99 27 97, nach ca. 10–15 Minuten abholen.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL + "/"),
  title: "Asia Wok Sinzig – Asiatische Spezialitäten zum Abholen",
  description: beschreibung,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    title: "Asia Wok Sinzig – Asiatische Spezialitäten",
    description: beschreibung,
    siteName: "Asia Wok Sinzig",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "Asia Wok – Asiatische Spezialitäten, Markt 4, Sinzig" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#f3c841", width: "device-width", initialScale: 1 };

function jsonLd() {
  const oz = restaurant.oeffnungszeiten.tage;
  const tagMap: Record<string, string> = { mo: "Monday", di: "Tuesday", mi: "Wednesday", do: "Thursday", fr: "Friday", sa: "Saturday", so: "Sunday" };
  const spec = Object.entries(oz).flatMap(([t, spannen]) =>
    (spannen as string[][]).map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: tagMap[t], opens, closes })),
  );
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    slogan: restaurant.slogan,
    servesCuisine: ["Asiatisch", "Chinesisch", "Thailändisch"],
    url: SITE_URL + "/",
    telephone: restaurant.telefon[0].e164,
    faxNumber: restaurant.telefon[1].e164,
    image: SITE_URL + "/img/highlights/facade-1400.webp",
    logo: SITE_URL + "/logo/logo.png",
    priceRange: "€",
    paymentAccepted: "Bargeld",
    currenciesAccepted: "EUR",
    acceptsReservations: false,
    address: { "@type": "PostalAddress", streetAddress: restaurant.adresse.strasse, postalCode: restaurant.adresse.plz, addressLocality: restaurant.adresse.ort, addressCountry: "DE" },
    openingHoursSpecification: spec,
    hasMenu: {
      "@type": "Menu",
      name: "Speisekarte",
      hasMenuSection: menu.kategorien.map((k) => ({
        "@type": "MenuSection",
        name: k.titel,
        hasMenuItem: k.gerichte.map((g) => ({
          "@type": "MenuItem",
          name: `${g.nr}. ${g.name}`,
          ...(g.beschreibung ? { description: g.beschreibung } : {}),
          offers: { "@type": "Offer", price: g.preis.toFixed(2), priceCurrency: "EUR" },
          ...(g.vegetarisch ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
        })),
      })),
    },
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${barlow.variable} ${atkinson.variable}`}>
      <body>
        <a className="skip-link" href="#inhalt">Zum Inhalt springen</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
