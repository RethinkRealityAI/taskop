"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Floating "glass pill" navigation, modeled on the Framer consulting template
 * but sticky with a blur so the CTA stays reachable while scrolling.
 */
export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 pt-3 md:pt-4">
      <div className="container-x">
        <div
          className={cn(
            "flex h-16 items-center justify-between rounded-full pl-4 pr-2 transition-all duration-500 ease-[var(--ease-out)]",
            scrolled || open
              ? "bg-white/80 shadow-[0_10px_40px_-15px_rgba(11,15,26,0.25)] ring-1 ring-line backdrop-blur-xl"
              : "bg-white/55 ring-1 ring-line/60 backdrop-blur-md",
          )}
        >
          <Logo />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-full px-4 py-2 font-sans text-[0.925rem] font-medium transition-colors duration-200",
                        active ? "text-ink" : "text-ink-2 hover:text-ink",
                      )}
                    >
                      {item.label}
                      {active && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-surface-strong/70"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full px-3 py-2 font-sans text-[0.9rem] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {site.email}
            </a>
            <Button href="/contact" size="sm" icon>
              Get in touch
            </Button>
          </div>

          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-ink text-white transition-colors hover:bg-accent lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[84px] z-40 bg-bg lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              className="container-x flex h-full flex-col pt-4 pb-10"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{ show: { transition: { staggerChildren: 0.05 } }, hidden: {} }}
            >
              <ul className="flex flex-col">
                {[{ label: "Home", href: "/" }, ...nav].map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    className="border-b border-line"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-5 text-2xl font-semibold tracking-tight text-ink"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className="mt-auto flex flex-col gap-3"
              >
                <Button href="/contact" size="lg" icon className="w-full" onClick={() => setOpen(false)}>
                  Get in touch
                </Button>
                <a href={`mailto:${site.email}`} className="text-center text-ink-2">
                  {site.email}
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
