import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-semibold font-sans tracking-[-0.01em] transition-all duration-300 ease-[var(--ease-out)] will-change-transform active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  // Brand navy with a slight vertical gradient for depth; brightens to accent blue on hover.
  primary:
    "bg-[linear-gradient(180deg,var(--navy)_0%,var(--navy-deep)_100%)] text-white shadow-[0_6px_20px_-10px_rgba(14,17,64,0.7)] hover:bg-[linear-gradient(180deg,var(--accent)_0%,var(--accent-hover)_100%)] hover:shadow-[0_14px_34px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-0.5",
  secondary:
    "bg-white text-navy ring-1 ring-line-strong hover:ring-accent hover:text-accent hover:-translate-y-0.5 hover:shadow-md",
  ghost: "text-navy hover:bg-accent-soft hover:text-accent",
  inverse:
    "bg-white text-navy hover:bg-accent hover:text-white hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgba(37,99,235,0.55)]",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

type Props = {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  icon?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  icon = false,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden
        />
      )}
    </>
  );

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
