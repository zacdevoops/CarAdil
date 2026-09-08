"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { copy } from "@/content/copy";
import { getFeaturedLocations } from "@/content/locations";
import { todayISODate } from "@/lib/phone";

export function QuickSearch() {
  const router = useRouter();
  const locations = getFeaturedLocations();
  const minDate = todayISODate();
  const [pickup, setPickup] = useState(minDate);
  const [dropoff, setDropoff] = useState("");
  const [location, setLocation] = useState(locations[0]?.id ?? "");

  const returnMin = useMemo(() => pickup || minDate, [pickup, minDate]);

  return (
    <form
      className="grid gap-3 rounded-2xl border border-border-strong bg-surface p-4 shadow-lift md:grid-cols-4 md:items-end md:p-5"
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (location) params.set("location", location);
        if (pickup) params.set("pickup", pickup);
        if (dropoff) params.set("return", dropoff);
        router.push(`/cars?${params.toString()}`);
      }}
    >
      <p className="flex items-center gap-2 text-sm text-text-secondary md:col-span-4">
        <Search size={16} className="text-brand" aria-hidden />
        {copy.home.searchHint}
      </p>
      <div>
        <label className="field-label" htmlFor="quick-location">
          {copy.home.searchPickup}
        </label>
        <select id="quick-location" className="field" value={location} onChange={(event) => setLocation(event.target.value)}>
          {locations.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="field-label" htmlFor="quick-pickup">
          {copy.home.searchStart}
        </label>
        <input
          id="quick-pickup"
          type="date"
          className="field"
          min={minDate}
          value={pickup}
          onChange={(event) => setPickup(event.target.value)}
          required
        />
      </div>
      <div>
        <label className="field-label" htmlFor="quick-return">
          {copy.home.searchEnd}
        </label>
        <input
          id="quick-return"
          type="date"
          className="field"
          min={returnMin}
          value={dropoff}
          onChange={(event) => setDropoff(event.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn-primary w-full">
        {copy.home.searchCta}
      </button>
    </form>
  );
}
