import { siteConfig } from "@/content/site";
import { copy } from "@/content/copy";
import { getWhatsAppUrl } from "@/lib/utils";

type WhatsAppButtonProps = {
  className?: string;
  floating?: boolean;
  message?: string;
};

export function WhatsAppButton({ className, floating = false, message }: WhatsAppButtonProps) {
  const href = getWhatsAppUrl(siteConfig.whatsappNumber, message ?? copy.whatsapp.defaultMessage);
  const label = floating ? copy.whatsapp.floatingLabel : copy.whatsapp.label;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        className ??
        (floating
          ? "fixed right-4 bottom-24 z-40 inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#00bf90] px-4 text-sm font-semibold text-brand-ink shadow-lift transition-opacity hover:opacity-90 lg:right-6 lg:bottom-6"
          : "inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-4 text-sm font-medium text-text-primary hover:border-border-strong")
      }
      aria-label={label}
    >
      {label}
    </a>
  );
}
