import Image from "next/image";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cta } from "@/content/site";

export function CtaBanner() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] bg-navy-deep text-white">
            <Image
              src="/images/cta.jpg"
              alt=""
              fill
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="object-cover opacity-40 mix-blend-luminosity"
            />
            <div
              className="absolute inset-0 bg-[radial-gradient(90%_120%_at_10%_0%,rgba(37,99,235,0.55),transparent_60%),linear-gradient(180deg,rgba(14,17,64,0.2),rgba(14,17,64,0.9))]"
              aria-hidden
            />
            <div className="bg-dots-light absolute inset-0 opacity-40" aria-hidden />
            <div className="relative grid gap-10 px-8 py-14 md:grid-cols-12 md:px-14 md:py-20 lg:px-20">
              <div className="md:col-span-8">
                <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem]">{cta.headline}</h2>
                <p className="mt-5 max-w-xl text-lg text-white/75">{cta.body}</p>
              </div>
              <div className="flex flex-col gap-3 md:col-span-4 md:items-end md:justify-center">
                <Button href={cta.primary.href} variant="inverse" size="lg" icon className="w-full md:w-auto">
                  {cta.primary.label}
                </Button>
                <a
                  href={cta.secondary.href}
                  className="text-center text-sm text-white/70 underline-offset-4 transition-colors hover:text-white hover:underline md:text-right"
                >
                  {cta.secondary.label}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
