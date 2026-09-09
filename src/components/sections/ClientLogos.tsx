import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { clients } from "@/content/site";

/**
 * "Trusted by" logo strip. Marks render in grayscale and lift to full colour on hover,
 * so four very different brand palettes still read as one calm row.
 */
export function ClientLogos({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="border-y border-line bg-white py-10 md:py-12" aria-labelledby="clients-heading">
      <Container>
        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <Reveal className="shrink-0 text-center lg:max-w-[200px] lg:text-left">
            <p id="clients-heading" className="font-sans text-sm font-semibold text-ink">
              Trusted by organizations across health, non-profit and business
            </p>
            {showLink && (
              <Link
                href="/clients"
                className="mt-2 inline-flex items-center gap-1 text-sm text-ink-2 underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Meet our clients <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            )}
          </Reveal>

          <Stagger as="ul" className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:flex-nowrap lg:justify-end lg:gap-x-10" amount={0.3}>
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
                    className="max-w-[180px] object-contain transition-transform duration-500 group-hover:-translate-y-0.5 sm:max-w-[200px]"
                    sizes="220px"
                  />
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
