import type { BookingRequestInput } from "@/lib/validations/booking";

export type CreateBookingRequest = (input: BookingRequestInput) => Promise<{ id: string }>;

export const createBookingRequest: CreateBookingRequest = async () => {
  throw new Error("La persistance des demandes sera branchée en Phase 4.");
};
