// Schlichte Linien-Icons (inline, keine externe Bibliothek)
type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: false } as const;

export const IconPlus = (p: P) => (<svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const IconMinus = (p: P) => (<svg viewBox="0 0 24 24" {...base} {...p}><path d="M5 12h14" /></svg>);
export const IconX = (p: P) => (<svg viewBox="0 0 24 24" {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const IconSuche = (p: P) => (<svg viewBox="0 0 24 24" {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>);
export const IconPfeil = (p: P) => (<svg viewBox="0 0 24 24" {...base} {...p}><path d="M6 9l6 6 6-6" /></svg>);
export const IconTelefon = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
/** Chili-Schote für „scharf“ */
export const IconChili = (p: P) => (
  <svg viewBox="0 0 16 16" aria-hidden focusable={false} {...p}><path fill="currentColor" d="M11.6 3.2c.5-.9 1.3-1.4 2.2-1.5l.2 1c-.5.1-.9.3-1.2.8.9.6 1.2 1.7.9 2.9-.8 3.6-4.9 7.3-10.8 7.9-.6.1-.8-.7-.3-.9C6.4 12 8.6 9.2 9.3 6.1c.3-1.4 1.1-2.5 2.3-2.9z" /></svg>
);
/** Blatt für „vegetarisch“ */
export const IconBlatt = (p: P) => (
  <svg viewBox="0 0 16 16" aria-hidden focusable={false} {...p}><path fill="currentColor" d="M14 2C7 2 2.5 5 2.5 10.2c0 1.2.3 2.2.8 3l-1 1.1.8.7 1-1.1c.8.6 1.9.9 3 .9C12.3 14.8 14.3 9 14 2zM5 12.3c1.6-2.6 3.8-4.6 6.3-6-2 1.8-3.7 3.8-5.3 6.6z" /></svg>
);
