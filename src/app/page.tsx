import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { SectorCards } from "@/components/sections/SectorCards";
import { Stats } from "@/components/sections/Stats";
import { Process } from "@/components/sections/Process";
import { Values } from "@/components/sections/Values";
import { Faq } from "@/components/sections/Faq";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { about, faqs, home } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogos />

      {/* Intro / welcome */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{home.intro.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[2.75rem]">{home.intro.headline}</h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={0.1}>
                <p className="text-lg leading-relaxed text-ink-2 md:text-xl">{home.intro.body}</p>
                <div className="mt-8">
                  <Button href="/about" variant="secondary" icon>
                    More about TaskOp
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
          <div className="mt-16 md:mt-20">
            <Stats />
          </div>
        </Container>
      </Section>

      <Marquee />

      {/* Who we serve */}
      <Section tone="surface">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Who we serve"
                title="Specialized support for three sectors"
                body="Our diverse clientele shares one common trait: they expect results. Pick your sector to see how we help."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Button href="/services" variant="secondary" icon>
                All services
              </Button>
            </Reveal>
          </div>
          <div className="mt-12">
            <SectorCards />
          </div>
        </Container>
      </Section>

      {/* Mission split */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5" y={32}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] shadow-lg">
                <Image
                  src="/images/about.jpg"
                  alt="A TaskOp senior partner leading a client round-table"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="glass-strong glass-sheen absolute bottom-5 left-5 right-5 rounded-2xl p-4 ring-1 ring-white/60">
                  <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wider text-accent">Our mission</p>
                  <p className="mt-1 text-sm font-medium text-navy">&ldquo;{about.mission.headline}&rdquo;</p>
                </div>
              </div>
            </Reveal>
            <div className="lg:col-span-7 lg:pl-8">
              <Reveal>
                <SectionHeading
                  eyebrow={about.approach.eyebrow}
                  title={about.approach.headline}
                  body={about.approach.body}
                />
              </Reveal>
              <ul className="mt-8 space-y-4">
                {about.approach.points.map((p, i) => (
                  <Reveal key={p} delay={0.1 + i * 0.08} as="li" className="flex items-start gap-4">
                    <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft font-sans text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="text-ink-2">{p}</span>
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={0.35}>
                <div className="mt-9">
                  <Button href="/about" icon>
                    Our approach
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="dark" className="overflow-hidden">
        <div className="bg-dots-light pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]" aria-hidden />
        <Container className="relative">
          <Reveal>
            <SectionHeading
              dark
              eyebrow="How we work"
              title="A simple, accountable way of working"
              body="From first conversation to final deliverable, we keep things clear, hands-on and focused on outcomes."
              align="center"
            />
          </Reveal>
          <div className="mt-14">
            <Process />
          </div>
          <div className="mt-6">
            <Values dark />
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionHeading
                  eyebrow="FAQ"
                  title="Questions, answered"
                  body="Still curious? We're one email away."
                />
                <div className="mt-6">
                  <Button href="/contact" variant="secondary" icon>
                    Ask us anything
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-8" delay={0.1}>
              <Faq items={faqs} />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
