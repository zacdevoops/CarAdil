import Link from "next/link";
import { copy } from "@/content/copy";
import { getFeaturedLocations } from "@/content/locations";

export function HomeLocations() {
  const locations = getFeaturedLocations();

  return (
    <section className="section">
      <div className="container-page">
        <h2 className="font-display text-lg font-semibold md:text-2xl">{copy.home.locationsTitle}</h2>
        <p className="mt-2 max-w-xl text-sm text-text-secondary">{copy.home.locationsIntro}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <li key={location.id}>
              <Link
                href={`/book?location=${location.id}`}
                className="flex min-h-20 flex-col justify-center rounded-2xl border border-border bg-surface px-5 py-4 transition-colors hover:border-border-strong"
              >
                <span className="text-[11px] font-semibold tracking-wide text-brand uppercase">{location.city}</span>
                <span className="mt-1 font-display text-base font-semibold">{location.name}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/book" className="btn-secondary mt-8">
          {copy.home.locationsCta}
        </Link>
      </div>
    </section>
  );
}
