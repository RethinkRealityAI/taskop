import Image from "next/image";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { clients } from "@/content/site";

/**
 * Rich client profiles: logo, who they are, where, and what TaskOp does for them.
 * Each header carries a faint wash drawn from that client's own brand colour, so the
 * grid reads as six distinct organizations rather than one repeated grey band. The
 * wash stays under ~15% so it never competes with the logo sitting on it.
 */
export function ClientCards() {
  return (
    <Stagger as="ul" className="grid gap-5 md:grid-cols-2" amount={0.15}>
      {clients.map((c) => (
        <StaggerItem key={c.shortName} as="li" className="h-full">
          <article
            className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-line transition-all duration-500 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-lg"
            style={{ ["--tint" as string]: c.tint }}
          >
            {/* Hairline of the client's colour along the very top of the card. */}
            <span
              className="absolute inset-x-0 top-0 z-10 h-[3px] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: `linear-gradient(90deg, ${c.tint}, color-mix(in srgb, ${c.tint} 35%, #ffffff))` }}
              aria-hidden
            />

            <div
              className="relative flex items-center justify-between gap-6 border-b px-7 py-7"
              style={{
                background: `linear-gradient(135deg, color-mix(in srgb, ${c.tint} 15%, #ffffff) 0%, color-mix(in srgb, ${c.tint} 6%, #ffffff) 55%, #ffffff 100%)`,
                borderColor: `color-mix(in srgb, ${c.tint} 18%, transparent)`,
              }}
            >
              {/* Soft bloom of the tint that warms up on hover. */}
              <span
                className="pointer-events-none absolute -right-10 -top-16 size-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
                style={{ background: c.tint }}
                aria-hidden
              />
              <div className="relative flex h-14 items-center">
                <Image
                  src={c.logo.src}
                  alt={`${c.name} logo`}
                  width={c.logo.width}
                  height={c.logo.height}
                  style={{ height: Math.round(c.logoHeight * 1.25), width: "auto" }}
                  className="max-w-[220px] object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="240px"
                />
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${c.name} (opens in a new tab)`}
                className="group/link relative inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/80 text-navy ring-1 ring-white/70 backdrop-blur transition-all duration-300"
                style={{ boxShadow: `0 4px 14px -6px color-mix(in srgb, ${c.tint} 60%, transparent)` }}
              >
                <span
                  className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover/link:opacity-100"
                  style={{ background: c.tint }}
                  aria-hidden
                />
                <ArrowUpRight className="relative size-4 transition-colors duration-300 group-hover/link:text-white" aria-hidden />
              </a>
            </div>

            <div className="relative flex flex-1 flex-col px-7 py-6">
              <h3 className="text-xl font-semibold tracking-tight text-navy">{c.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-3">
                <li className="inline-flex items-center gap-1.5">
                  <Briefcase className="size-3.5" style={{ color: c.tint }} aria-hidden /> {c.sector}
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" style={{ color: c.tint }} aria-hidden /> {c.location}
                </li>
              </ul>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-2">{c.description}</p>
              <div className="mt-auto pt-6">
                <p
                  className="font-sans text-[0.7rem] font-semibold uppercase tracking-wider"
                  style={{ color: `color-mix(in srgb, ${c.tint} 75%, #4b5160)` }}
                >
                  Areas of support
                </p>
                <p className="mt-1.5 text-[0.95rem] font-medium text-ink">{c.engagement}</p>
              </div>
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
