import { z } from "zod";
import { cars } from "@/content/cars";
import { rentalLocations } from "@/content/locations";
import { isValidMoroccanPhone, todayISODate } from "@/lib/phone";

const carIds = cars.map((car) => car.id) as [string, ...string[]];
const locationIds = rentalLocations.map((location) => location.id) as [string, ...string[]];

export const bookingRequestSchema = z
  .object({
    customerName: z.string().trim().min(2).max(120),
    customerPhone: z
      .string()
      .trim()
      .min(8)
      .refine(isValidMoroccanPhone, { message: "customerPhone" }),
    customerEmail: z.email(),
    carId: z.enum(carIds),
    pickupLocationId: z.enum(locationIds),
    returnLocationId: z.enum(locationIds),
    pickupDate: z.string().date(),
    pickupTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    returnDate: z.string().date(),
    returnTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
    message: z.string().trim().max(1000).optional(),
    website: z.string().max(0).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.pickupDate < todayISODate()) {
      ctx.addIssue({ code: "custom", message: "past", path: ["pickupDate"] });
    }

    const pickup = new Date(`${value.pickupDate}T${value.pickupTime}:00`);
    const dropoff = new Date(`${value.returnDate}T${value.returnTime}:00`);

    if (Number.isNaN(pickup.getTime()) || Number.isNaN(dropoff.getTime())) {
      ctx.addIssue({ code: "custom", message: "invalid_datetime", path: ["pickupDate"] });
      return;
    }

    if (dropoff <= pickup) {
      ctx.addIssue({ code: "custom", message: "return_before_pickup", path: ["returnDate"] });
    }
  });

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;

