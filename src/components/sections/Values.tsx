import { Gauge, Lightbulb, Handshake, Target } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";
import { home } from "@/content/site";

const icons = [Gauge, Lightbulb, Handshake, Target];

/** Each value gets its own chip colour so the row reads as four ideas, not one repeated tile. */
const chips = [
  { light: "bg-accent-soft text-accent", dark: "bg-accent/20 text-[#8ab4ff]" },
  { light: "bg-sky-soft text-sky", dark: "bg-sky/20 text-sky" },
  { light: "bg-[#e9e7fb] text-[#4f46e5]", dark: "bg-[#4f46e5]/25 text-[#a5b4fc]" },
  { light: "bg-[#e0f5ec] text-[#17795e]", dark: "bg-[#17795e]/25 text-[#6ee7b7]" },
];

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
                className={cn(
                  "inline-flex size-11 items-center justify-center rounded-2xl",
                  dark ? chips[i % chips.length].dark : chips[i % chips.length].light,
                )}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className={cn("mt-5 text-xl font-semibold tracking-tight", !dark && "text-navy")}>{v.title}</h3>
              <p className={dark ? "mt-2 text-white/70" : "mt-2 text-ink-2"}>{v.body}</p>
            </div>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
