import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cars, getCarBySlug, getCarDisplayName, getRelatedCars } from "@/content/cars";
import { copy } from "@/content/copy";
import { formatMAD } from "@/lib/format";
import { CarGallery } from "@/components/cars/CarGallery";
import { CarCard } from "@/components/cars/CarCard";
import { CarSpecs, CarStickyBar, CarWhatsApp } from "@/components/cars/CarDetailExtras";

type CarPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }: CarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return { title: copy.cars.notFound };
  const name = getCarDisplayName(car);
  return {
    title: name,
    description: `${name} — ${copy.cars.categories[car.category]}. ${formatMAD(car.pricePerDay)} ${copy.cars.perDay}. ${car.description}`,
    openGraph: {
      title: `${name} · DriveFlow`,
      description: car.description,
    },
  };
}

export default async function CarDetailPage({ params }: CarPageProps) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const name = getCarDisplayName(car);
  const related = getRelatedCars(car.slug);

  return (
    <>
      <article className="section pb-28 lg:pb-[5.5rem]">
        <div className="container-page grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-start">
          <CarGallery car={car} />
          <div>
            <p className="kicker">{copy.cars.categories[car.category]}</p>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{name}</h1>
            <p className="mt-2 text-sm text-text-secondary">
              {car.year} · {copy.cars.categories[car.category]}
            </p>
            <p className="mt-4">
              <span className="font-display text-3xl font-bold text-brand">{formatMAD(car.pricePerDay)}</span>
              <span className="text-sm text-text-secondary"> {copy.cars.perDay}</span>
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-text-secondary">{car.description}</p>
            <CarSpecs car={car} />
            <div className="mt-8 hidden flex-col gap-3 sm:flex-row lg:flex">
              <Link href={`/book?car=${car.slug}`} className="btn-primary">
                {copy.cars.bookThis}
              </Link>
              <CarWhatsApp name={name} />
            </div>
            <p className="mt-6 text-sm text-text-secondary">{copy.home.reassurance}</p>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-border bg-surface pb-28 lg:pb-16">
          <div className="container-page section">
            <h2 className="font-display text-lg font-semibold">{copy.cars.related}</h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <CarCard car={item} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CarStickyBar car={car} />
    </>
  );
}
