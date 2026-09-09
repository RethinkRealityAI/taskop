import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { home } from "@/content/site";

export function Process() {
  return (
    <Stagger className="grid gap-5 md:grid-cols-3" as="ol">
      {home.process.map((p, i) => (
        <StaggerItem key={p.step} as="li">
          <div className="group relative h-full overflow-hidden rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-md md:p-8">
            <div
              className="absolute -right-10 -top-10 size-40 rounded-full bg-accent-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
            <div className="relative flex items-center justify-between">
              <span className="text-display text-5xl text-line-strong transition-colors duration-500 group-hover:text-accent">
                {p.step}
              </span>
              {i < home.process.length - 1 && (
                <span className="hidden h-px w-16 bg-line md:block" aria-hidden />
              )}
            </div>
            <h3 className="relative mt-8 text-2xl font-semibold tracking-tight text-ink">{p.title}</h3>
            <p className="relative mt-3 text-ink-2">{p.body}</p>
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
