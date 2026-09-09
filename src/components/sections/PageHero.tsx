import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/Section";
import { Reveal, SplitWords } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  body?: string;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
  compact?: boolean;
};

/** Inner-page hero: eyebrow, large headline, intro copy, optional image on the right. */
export function PageHero({ eyebrow, title, body, image, children, compact }: Props) {
  return (
    <section className={cn("relative overflow-hidden", compact ? "pt-12 pb-10 md:pt-16 md:pb-14" : "pt-14 pb-16 md:pt-24 md:pb-24")}>
      <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" aria-hidden />
      <Container>
        <div className={cn("grid items-center gap-12", image && "lg:grid-cols-12")}>
          <div className={cn(image ? "lg:col-span-7" : "max-w-4xl")}>
            <Reveal>
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
            <h1 className="mt-5 text-display text-[2.6rem] sm:text-6xl lg:text-7xl">
              <SplitWords text={title} delay={0.1} />
            </h1>
            {body && (
              <Reveal delay={0.35}>
                <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-2 md:text-xl">{body}</p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={0.45}>
                <div className="mt-9">{children}</div>
              </Reveal>
            )}
          </div>
          {image && (
            <Reveal delay={0.25} className="lg:col-span-5" y={32}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] shadow-lg lg:aspect-[3/4]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
