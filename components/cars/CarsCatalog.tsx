"use client";

import { useMemo, useState } from "react";
import type { Car, CarCategory, Transmission } from "@/content/cars";
import { copy } from "@/content/copy";
import { CarCard } from "@/components/cars/CarCard";

type Sort = "default" | "price-asc" | "price-desc";

export function CarsCatalog({ cars }: { cars: Car[] }) {
  const [category, setCategory] = useState<CarCategory | "all">("all");
  const [transmission, setTransmission] = useState<Transmission | "all">("all");
  const [seats, setSeats] = useState<"all" | "4" | "5">("all");
  const [sort, setSort] = useState<Sort>("default");

  const filtered = useMemo(() => {
    let next = cars.filter((car) => {
      if (category !== "all" && car.category !== category) return false;
      if (transmission !== "all" && car.transmission !== transmission) return false;
      if (seats !== "all" && car.seats !== Number(seats)) return false;
      return true;
    });
    if (sort === "price-asc") next = [...next].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === "price-desc") next = [...next].sort((a, b) => b.pricePerDay - a.pricePerDay);
    return next;
  }, [cars, category, transmission, seats, sort]);

  const reset = () => {
    setCategory("all");
    setTransmission("all");
    setSeats("all");
    setSort("default");
  };

  const categories: Array<CarCategory | "all"> = ["all", ...(Object.keys(copy.cars.categories) as CarCategory[])];

  return (
    <div>
      <div className="mt-8 flex gap-2 overflow-x-auto pb-1" role="group" aria-label={copy.cars.category}>
        {categories.map((key) => (
          <button
            key={key}
            type="button"
            className="chip shrink-0"
            aria-pressed={category === key}
            onClick={() => setCategory(key)}
          >
            {key === "all" ? copy.cars.allCategories : copy.cars.categories[key]}
          </button>
        ))}
      </div>

      <form
        className="mt-4 grid gap-3 rounded-2xl border border-border bg-surface p-4 sm:grid-cols-2 lg:grid-cols-4"
        onSubmit={(event) => event.preventDefault()}
        aria-label={copy.cars.filters}
      >
        <div>
          <label className="field-label" htmlFor="filter-transmission">
            {copy.cars.transmission.label}
          </label>
          <select
            id="filter-transmission"
            className="field"
            value={transmission}
            onChange={(event) => setTransmission(event.target.value as Transmission | "all")}
          >
            <option value="all">{copy.cars.transmission.all}</option>
            <option value="automatic">{copy.cars.transmission.automatic}</option>
            <option value="manual">{copy.cars.transmission.manual}</option>
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="filter-seats">
            {copy.cars.seats}
          </label>
          <select id="filter-seats" className="field" value={seats} onChange={(event) => setSeats(event.target.value as "all" | "4" | "5")}>
            <option value="all">{copy.cars.allSeats}</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="sm:col-span-2 lg:col-span-2">
          <label className="field-label" htmlFor="filter-sort">
            {copy.cars.sort}
          </label>
          <select id="filter-sort" className="field" value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
            <option value="default">{copy.cars.sortDefault}</option>
            <option value="price-asc">{copy.cars.sortPriceAsc}</option>
            <option value="price-desc">{copy.cars.sortPriceDesc}</option>
          </select>
        </div>
      </form>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-12 text-center">
          <p className="text-text-secondary">{copy.cars.empty}</p>
          <button type="button" className="btn-primary mt-5" onClick={reset}>
            {copy.cars.reset}
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((car) => (
            <li key={car.id}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
