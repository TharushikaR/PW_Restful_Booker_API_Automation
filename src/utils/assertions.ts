import { expect, APIResponse } from '@playwright/test';
import Ajv from 'ajv';
import bookingSchema from '../schemas/booking.schema.json';
import { Booking } from '../models/booking.model';

const ajv = new Ajv({ allErrors: true });
const validateBooking = ajv.compile(bookingSchema);

export function expectBookingSchema(body: unknown) {
  const valid = validateBooking(body);
  expect(valid, JSON.stringify(validateBooking.errors)).toBe(true);
}

export async function expectStatus(res: APIResponse, status: number) {
  expect(res.status(), await res.text()).toBe(status);
}

export function expectBookingEquals(actual: Booking, expected: Booking) {
  expect(actual).toMatchObject({ ...expected });
}