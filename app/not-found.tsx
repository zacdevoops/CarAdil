import Link from "next/link";
import { copy } from "@/content/copy";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page">
        <h1 className="font-display text-3xl font-bold">{copy.cars.notFound}</h1>
        <Link href="/cars" className="btn-primary mt-6">
          {copy.cars.title}
        </Link>
      </div>
    </section>
  );
}
