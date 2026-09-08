import type { Metadata } from "next";
import { cars } from "@/content/cars";
import { copy } from "@/content/copy";
import { CarsCatalog } from "@/components/cars/CarsCatalog";

export const metadata: Metadata = {
  title: copy.cars.heading,
  description: copy.cars.intro,
};

export default function CarsPage() {
  return (
    <section className="section">
      <div className="container-page">
        <p className="kicker">{copy.cars.title}</p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold md:text-5xl">{copy.cars.heading}</h1>
        <p className="mt-4 max-w-2xl text-text-secondary">{copy.cars.intro}</p>
        <CarsCatalog cars={cars} />
      </div>
    </section>
  );
}
