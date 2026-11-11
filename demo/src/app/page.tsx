import { Hero } from "@/components/hero";
import { Statement } from "@/components/statement";
import { Process } from "@/components/process";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const collection = [
  { name: "Becher Lausitz", detail: "Klarglas mit Kobaltfaden, 0,3 l", price: "48 €" },
  { name: "Karaffe Neiße", detail: "Rauchglas, 1 l, mit Glasstopfen", price: "165 €" },
  { name: "Leuchte Glut", detail: "Bernsteinglas, Ø 28 cm, Textilkabel", price: "390 €" },
  { name: "Schale Eis", detail: "Opalweiß, Ø 34 cm, Unikat", price: "220 €" },
];

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <Statement />
        <Process />

        <section id="sammlung" aria-labelledby="sammlung-titel" className="px-5 py-28 sm:px-10">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.6fr]">
            <div>
              <h2
                id="sammlung-titel"
                className="font-display text-[clamp(2.4rem,5vw,4rem)] font-bold leading-none tracking-tight [font-stretch:80%]"
              >
                Aus der aktuellen Schmelze
              </h2>
              <p className="mt-6 max-w-[36ch] text-muted-foreground">
                Wir arbeiten in kleinen Serien. Was hier steht, liegt gerade im Regal der Werkstatt.
              </p>
            </div>
            <ul className="divide-y divide-border border-y border-border">
              {collection.map((item) => (
                <li key={item.name} className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 py-6">
                  <h3 className="font-display text-2xl font-semibold sm:text-3xl">{item.name}</h3>
                  <p className="font-display text-xl tabular-nums">{item.price}</p>
                  <p className="col-span-2 text-base text-muted-foreground">{item.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="besuch"
          aria-labelledby="besuch-titel"
          className="mx-5 mb-5 rounded-[2rem] bg-cobalt px-6 py-20 text-primary-foreground sm:mx-10 sm:px-14 sm:py-28"
        >
          <h2
            id="besuch-titel"
            className="max-w-[14ch] font-display text-[clamp(2.6rem,7vw,6rem)] font-extrabold leading-[0.92] tracking-tight [font-stretch:78%]"
          >
            Schauen Sie uns über die Schulter
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-end">
            <p className="max-w-[40ch] text-lg text-white/85">
              Donnerstags und samstags blasen wir vor Publikum. Führungen für bis zu acht Personen,
              Dauer etwa eine Stunde.
            </p>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <a
                href="mailto:werkstatt@studio-fluss.example?subject=Werkstattbesuch"
                className={cn(buttonVariants({ size: "lg" }), "h-14 bg-ember px-7 text-lg text-cobalt-deep hover:bg-white")}
              >
                Besuch anfragen
              </a>
              <a
                href="#sammlung"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "h-14 border-white/40 bg-transparent px-7 text-lg text-white hover:bg-white/10 hover:text-white")}
              >
                Sammlung ansehen
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-wrap justify-between gap-4 px-5 pb-10 pt-6 text-base text-muted-foreground sm:px-10">
        <p>Studio Fluss, Glashüttenstraße 3, 02943 Weißwasser (fiktive Demo)</p>
        <nav aria-label="Rechtliches" className="flex gap-6">
          <a href="#" className="underline underline-offset-4">Impressum</a>
          <a href="#" className="underline underline-offset-4">Datenschutz</a>
        </nav>
      </footer>
    </>
  );
}
