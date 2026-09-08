"use client";

import { useMemo, useState } from "react";
import type { Car } from "@/content/cars";
import { cars, getCarBySlug, getCarDisplayName } from "@/content/cars";
import { copy } from "@/content/copy";
import { rentalLocations, getLocationById } from "@/content/locations";
import { bookingRequestSchema } from "@/lib/validations/booking";
import { todayISODate } from "@/lib/phone";
import { formatISODateFr, formatMAD } from "@/lib/format";
import { CarImage } from "@/components/cars/CarImage";

type BookingFormProps = {
  initialCarSlug?: string;
  initialLocationId?: string;
  initialPickup?: string;
  initialReturn?: string;
};

type FormState = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  carId: string;
  pickupLocationId: string;
  returnLocationId: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  message: string;
  website: string;
};

export function BookingForm({ initialCarSlug, initialLocationId, initialPickup, initialReturn }: BookingFormProps) {
  const minDate = todayISODate();
  const initialCar = initialCarSlug ? getCarBySlug(initialCarSlug) : undefined;

  const [values, setValues] = useState<FormState>({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    carId: initialCar?.id ?? "",
    pickupLocationId: initialLocationId && getLocationById(initialLocationId) ? initialLocationId : "",
    returnLocationId: initialLocationId && getLocationById(initialLocationId) ? initialLocationId : "",
    pickupDate: initialPickup && initialPickup >= minDate ? initialPickup : "",
    pickupTime: "10:00",
    returnDate: initialReturn && initialReturn >= minDate ? initialReturn : "",
    returnTime: "18:00",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState<"invalid" | "phase" | null>(null);

  const selectedCar: Car | undefined = useMemo(
    () => cars.find((car) => car.id === values.carId),
    [values.carId],
  );
  const pickupLocation = getLocationById(values.pickupLocationId);
  const returnLocation = getLocationById(values.returnLocationId);

  const setField = (field: keyof FormState, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const errorFor = (field: keyof FormState) => errors[field];

  return (
    <form
      className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]"
      noValidate
      onSubmit={async (event) => {
        event.preventDefault();
        setBanner(null);
        const parsed = bookingRequestSchema.safeParse({
          ...values,
          message: values.message.trim() ? values.message.trim() : undefined,
          website: values.website,
        });

        if (!parsed.success) {
          const next: Partial<Record<keyof FormState, string>> = {};
          for (const issue of parsed.error.issues) {
            const field = String(issue.path[0] ?? "") as keyof FormState;
            const mapped =
              issue.message === "past"
                ? copy.booking.errors.past
                : issue.message === "return_before_pickup"
                  ? copy.booking.errors.returnDate
                  : copy.booking.errors[field as keyof typeof copy.booking.errors] ?? copy.booking.invalidBanner;
            next[field] = mapped;
          }
          setErrors(next);
          setBanner("invalid");
          return;
        }

        setSubmitting(true);
        try {
          await fetch("/api/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(parsed.data),
          });
          setBanner("phase");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className="order-2 space-y-10 lg:order-1">
        {banner === "invalid" ? (
          <p className="rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error" role="alert">
            {copy.booking.invalidBanner}
          </p>
        ) : null}
        {banner === "phase" ? (
          <p className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-secondary" role="status">
            {copy.booking.phaseNotice}
          </p>
        ) : null}

        <fieldset>
          <legend className="font-display text-xl font-semibold">{copy.booking.groups.contact}</legend>
          <div className="mt-5 grid gap-4">
            <Field
              id="customerName"
              label={copy.booking.fields.name}
              value={values.customerName}
              error={errorFor("customerName")}
              autoComplete="name"
              onChange={(value) => setField("customerName", value)}
            />
            <Field
              id="customerPhone"
              label={copy.booking.fields.phone}
              value={values.customerPhone}
              error={errorFor("customerPhone")}
              autoComplete="tel"
              inputMode="tel"
              onChange={(value) => setField("customerPhone", value)}
            />
            <Field
              id="customerEmail"
              label={copy.booking.fields.email}
              value={values.customerEmail}
              error={errorFor("customerEmail")}
              autoComplete="email"
              type="email"
              onChange={(value) => setField("customerEmail", value)}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-xl font-semibold">{copy.booking.groups.vehicle}</legend>
          <div className="mt-5">
            <label className="field-label" htmlFor="carId">
              {copy.booking.fields.car}
            </label>
            <select
              id="carId"
              className="field"
              value={values.carId}
              aria-invalid={Boolean(errorFor("carId"))}
              aria-describedby={errorFor("carId") ? "carId-error" : undefined}
              onChange={(event) => setField("carId", event.target.value)}
            >
              <option value="">{copy.booking.fields.chooseCar}</option>
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {getCarDisplayName(car)}
                </option>
              ))}
            </select>
            {errorFor("carId") ? (
              <p id="carId-error" className="field-error">
                {errorFor("carId")}
              </p>
            ) : null}
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-xl font-semibold">{copy.booking.groups.pickup}</legend>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <SelectField
              id="pickupLocationId"
              label={copy.booking.fields.pickupLocation}
              value={values.pickupLocationId}
              error={errorFor("pickupLocationId")}
              placeholder={copy.booking.fields.chooseLocation}
              onChange={(value) => setField("pickupLocationId", value)}
              options={rentalLocations.map((location) => ({ value: location.id, label: `${location.city} — ${location.name}` }))}
            />
            <Field
              id="pickupDate"
              label={copy.booking.fields.pickupDate}
              type="date"
              min={minDate}
              value={values.pickupDate}
              error={errorFor("pickupDate")}
              onChange={(value) => setField("pickupDate", value)}
            />
            <Field
              id="pickupTime"
              label={copy.booking.fields.pickupTime}
              type="time"
              value={values.pickupTime}
              error={errorFor("pickupTime")}
              onChange={(value) => setField("pickupTime", value)}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-xl font-semibold">{copy.booking.groups.return}</legend>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <SelectField
              id="returnLocationId"
              label={copy.booking.fields.returnLocation}
              value={values.returnLocationId}
              error={errorFor("returnLocationId")}
              placeholder={copy.booking.fields.chooseLocation}
              onChange={(value) => setField("returnLocationId", value)}
              options={rentalLocations.map((location) => ({ value: location.id, label: `${location.city} — ${location.name}` }))}
            />
            <Field
              id="returnDate"
              label={copy.booking.fields.returnDate}
              type="date"
              min={values.pickupDate || minDate}
              value={values.returnDate}
              error={errorFor("returnDate")}
              onChange={(value) => setField("returnDate", value)}
            />
            <Field
              id="returnTime"
              label={copy.booking.fields.returnTime}
              type="time"
              value={values.returnTime}
              error={errorFor("returnTime")}
              onChange={(value) => setField("returnTime", value)}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-display text-xl font-semibold">{copy.booking.groups.extra}</legend>
          <div className="mt-5">
            <label className="field-label" htmlFor="message">
              {copy.booking.fields.message}
            </label>
            <textarea
              id="message"
              className="field min-h-28 py-3"
              value={values.message}
              maxLength={1000}
              onChange={(event) => setField("message", event.target.value)}
            />
            <input
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              value={values.website}
              onChange={(event) => setField("website", event.target.value)}
              aria-hidden
            />
          </div>
        </fieldset>

        <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
          {submitting ? copy.booking.submitting : copy.booking.submit}
        </button>
      </div>

      <aside className="order-1 h-fit rounded-2xl border border-border bg-surface p-5 lg:sticky lg:top-24 lg:order-2">
        <p className="kicker">{copy.booking.groups.vehicle}</p>
        {selectedCar ? (
          <>
            <div className="media-frame mt-4 aspect-[16/10]">
              <CarImage src={selectedCar.image} alt={getCarDisplayName(selectedCar)} sizes="320px" />
            </div>
            <h2 className="mt-4 font-display text-xl font-semibold">{getCarDisplayName(selectedCar)}</h2>
            <p className="mt-1 text-sm">
              <span className="font-display font-bold text-brand">{formatMAD(selectedCar.pricePerDay)}</span>
              <span className="text-text-secondary"> {copy.cars.perDay}</span>
            </p>
          </>
        ) : (
          <p className="mt-4 text-sm text-text-secondary">{copy.booking.fields.chooseCar}</p>
        )}
        <dl className="mt-5 space-y-3 text-sm">
          <div>
            <dt className="text-text-secondary">{copy.booking.fields.pickupLocation}</dt>
            <dd>{pickupLocation ? `${pickupLocation.name}, ${pickupLocation.city}` : "—"}</dd>
          </div>
          <div>
            <dt className="text-text-secondary">{copy.booking.groups.pickup}</dt>
            <dd>
              {values.pickupDate ? `${formatISODateFr(values.pickupDate)} · ${values.pickupTime}` : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-text-secondary">{copy.booking.groups.return}</dt>
            <dd>
              {returnLocation ? `${returnLocation.name}, ${returnLocation.city}` : "—"}
              {values.returnDate ? ` · ${formatISODateFr(values.returnDate)} · ${values.returnTime}` : ""}
            </dd>
          </div>
        </dl>
        <p className="mt-5 text-sm leading-relaxed text-text-secondary">{copy.booking.notice}</p>
      </aside>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  inputMode,
  min,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  inputMode?: "tel" | "email" | "text";
  min?: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={type === "date" || type === "time" ? "" : "sm:col-span-2"}>
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="field"
        type={type}
        value={value}
        min={min}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <p id={errorId} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  error,
  onChange,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="sm:col-span-2">
      <label className="field-label" htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="field"
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error ? (
        <p id={errorId} className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
