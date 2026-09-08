import type { Metadata } from "next";
import { copy } from "@/content/copy";
import { BookingForm } from "@/components/booking/BookingForm";

type BookPageProps = {
  searchParams: Promise<{
    car?: string | string[];
    location?: string | string[];
    pickup?: string | string[];
    return?: string | string[];
  }>;
};

export const metadata: Metadata = {
  title: copy.booking.title,
  description: copy.booking.intro,
};

function first(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BookPage({ searchParams }: BookPageProps) {
  const params = await searchParams;

  return (
    <section className="section">
      <div className="container-page">
        <p className="kicker">{copy.booking.title}</p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-bold md:text-5xl">{copy.booking.heading}</h1>
        <p className="mt-4 max-w-2xl text-text-secondary">{copy.booking.intro}</p>
        <div className="mt-10">
          <BookingForm
            initialCarSlug={first(params.car)}
            initialLocationId={first(params.location)}
            initialPickup={first(params.pickup)}
            initialReturn={first(params.return)}
          />
        </div>
      </div>
    </section>
  );
}
