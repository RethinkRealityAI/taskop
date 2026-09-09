import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectorCards } from "@/components/sections/SectorCards";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { clientsPage, servicesPage } from "@/content/site";

export const metadata: Metadata = {
  title: "Our Clients",
  description: clientsPage.hero.body,
};

export default function ClientsPage() {
  const testimonial = clientsPage.testimonials[0];

  return (
    <>
      <PageHero eyebrow={clientsPage.hero.eyebrow} title={clientsPage.hero.headline} body={clientsPage.hero.body} />

      {/* Client types */}
      <Section className="pt-6 md:pt-10 lg:pt-12">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Who we work with"
                title="Three sectors, one standard of service"
                body="From self-employed professionals to large enterprises, in Canada and around the world."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Button href="/services" variant="secondary" icon>
                All services
              </Button>
            </Reveal>
          </div>
          <div className="mt-12">
            <SectorCards showCount={false} />
          </div>
        </Container>
      </Section>

      {/* Help + testimonial */}
      <Section tone="dark" className="overflow-hidden">
        <div
          className="bg-dots-light pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]"
          aria-hidden
        />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeading dark eyebrow="Our promise" title={clientsPage.help.headline} body={clientsPage.help.body} />
                <div className="mt-8">
                  <Button href="/contact" variant="inverse" icon>
                    Start a conversation
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-7" delay={0.15}>
              <figure className="relative h-full overflow-hidden rounded-[var(--radius-xl)] bg-white/5 p-8 ring-1 ring-white/10 md:p-12">
                <span
                  className="text-display pointer-events-none absolute -top-6 left-6 text-[8rem] leading-none text-sky/30 md:-top-8 md:text-[11rem]"
                  aria-hidden
                >
                  &ldquo;
                </span>
                <blockquote className="relative pt-8">
                  <p className="text-2xl leading-snug tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.35rem] lg:leading-[1.15]">
                    {testimonial.quote}
                  </p>
                </blockquote>
                <figcaption className="relative mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                  <span className="inline-block h-10 w-1 rounded-full bg-sky" aria-hidden />
                  <div>
                    <p className="font-sans font-semibold text-white">{testimonial.author}</p>
                    <p className="text-sm text-white/60">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* What we can help with */}
      <Section>
        <Container>
          <Reveal>
            <Eyebrow>Capabilities</Eyebrow>
            <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-[2.75rem]">What we can help with</h2>
              <p className="max-w-md text-ink-2">
                A starting point, not a ceiling. If you need something that is not listed, we will scope it with you.
              </p>
            </div>
          </Reveal>
          <Stagger className="mt-12 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3" as="ul">
            {servicesPage.offerSummary.map((item) => (
              <StaggerItem key={item} as="li">
                <div className="flex h-full items-start gap-3 rounded-2xl bg-white px-5 py-4 ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">
                  <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <span className="font-sans font-medium text-ink">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
