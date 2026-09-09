import { Gauge, Lightbulb, Handshake, Target } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { home } from "@/content/site";

const icons = [Gauge, Lightbulb, Handshake, Target];

export function Values({ dark = false }: { dark?: boolean }) {
  return (
    <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" as="ul">
      {home.values.map((v, i) => {
        const Icon = icons[i % icons.length];
        return (
          <StaggerItem key={v.title} as="li">
            <div
              className={
                dark
                  ? "h-full rounded-[var(--radius-lg)] bg-white/5 p-6 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/10"
                  : "h-full rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              }
            >
              <span
                className={
                  dark
                    ? "inline-flex size-11 items-center justify-center rounded-2xl bg-white/10 text-sky"
                    : "inline-flex size-11 items-center justify-center rounded-2xl bg-accent-soft text-accent"
                }
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight">{v.title}</h3>
              <p className={dark ? "mt-2 text-white/70" : "mt-2 text-ink-2"}>{v.body}</p>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
