import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Check,
  FileText,
  GraduationCap,
  Landmark,
  Map,
  Presentation,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectorCards } from "@/components/sections/SectorCards";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { sectors, servicesPage } from "@/content/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description: servicesPage.hero.body,
};

const offerIcons = [Landmark, TrendingUp, FileText, Map, Smartphone, Users, GraduationCap, Presentation, BadgeCheck];

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow={servicesPage.hero.eyebrow} title={servicesPage.hero.headline} body={servicesPage.hero.body}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" icon>
            Talk to us
          </Button>
          <Button href="/team" variant="secondary">
            Meet the team
          </Button>
        </div>
      </PageHero>

      {/* What we offer */}
      <Section className="pt-6 md:pt-10 lg:pt-12">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we offer"
              title="Capabilities that span strategy, policy and delivery"
              body="A summary of the work we do most often. Every engagement is scoped to your needs."
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" as="ul">
            {servicesPage.offerSummary.map((item, i) => {
              const Icon = offerIcons[i % offerIcons.length];
              return (
                <StaggerItem key={item} as="li">
                  <div className="flex h-full items-center gap-4 rounded-[var(--radius-lg)] bg-white p-5 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="font-sans font-semibold leading-snug text-ink">{item}</span>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </Section>

      {/* Who we serve */}
      <Section tone="surface">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Who we serve"
              title="Specialized support for three sectors"
              body="Pick your sector to see how we help, or read on for the full list of services."
            />
          </Reveal>
          <div className="mt-12">
            <SectorCards />
          </div>
        </Container>
      </Section>

      {/* Per-sector detail */}
      {sectors.map((s, idx) => {
        const flip = idx % 2 === 1;
        return (
          <Section key={s.slug} id={s.slug} className={cn(idx > 0 && "hairline")}>
            <Container>
              <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={cn("lg:col-span-5", flip && "lg:order-last")} y={32}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-xl)] shadow-lg lg:sticky lg:top-28 lg:aspect-[4/5]">
                    <Image
                      src={s.image.src}
                      alt={s.image.alt}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </Reveal>
                <div className="lg:col-span-7">
                  <Reveal>
                    <Eyebrow>{s.shortTitle}</Eyebrow>
                    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">{s.title}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-ink-2">{s.intro}</p>
                  </Reveal>
                  {s.bullets && (
                    <ul className="mt-6 space-y-3">
                      {s.bullets.map((b, i) => (
                        <Reveal
                          key={b}
                          as="li"
                          delay={0.1 + i * 0.08}
                          className="rounded-2xl bg-surface px-5 py-4 text-ink-2 ring-1 ring-line"
                        >
                          {b}
                        </Reveal>
                      ))}
                    </ul>
                  )}
                  <Stagger className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2" as="ul">
                    {s.services.map((svc) => (
                      <StaggerItem key={svc} as="li" className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                          <Check className="size-3.5" strokeWidth={3} aria-hidden />
                        </span>
                        <span className="text-[0.95rem] leading-relaxed text-ink">{svc}</span>
                      </StaggerItem>
                    ))}
                  </Stagger>
                  <Reveal delay={0.2}>
                    <div className="mt-9">
                      <Button href={`/services/${s.slug}`} variant="secondary" icon>
                        Explore {s.shortTitle}
                      </Button>
                    </div>
                  </Reveal>
                </div>
              </div>
            </Container>
          </Section>
        );
      })}

      {/* Note */}
      <Section tone="surface" padded={false} className="py-12 md:py-16">
        <Container>
          <Reveal>
            <p className="mx-auto max-w-2xl text-center text-lg text-ink-2">
              {servicesPage.note.replace(/contact us\.?$/i, "")}
              <Link href="/contact" className="font-semibold text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent">
                contact us
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
