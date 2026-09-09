import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-3", className)} aria-label={`${site.name} home`}>
      <span className="relative block size-9 overflow-hidden rounded-xl bg-white ring-1 ring-line shadow-sm transition-transform duration-300 group-hover:rotate-[-6deg]">
        <Image src="/images/logo-mark.png" alt="" width={36} height={36} className="size-9 object-contain p-[3px]" priority />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-sans text-[0.95rem] font-bold tracking-tight", dark ? "text-white" : "text-ink")}>
          TaskOp
        </span>
        <span className={cn("font-sans text-[0.65rem] font-medium uppercase tracking-[0.14em]", dark ? "text-white/60" : "text-ink-3")}>
          Global Consulting
        </span>
      </span>
    </Link>
  );
}
