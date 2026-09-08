import Link from "next/link";
import { copy } from "@/content/copy";
import { siteConfig } from "@/content/site";
import { getServiceAreaCities } from "@/content/locations";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export function Footer() {
  const year = new Date().getFullYear();
  const cities = getServiceAreaCities();

  return (
    <footer id="contact" className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto grid max-w-container gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <p className="font-display text-2xl font-semibold text-text-primary">{copy.brand.name}</p>
          <p className="mt-2 max-w-xs text-sm text-text-secondary">{copy.brand.tagline}</p>
          <p className="mt-4 text-sm text-text-secondary">{siteConfig.contact.hours}</p>
        </div>
        <div>
          <p className="kicker">{copy.nav.primary}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/" className="text-text-secondary hover:text-brand">
                {copy.nav.home}
              </Link>
            </li>
            <li>
              <Link href="/cars" className="text-text-secondary hover:text-brand">
                {copy.nav.cars}
              </Link>
            </li>
            <li>
              <Link href="/book" className="text-text-secondary hover:text-brand">
                {copy.nav.book}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="kicker">{copy.footer.serviceArea}</p>
          <p className="mt-3 text-sm text-text-secondary">{cities.join(" · ")}</p>
          <p className="mt-4 text-sm">
            <a href={`mailto:${siteConfig.email}`} className="text-text-secondary hover:text-brand">
              {siteConfig.email}
            </a>
          </p>
          <p className="mt-1 text-sm text-text-secondary">{siteConfig.phone}</p>
          <div className="mt-4">
            <WhatsAppButton />
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-container flex-col gap-2 px-4 py-4 text-xs text-text-secondary md:flex-row md:items-center md:justify-between md:px-6">
          <p>
            © {year} {siteConfig.name}. {copy.footer.rights}
          </p>
          <p>
            {copy.footer.legal} · {copy.footer.privacy} — {copy.footer.placeholderLegal}
          </p>
        </div>
      </div>
    </footer>
  );
}
