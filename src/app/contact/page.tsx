import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { Container, Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { faqs, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Tell TaskOp Global Consulting about your project or program. We typically reply within two business days.",
};

const steps = [
  { title: "We read your brief", body: "Every message is read by a partner, not a queue." },
  { title: "A short discovery call", body: "Thirty minutes to understand your goals and constraints." },
  { title: "A tailored proposal", body: "A clear scope, timeline and team, shaped to your needs." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's start a conversation"
        body="Tell us about your project or program. We typically reply within two business days."
        compact
      />

      <Section className="pt-4 md:pt-6 lg:pt-8">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            {/* Details */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="group flex items-start gap-4 rounded-[var(--radius-lg)] bg-white p-5 ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <Mail className="size-5" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-3">Email</span>
                      <span className="mt-1 block font-sans text-sm font-semibold text-ink underline-offset-4 [overflow-wrap:anywhere] group-hover:underline sm:text-base">
                        {site.email}
                      </span>
                    </span>
                  </a>
                  <address className="flex items-start gap-4 rounded-[var(--radius-lg)] bg-white p-5 not-italic ring-1 ring-line">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                      <MapPin className="size-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block font-sans text-xs font-semibold uppercase tracking-wider text-ink-3">Mailing address</span>
                      <span className="mt-1 block font-sans font-semibold text-ink">{site.address.line1}</span>
                      <span className="block text-ink-2">
                        {site.address.line2}, {site.address.country}
                      </span>
                    </span>
                  </address>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div className="mt-8 rounded-[var(--radius-lg)] bg-surface p-6 md:p-7">
                  <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-ink-2">What to expect</h2>
                  <ol className="mt-5 space-y-5">
                    {steps.map((s, i) => (
                      <li key={s.title} className="flex items-start gap-4">
                        <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-white font-sans text-xs font-bold text-accent ring-1 ring-line">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-sans font-semibold text-ink">{s.title}</p>
                          <p className="mt-0.5 text-sm text-ink-2">{s.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <Reveal className="lg:col-span-7" delay={0.15}>
              <div className="rounded-[var(--radius-xl)] bg-white p-6 ring-1 ring-line md:p-10">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* FAQ teaser */}
      <Section tone="surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal>
                <SectionHeading
                  eyebrow="FAQ"
                  title="Before you write"
                  body="A few of the questions we hear most often."
                />
              </Reveal>
            </div>
            <Reveal className="lg:col-span-8" delay={0.1}>
              <Faq items={faqs.slice(0, 3)} />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
