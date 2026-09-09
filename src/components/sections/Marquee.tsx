import { servicesPage } from "@/content/site";

/** Continuous horizontal ticker of the firm's core service areas. */
export function Marquee() {
  const items = [...servicesPage.offerSummary, ...servicesPage.offerSummary];
  return (
    <div className="relative overflow-hidden border-y border-line bg-white py-5" aria-label="Areas of expertise">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
      <ul className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-10 font-sans text-sm font-medium text-ink-2" aria-hidden={i >= servicesPage.offerSummary.length}>
            {item}
            <span className="size-1.5 rounded-full bg-accent" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
