import { Container, Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Section>
      <Container className="text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-4 text-display text-5xl sm:text-6xl">Page not found</h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-ink-2">
          The page you are looking for may have moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/" icon>
            Go home
          </Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </Section>
  );
}
