import Link from "next/link";
import { copy } from "@/content/copy";

export function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="border-y border-border bg-surface">
      <div className="container-page section">
        <h2 className="font-display text-lg font-semibold md:text-2xl">{copy.home.howTitle}</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {copy.home.steps.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-border bg-background p-5">
              <p className="font-display text-2xl font-bold text-brand">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-display text-base font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{step.body}</p>
            </li>
          ))}
        </ol>
        <Link href="/book" className="btn-primary mt-8">
          {copy.home.howCta}
        </Link>
      </div>
    </section>
  );
}
