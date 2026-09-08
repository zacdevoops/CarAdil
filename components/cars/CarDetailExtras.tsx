import Link from "next/link";
import { Fuel, Gauge, Luggage, Snowflake, Users, CarFront } from "lucide-react";
import type { Car } from "@/content/cars";
import { getCarDisplayName } from "@/content/cars";
import { copy } from "@/content/copy";
import { formatMAD } from "@/lib/format";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export function CarStickyBar({ car }: { car: Car }) {
  const name = getCarDisplayName(car);

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-container items-center justify-between gap-3 pr-28">
        <p>
          <span className="block text-[11px] text-text-secondary">{name}</span>
          <span className="font-display text-xl font-bold text-brand">{formatMAD(car.pricePerDay)}</span>
          <span className="text-[11px] text-text-secondary"> {copy.cars.perDay}</span>
        </p>
        <Link href={`/book?car=${car.slug}`} className="btn-primary">
          {copy.cars.stickyBook}
        </Link>
      </div>
    </div>
  );
}

export function CarSpecs({ car }: { car: Car }) {
  const items = [
    { icon: Users, label: `${car.seats} ${copy.cars.specs.seats}` },
    { icon: Gauge, label: copy.cars.transmission[car.transmission] },
    { icon: Fuel, label: car.fuel },
    car.airConditioning ? { icon: Snowflake, label: copy.cars.specs.ac } : null,
    car.doors ? { icon: CarFront, label: `${car.doors} ${copy.cars.specs.doors}` } : null,
    car.luggage ? { icon: Luggage, label: `${car.luggage} ${copy.cars.specs.luggage}` } : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  return (
    <ul className="mt-6 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item.label} className="spec-chip">
          <item.icon size={16} aria-hidden />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function CarWhatsApp({ name }: { name: string }) {
  return <WhatsAppButton message={copy.whatsapp.carMessage(name)} />;
}
