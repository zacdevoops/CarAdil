import { copy } from "@/content/copy";

export function WhyDriveFlow() {
  return (
    <section className="section">
      <div className="container-page">
        <h2 className="max-w-xl font-display text-lg font-semibold md:text-2xl">{copy.home.whyTitle}</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {copy.home.whyItems.map((item) => (
            <li key={item.title} className="rounded-2xl border border-border bg-surface p-5">
              <h3 className="font-display text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
