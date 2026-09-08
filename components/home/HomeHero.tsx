import Link from "next/link";
import { MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { getFeaturedCars, getCarDisplayName } from "@/content/cars";
import { copy } from "@/content/copy";
import { CarImage } from "@/components/cars/CarImage";
import { QuickSearch } from "@/components/home/QuickSearch";

export function HomeHero() {
  const visual = getFeaturedCars()[2] ?? getFeaturedCars()[0];

  return (
    <section className="overflow-hidden bg-linear-to-b from-background to-surface">
      <div className="container-page grid gap-10 py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:py-16">
        <div>
          <p className="text-sm text-text-secondary">{copy.home.kicker}</p>
          <h1 className="mt-2 max-w-xl whitespace-pre-line font-display text-[1.875rem] leading-[1.1] font-bold text-text-primary sm:text-5xl lg:text-[3rem]">
            {copy.home.heading}
          </h1>
          <p className="mt-4 max-w-lg text-[15px] text-white/60 sm:text-base">{copy.home.subheading}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="stat-badge">
              <MapPin size={12} aria-hidden />
              Maroc
            </span>
            <span className="stat-badge">
              <Sparkles size={12} aria-hidden />
              Demande simple
            </span>
            <span className="stat-badge">
              <ShieldCheck size={12} aria-hidden />
              Confirmation humaine
            </span>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/cars" className="btn-primary">
              {copy.home.ctaCars}
            </Link>
            <Link href="/book" className="btn-secondary">
              {copy.home.ctaBook}
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift">
          <div className="media-frame aspect-[4/3] min-h-[220px] rounded-none group lg:aspect-[5/4]">
            {visual ? (
              <CarImage
                src={visual.image}
                alt={getCarDisplayName(visual)}
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
              />
            ) : null}
            {visual ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent p-4">
                <p className="inline-block rounded-lg bg-black/40 px-1.5 py-0.5 text-[11px] font-semibold text-brand">
                  {copy.cars.categories[visual.category]}
                </p>
                <p className="mt-1 font-display text-[15px] font-semibold">{getCarDisplayName(visual)}</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="container-page pb-10 lg:pb-14">
        <QuickSearch />
      </div>
    </section>
  );
}
