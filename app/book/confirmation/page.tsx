import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { copy } from "@/content/copy";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  title: copy.booking.confirmationTitle,
  description: copy.booking.confirmationBody,
  robots: { index: false, follow: false },
};

export default function BookingConfirmationPage() {
  return (
    <section className="section">
      <div className="container-page max-w-2xl">
        <CircleCheck className="text-success" size={40} aria-hidden />
        <h1 className="mt-6 font-display text-3xl font-bold md:text-5xl">{copy.booking.confirmationHeading}</h1>
        <p className="mt-4 text-lg text-text-secondary">{copy.booking.confirmationBody}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link href="/" className="btn-primary">
            {copy.booking.backHome}
          </Link>
          <Link href="/cars" className="btn-secondary">
            {copy.booking.viewCars}
          </Link>
          <WhatsAppButton />
        </div>
      </div>
    </section>
  );
}
