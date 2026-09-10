"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "motion/react";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SplitWords } from "@/components/ui/Reveal";
import { home, sectors } from "@/content/site";

// Three.js is loaded only on the client, after the page is interactive.
const Globe3D = dynamic(() => import("@/components/ui/Globe3D").then((m) => m.Globe3D), { ssr: false });

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay },
});

export function Hero() {
  const { scrollY } = useScroll();
  // Parallax offsets; MotionConfig reducedMotion="user" neutralises transforms for users who opt out.
  const imgY = useTransform(scrollY, [0, 600], [0, 60]);
  const globeY = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 lg:pt-20">
      <div
        className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.14),transparent)] blur-2xl"
        aria-hidden
      />
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <motion.div {...fade(0)}>
              <Eyebrow>{home.hero.eyebrow}</Eyebrow>
            </motion.div>
            <h1 className="mt-6 text-display text-[2.85rem] sm:text-6xl lg:text-[4.75rem] xl:text-[5.25rem]">
              <SplitWords text={home.hero.headline} delay={0.1} />
            </h1>
            <motion.p {...fade(0.45)} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-2 md:text-xl">
              {home.hero.subhead}
            </motion.p>
            <motion.div {...fade(0.55)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href={home.hero.primaryCta.href} size="lg" icon>
                {home.hero.primaryCta.label}
              </Button>
              <Button href={home.hero.secondaryCta.href} size="lg" variant="secondary">
                {home.hero.secondaryCta.label}
              </Button>
            </motion.div>
            <motion.ul {...fade(0.7)} className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-3">
              {sectors.map((s, i) => (
                <li key={s.slug} className="inline-flex items-center gap-2">
                  <span
                    className={["size-1.5 rounded-full bg-accent", "size-1.5 rounded-full bg-sky", "size-1.5 rounded-full bg-[#4f46e5]"][i % 3]}
                    aria-hidden
                  />
                  {s.title}
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="relative lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              style={{ y: imgY }}
              className="relative"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] shadow-lg">
                <Image
                  src="/images/hero.jpg"
                  alt="TaskOp consultants reviewing a strategy document with a client"
                  fill
                  priority
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/30 via-transparent to-transparent" />
              </div>

              {/* Floating particle Earth, overlapping the photo's bottom-right corner. */}
              <motion.div
                style={{ y: globeY }}
                className="animate-float pointer-events-none absolute -bottom-14 -right-10 hidden size-56 sm:block md:-right-16 md:size-72 lg:-bottom-20 lg:-right-24 lg:size-80"
              >
                <div
                  className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(37,99,235,0.22),rgba(37,99,235,0.06)_60%,transparent_72%)] blur-xl"
                  aria-hidden
                />
                <Globe3D className="absolute inset-0" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="glass-strong glass-sheen absolute -right-3 top-8 hidden rounded-2xl p-4 ring-1 ring-white/60 md:block lg:-right-8"
              >
                <p className="font-sans text-[0.7rem] font-semibold uppercase tracking-wider text-accent">Since {2020}</p>
                <p className="mt-1 text-2xl font-semibold tracking-tight text-navy">Client-driven.</p>
                <p className="text-2xl font-semibold tracking-tight text-accent">Result-focused.</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
