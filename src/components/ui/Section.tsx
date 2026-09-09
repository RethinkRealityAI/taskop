import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
  tone?: "default" | "surface" | "dark";
  padded?: boolean;
  as?: "section" | "div";
};

export function Section({ id, className, children, tone = "default", padded = true, as = "section" }: SectionProps) {
  const Tag = as;
  return (
    <Tag
      id={id}
      className={cn(
        "relative",
        padded && "py-20 md:py-28 lg:py-32",
        tone === "surface" && "bg-surface",
        tone === "dark" && "bg-navy-deep text-white",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("container-x", className)}>{children}</div>;
}

export function Eyebrow({ children, className, dark }: { children: React.ReactNode; className?: string; dark?: boolean }) {
  return (
    <span
      className={cn(
        "eyebrow inline-flex items-center gap-2",
        dark ? "text-white/70" : "text-ink-2",
        className,
      )}
    >
      <span className={cn("inline-block size-1.5 rounded-full", dark ? "bg-sky" : "bg-accent")} aria-hidden />
      {children}
    </span>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
  size?: "md" | "lg";
};

export function SectionHeading({ eyebrow, title, body, align = "left", dark, className, size = "md" }: HeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <div className="mb-4">
          <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        </div>
      )}
      <h2
        className={cn(
          size === "lg"
            ? "text-4xl sm:text-5xl lg:text-[3.5rem]"
            : "text-3xl sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {body && (
        <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/70" : "text-ink-2")}>{body}</p>
      )}
    </div>
  );
}
