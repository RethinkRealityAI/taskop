import Link from "next/link";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { NewsletterForm } from "@/components/sections/NewsletterForm";
import { nav, sectors, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-auto border-t border-line bg-white">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-6 max-w-sm text-ink-2">
              {site.legalName} blends sector leadership with a global perspective to guide clients through
              customized solutions specific to their needs.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-ink-2">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden />
                <span>
                  {site.address.line1}, {site.address.line2}, {site.address.country}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-ink-3" aria-hidden />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="font-sans text-sm font-semibold text-ink">Company</h3>
              <ul className="mt-4 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-ink-2 transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-sans text-sm font-semibold text-ink">Who we serve</h3>
              <ul className="mt-4 space-y-3">
                {sectors.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="text-sm text-ink-2 transition-colors hover:text-ink">
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h3 className="font-sans text-sm font-semibold text-ink">Newsletter</h3>
              <p className="mt-4 text-sm text-ink-2">Occasional updates on health, policy and organizational strategy.</p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-8 text-sm text-ink-3 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.foundedYear}–{year} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/contact" className="inline-flex items-center gap-1 transition-colors hover:text-ink">
              Start a project <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
            <a href="#main" className="transition-colors hover:text-ink">
              Back to top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
