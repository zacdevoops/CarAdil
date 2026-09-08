"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { copy } from "@/content/copy";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: copy.nav.home, match: (path: string) => path === "/" },
  { href: "/cars", label: copy.nav.cars, match: (path: string) => path.startsWith("/cars") },
  { href: "/#comment-ca-marche", label: copy.nav.howItWorks, match: () => false },
  { href: "/#contact", label: copy.nav.contact, match: () => false },
] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/95 backdrop-blur-md">
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-surface focus:px-3 focus:py-2 focus:text-sm"
      >
        {copy.header.skipToContent}
      </a>
      <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-4 py-3.5 md:px-6">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight text-text-primary">
          {copy.brand.name}
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={copy.nav.primary}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
              aria-current={link.match(pathname) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/book" className="btn-primary hidden sm:inline-flex">
            {copy.nav.book}
          </Link>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-border bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
            <span className="sr-only">{open ? copy.nav.closeMenu : copy.nav.openMenu}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={cn(open ? "border-t border-border bg-surface lg:hidden" : "hidden")}
      >
        <nav className="mx-auto flex max-w-container flex-col gap-1 px-4 py-4" aria-label={copy.nav.primary}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="min-h-11 rounded-xl px-3 py-3 text-base text-text-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/book" className="btn-primary mt-2" onClick={() => setOpen(false)}>
            {copy.nav.book}
          </Link>
        </nav>
      </div>
    </header>
  );
}
