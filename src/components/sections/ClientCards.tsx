import Image from "next/image";
import { ArrowUpRight, Briefcase, MapPin } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { clients } from "@/content/site";

/** Rich client profiles: logo, who they are, where, and what TaskOp does for them. */
export function ClientCards() {
  return (
    <Stagger as="ul" className="grid gap-5 md:grid-cols-2" amount={0.15}>
      {clients.map((c) => (
        <StaggerItem key={c.shortName} as="li" className="h-full">
          <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-line transition-all duration-500 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-lg hover:ring-line-strong">
            <div
              className="absolute -right-16 -top-16 size-48 rounded-full bg-accent-soft opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
              aria-hidden
            />
            <div className="relative flex items-center justify-between gap-6 border-b border-line bg-surface/60 px-7 py-6">
              <div className="flex h-14 items-center">
                <Image
                  src={c.logo.src}
                  alt={`${c.name} logo`}
                  width={c.logo.width}
                  height={c.logo.height}
                  style={{ height: Math.round(c.logoHeight * 1.15), width: "auto" }}
                  className="max-w-[220px] object-contain"
                  sizes="240px"
                />
              </div>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${c.name} (opens in a new tab)`}
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-ink ring-1 ring-line transition-all duration-300 hover:bg-accent hover:text-white hover:ring-accent"
              >
                <ArrowUpRight className="size-4" aria-hidden />
              </a>
            </div>

            <div className="relative flex flex-1 flex-col px-7 py-6">
              <h3 className="text-xl font-semibold tracking-tight">{c.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-3">
                <li className="inline-flex items-center gap-1.5">
                  <Briefcase className="size-3.5" aria-hidden /> {c.sector}
                </li>
                <li className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3.5" aria-hidden /> {c.location}
                </li>
              </ul>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-2">{c.description}</p>
              <div className="mt-auto pt-6">
                <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wider text-ink-3">Areas of support</p>
                <p className="mt-1.5 text-[0.95rem] font-medium text-ink">{c.engagement}</p>
              </div>
            </div>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
