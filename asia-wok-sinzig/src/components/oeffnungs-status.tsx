"use client";

import { useEffect, useState } from "react";
import { oeffnungsStatus, type Status } from "@/lib/hours";
import { restaurant } from "@/lib/data";

export function useOeffnungsStatus() {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const aktualisieren = () => setStatus(oeffnungsStatus());
    aktualisieren();
    const t = setInterval(aktualisieren, 30_000);
    return () => clearInterval(t);
  }, []);
  return status;
}

/** Live-Hinweis „Jetzt geöffnet bis …“ im Kopf. */
export function OeffnungsStatus() {
  const status = useOeffnungsStatus();
  return (
    <p className="status" data-offen={status?.offen ?? false} aria-live="polite">
      <span className="status-punkt" aria-hidden />
      <span>{status ? status.text : "Öffnungszeiten unten auf der Seite"}</span>
    </p>
  );
}

/** Öffnungszeiten-Tabelle; der heutige Tag wird hervorgehoben. */
export function Zeiten() {
  const status = useOeffnungsStatus();
  const zeilen = restaurant.oeffnungszeiten.anzeige;
  const heute = status?.heuteIndex;
  const istHeute = (tage: string) => {
    if (heute === undefined) return false;
    if (tage.startsWith("Mo")) return heute <= 4;
    if (tage.startsWith("So")) return heute === 6;
    if (tage.startsWith("Sa")) return heute === 5;
    return false;
  };
  return (
    <>
      {status && <p className="display" style={{ margin: "0 0 12px", fontWeight: 700, fontSize: "1.1875rem" }}>{status.text}</p>}
      <dl className="zeiten zahl">
        {zeilen.map((z) => (
          <div key={z.tage} style={{ display: "contents" }} data-heute={istHeute(z.tage)}>
            <dt data-heute={istHeute(z.tage)}>{z.tage}</dt>
            <dd data-heute={istHeute(z.tage)}>{z.zeiten}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
