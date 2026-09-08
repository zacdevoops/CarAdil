import Link from "next/link";
import { getFeaturedCars, getCarDisplayName, type Car } from "@/content/cars";
import { copy } from "@/content/copy";
import { formatMAD } from "@/lib/format";
import { CarImage } from "@/components/cars/CarImage";

export function FeaturedCars() {
  const featured = getFeaturedCars().slice(0, 4);

  return (
    <section className="border-y border-border bg-background">
      <div className="container-page section">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-display text-lg font-semibold">{copy.home.featuredTitle}</p>
            <p className="mt-1 max-w-xl text-sm text-text-secondary">{copy.home.featuredIntro}</p>
          </div>
          <Link href="/cars" className="text-sm font-medium text-brand hover:text-brand-hover">
            {copy.home.ctaCars}
          </Link>
        </div>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((car, index) => (
            <li key={car.id}>
              <FeaturedCard car={car} priority={index < 2} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function FeaturedCard({ car, priority }: { car: Car; priority?: boolean }) {
  const name = getCarDisplayName(car);

  return (
    <Link
      href={`/cars/${car.slug}`}
      className="group relative block h-[180px] overflow-hidden rounded-2xl shadow-lift sm:h-[200px]"
    >
      <CarImage src={car.image} alt={name} priority={priority} sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw" />
      <span className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" aria-hidden />
      <span className="absolute inset-x-4 bottom-4">
        <span className="inline-block rounded-lg bg-black/40 px-1.5 py-0.5 text-[11px] font-semibold text-brand">
          {copy.cars.categories[car.category]}
        </span>
        <span className="mt-1 block font-display text-[15px] font-semibold">{name}</span>
        <span className="block text-sm text-white/80">
          {formatMAD(car.pricePerDay)} {copy.cars.perDay}
        </span>
      </span>
    </Link>
  );
}
