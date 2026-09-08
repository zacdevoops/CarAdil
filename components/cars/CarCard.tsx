import Link from "next/link";
import { Fuel, Gauge, Users } from "lucide-react";
import type { Car } from "@/content/cars";
import { getCarDisplayName } from "@/content/cars";
import { copy } from "@/content/copy";
import { formatMAD } from "@/lib/format";
import { CarImage } from "@/components/cars/CarImage";

type CarCardProps = {
  car: Car;
  priority?: boolean;
};

export function CarCard({ car, priority }: CarCardProps) {
  const name = getCarDisplayName(car);

  return (
    <article className="car-card group">
      <Link href={`/cars/${car.slug}`} className="relative block aspect-[16/10]" aria-label={name}>
        <CarImage src={car.image} alt={name} priority={priority} />
        <span className="absolute top-3 left-3 rounded-lg bg-black/40 px-1.5 py-0.5 text-[11px] font-semibold text-brand">
          {copy.cars.categories[car.category]}
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-[15px] leading-tight font-semibold">
            <Link href={`/cars/${car.slug}`} className="hover:text-brand">
              {name}
            </Link>
          </h3>
          <span className="text-[11px] text-text-secondary">{car.year}</span>
        </div>
        <ul className="mt-3 flex flex-wrap gap-2">
          <li className="spec-chip">
            <Users size={14} aria-hidden />
            {car.seats} {copy.cars.specs.seats}
          </li>
          <li className="spec-chip">
            <Gauge size={14} aria-hidden />
            {copy.cars.transmission[car.transmission]}
          </li>
          <li className="spec-chip">
            <Fuel size={14} aria-hidden />
            {car.fuel}
          </li>
        </ul>
        <div className="mt-4 flex items-end justify-between gap-3">
          <p>
            <span className="font-display text-lg font-bold text-brand">{formatMAD(car.pricePerDay)}</span>
            <span className="text-[11px] text-text-secondary"> {copy.cars.perDay}</span>
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/cars/${car.slug}`} className="btn-secondary min-h-11 px-4 text-sm">
            {copy.cars.viewDetails}
          </Link>
          <Link href={`/book?car=${car.slug}`} className="btn-primary min-h-11 px-4 text-sm">
            {copy.cars.bookNow}
          </Link>
        </div>
      </div>
    </article>
  );
}
