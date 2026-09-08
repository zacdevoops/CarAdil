import Link from "next/link";
import { copy } from "@/content/copy";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export function FinalCta() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="container-page section">
        <div className="rounded-2xl border border-border-strong bg-background px-6 py-10 md:px-10">
          <h2 className="max-w-2xl font-display text-2xl leading-tight font-bold md:text-4xl">{copy.home.finalTitle}</h2>
          <p className="mt-4 max-w-xl text-sm text-text-secondary md:text-base">{copy.home.finalBody}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/book" className="btn-primary">
              {copy.home.finalCta}
            </Link>
            <WhatsAppButton />
          </div>
        </div>
      </div>
    </section>
  );
}
