import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { sectors } from "@/content/site";

/** Three "who we serve" cards with image, title, service count and hover lift. */
export function SectorCards({ showCount = true }: { showCount?: boolean }) {
  return (
    <Stagger className="grid gap-5 md:grid-cols-3" as="ul">
      {sectors.map((s) => (
        <StaggerItem key={s.slug} as="li" className="h-full">
          <Link
            href={`/services/${s.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white ring-1 ring-line transition-all duration-500 ease-[var(--ease-out)] hover:-translate-y-1.5 hover:shadow-lg hover:ring-line-strong"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={s.image.src}
                alt={s.image.alt}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold tracking-tight text-navy">{s.title}</h3>
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-[0.95rem] text-ink-2">{s.intro}</p>
              {showCount && (
                <p className="mt-auto pt-5 font-sans text-xs font-semibold uppercase tracking-wider text-accent">
                  {s.services.length} services
                </p>
              )}
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
