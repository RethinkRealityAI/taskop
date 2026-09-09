import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Values } from "@/components/sections/Values";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container, Section, SectionHeading, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { about, site, team } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.legalName} is a niche consultancy with a global perspective, serving health institutions, pharmaceuticals, corporations and non-profits with efficiency, innovation and a client-driven, result-focused approach.`,
};

const avatarGradients = [
  "linear-gradient(135deg, var(--navy) 0%, var(--accent) 60%, var(--sky) 100%)",
  "linear-gradient(200deg, var(--navy) 0%, var(--accent) 55%, var(--sky) 100%)",
  "linear-gradient(60deg, var(--navy) 0%, var(--accent) 50%, var(--sky) 100%)",
];

export default function AboutPage() {
  const leaders = team.slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={about.hero.eyebrow}
        title={about.hero.headline}
        body={about.hero.body}
        image={{ src: "/images/about.jpg", alt: "TaskOp senior partner leading a client round-table" }}
      />

      {/* Mission pull-quote */}
      <Section tone="surface">
        <Container>
          <Reveal>
            <figure className="mx-auto max-w-4xl text-center">
              <div>
                <Eyebrow className="justify-center">{about.mission.eyebrow}</Eyebrow>
                <blockquote className="mt-6">
                  <p className="text-3xl leading-[1.15] tracking-[-0.025em] text-ink sm:text-4xl lg:text-[3rem]">
                    &ldquo;{about.mission.headline}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ink-2">
                  {about.mission.body}
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our values"
              title="What we stand for"
              body="Four principles guide every engagement, from first conversation to final deliverable."
            />
          </Reveal>
          <div className="mt-12">
            <Values />
          </div>
        </Container>
      </Section>

      {/* Approach split (image on the right) */}
      <Section tone="surface">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:pr-8">
              <Reveal>
                <SectionHeading
                  eyebrow={about.approach.eyebrow}
                  title={about.approach.headline}
                  body={about.approach.body}
                />
              </Reveal>
              <ol className="mt-8 space-y-4">
                {about.approach.points.map((p, i) => (
                  <Reveal key={p} delay={0.1 + i * 0.08} as="li" className="flex items-start gap-4">
                    <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft font-sans text-xs font-bold text-accent">
                      {i + 1}
                    </span>
                    <span className="text-ink-2">{p}</span>
                  </Reveal>
                ))}
              </ol>
              <Reveal delay={0.35}>
                <div className="mt-9">
                  <Button href="/services" icon>
                    See our services
                  </Button>
                </div>
              </Reveal>
            </div>
            <Reveal className="lg:order-last lg:col-span-5" y={32}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] shadow-lg">
                <Image
                  src="/images/sector-nonprofit.jpg"
                  alt="TaskOp consultants working alongside a client team in a planning workshop"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/90 p-4 backdrop-blur">
                  <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wider text-ink-3">Your call</p>
                  <p className="mt-1 text-sm font-medium text-ink">
                    Work with us independently, or integrate our team with yours.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Leadership teaser */}
      <Section>
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Leadership"
                title="Led by people who have done the work"
                body="Sector leaders, researchers and operators who stay accessible every step of the way."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Button href="/team" variant="secondary" icon>
                Meet the full team
              </Button>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-3" as="ul">
            {leaders.map((m, i) => (
              <StaggerItem key={m.name} as="li">
                <div className="group flex h-full items-center gap-5 rounded-[var(--radius-lg)] bg-white p-5 ring-1 ring-line transition-all duration-500 ease-[var(--ease-out)] hover:-translate-y-1 hover:shadow-md sm:flex-col sm:items-start sm:p-6">
                  <span
                    className="relative inline-flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-white shadow-sm sm:size-20"
                    style={{ backgroundImage: avatarGradients[i % avatarGradients.length] }}
                    aria-hidden
                  >
                    <span className="bg-dots-light absolute inset-0 opacity-60" />
                    <span className="text-display relative text-xl sm:text-2xl">{m.initials}</span>
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight sm:mt-1">{m.name}</h3>
                    <p className="mt-1 text-sm text-ink-2">{m.role}</p>
                  </div>
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
