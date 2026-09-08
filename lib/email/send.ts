export type BookingEmailPayload = {
  adminEmail: string;
  customerEmail: string;
};

export async function sendBookingEmails(): Promise<never> {
  throw new Error("L’envoi d’emails Resend sera branché en Phase 4.");
}
