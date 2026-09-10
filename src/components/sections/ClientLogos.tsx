import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { clients } from "@/content/site";

/**
 * "Trusted by" logo strip. Marks render in grayscale and lift to full colour on hover,
 * so several very different brand palettes still read as one calm row. The row stays a
 * static wrapping grid rather than a marquee: every client is readable and clickable at once.
 */
export function ClientLogos({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="border-y border-line bg-white py-10 md:py-14" aria-labelledby="clients-heading">
      <Container>
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <p id="clients-heading" className="font-sans text-sm font-semibold text-ink">
            Trusted by organizations across government, health, non-profit and business
          </p>
          {showLink && (
            <Link
              href="/clients"
              className="inline-flex items-center gap-1 text-sm text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
            >
              Meet our clients <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          )}
        </Reveal>

        <Stagger
          as="ul"
          className="mt-9 flex flex-wrap items-center justify-center gap-x-9 gap-y-8 sm:gap-x-12 md:mt-10"
          amount={0.2}
        >
          {clients.map((c) => (
            <StaggerItem key={c.shortName} as="li">
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="group block opacity-70 grayscale transition-all duration-500 ease-[var(--ease-out)] hover:opacity-100 hover:grayscale-0 focus-visible:opacity-100 focus-visible:grayscale-0"
                aria-label={`${c.name} (opens in a new tab)`}
              >
                <Image
                  src={c.logo.src}
                  alt={c.name}
                  width={c.logo.width}
                  height={c.logo.height}
                  style={{ height: c.logoHeight, width: "auto" }}
                  className="max-w-[150px] object-contain transition-transform duration-500 group-hover:-translate-y-0.5 sm:max-w-[190px]"
                  sizes="200px"
                />
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}
