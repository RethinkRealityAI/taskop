import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Values } from "@/components/sections/Values";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { team, type TeamMember } from "@/content/site";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the TaskOp team: advisers and hands-on contractors who bring sector leadership, research rigour and operational discipline to every engagement.",
};

/** Vary the gradient angle per member so the placeholder avatars don't read as identical. */
const angles = [135, 200, 60, 320, 160];

function Avatar({ member, index }: { member: TeamMember; index: number }) {
  if (member.image) {
    return (
      <Image
        src={member.image}
        alt={`Portrait of ${member.name}`}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
      />
    );
  }
  const angle = angles[index % angles.length];
  return (
    <div
      className="absolute inset-0 flex items-center justify-center text-white"
      style={{ backgroundImage: `linear-gradient(${angle}deg, var(--navy) 0%, var(--accent) 55%, var(--sky) 100%)` }}
      aria-hidden
    >
      <div className="bg-dots-light absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(14,17,64,0.45),transparent)]" />
      <span className="text-display relative text-7xl transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.06] sm:text-8xl">
        {member.initials}
      </span>
    </div>
  );
}

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Our team"
        title="The people behind TaskOp"
        body="Advisers and hands-on contractors, easily accessible every step of the way. Our consultants bring sector leadership, research rigour and operational discipline to every engagement."
        compact
      />

      {/* Team grid */}
      <Section className="pt-4 md:pt-6 lg:pt-8">
        <Container>
          <Stagger className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" as="ul">
            {team.map((m, i) => (
              <StaggerItem key={m.name} as="li">
                <article className="group">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] ring-1 ring-line shadow-sm transition-all duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1.5 group-hover:shadow-lg">
                    <Avatar member={m} index={i} />
                  </div>
                  <h2 className="mt-5 text-xl font-semibold tracking-tight">{m.name}</h2>
                  <p className="mt-1 text-ink-2">{m.role}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* Work with us */}
      <Section tone="surface">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Join us"
                title="Want to work with TaskOp?"
                body="We partner with specialists across health, policy and business. If your expertise fits, we'd love to hear from you."
              />
            </Reveal>
            <Reveal delay={0.1}>
              <Button href="/contact" icon>
                Get in touch
              </Button>
            </Reveal>
          </div>
          <div className="mt-12">
            <Values />
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}
