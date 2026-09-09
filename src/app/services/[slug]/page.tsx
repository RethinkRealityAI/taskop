import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { sectors, servicesPage } from "@/content/site";

type Params = { slug: string };

/** Only the three known sectors exist; anything else is a 404 at build time. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) return { title: "Service not found" };
  return {
    title: sector.title,
    description: `${sector.intro} ${sector.services.slice(0, 3).join(", ")} and more.`,
  };
}

export default async function SectorPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) notFound();

  const others = sectors.filter((s) => s.slug !== sector.slug);

  return (
    <>
      <PageHero eyebrow="Services" title={sector.title} body={sector.intro} image={sector.image}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" icon>
            Talk to us
          </Button>
          <Button href="/services" variant="secondary">
            All services
          </Button>
        </div>
      </PageHero>

      {/* Bullets as large statements */}
      {sector.bullets && (
        <Section tone="surface">
          <Container>
            <Reveal>
              <SectionHeading eyebrow="Our role" title="Where we add the most value" />
            </Reveal>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {sector.bullets.map((b, i) => (
                <Reveal key={b} delay={0.1 + i * 0.1}>
                  <div className="flex h-full flex-col rounded-[var(--radius-lg)] bg-white p-7 ring-1 ring-line md:p-9">
                    <span className="text-display text-4xl text-accent/80">{String(i + 1).padStart(2, "0")}</span>
                    <p className="mt-6 text-xl leading-snug tracking-[-0.01em] text-ink md:text-2xl">{b}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Services grid */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we do"
              title={`${sector.services.length} ways we support ${sector.shortTitle.toLowerCase()}`}
              body="Each service can stand alone or combine into a broader program. Tell us what you need and we will shape the scope around it."
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" as="ol">
            {sector.services.map((svc, i) => (
              <StaggerItem key={svc} as="li">
                <div className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] bg-white p-6 ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-md">
                  <div
                    className="absolute -right-10 -top-10 size-36 rounded-full bg-accent-soft opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span className="relative font-sans text-sm font-semibold tabular-nums text-ink-3 transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-5 text-lg font-semibold leading-snug tracking-tight">{svc}</h3>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Other sectors */}
      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Other sectors" title="We also work with" />
          </Reveal>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2" as="ul">
            {others.map((o) => (
              <StaggerItem key={o.slug} as="li">
                <Link
                  href={`/services/${o.slug}`}
                  className="group flex h-full items-center gap-5 overflow-hidden rounded-[var(--radius-lg)] bg-white p-4 ring-1 ring-line transition-all duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-lg hover:ring-line-strong sm:p-5"
                >
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl sm:size-28">
                    <Image
                      src={o.image.src}
                      alt=""
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{o.title}</h3>
                    <p className="mt-1 font-sans text-xs font-semibold uppercase tracking-wider text-ink-3">
                      {o.services.length} services
                    </p>
                  </div>
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-surface text-ink transition-all duration-300 group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Need something else? */}
      <Section padded={false} className="py-16 md:py-20">
        <Container>
          <Reveal>
            <div className="flex flex-col gap-6 rounded-[var(--radius-xl)] bg-accent-soft px-7 py-9 md:flex-row md:items-center md:justify-between md:px-12 md:py-12">
              <div className="max-w-xl">
                <h2 className="text-2xl sm:text-3xl">Need something else?</h2>
                <p className="mt-3 text-ink-2">{servicesPage.note}</p>
              </div>
              <Button href="/contact" icon className="shrink-0">
                Get in touch
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
