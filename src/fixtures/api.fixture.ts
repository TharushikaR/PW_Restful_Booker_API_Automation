import { test as base, expect } from '@playwright/test';
import { AuthClient } from '../clients/auth.client';
import { BookingClient } from '../clients/booking.client';
import { BookingBuilder } from '../builders/booking.builder';
import { Booking, CreateBookingResponse } from '../models/booking.model';
import { env } from '../../config/env';

type Fixtures = {
  authClient: AuthClient;
  authToken: string;
  bookingClient: BookingClient;
  createdBooking: { id: number; payload: Booking };
};

export const test = base.extend<Fixtures>({
  authClient: async ({ request }, use) => {
    await use(new AuthClient(request));
  },

  authToken: async ({ authClient }, use) => {
    const token = await authClient.getToken({
      username: env.username,
      password: env.password,
    });
    await use(token);
  },

  bookingClient: async ({ request, authToken }, use) => {
    await use(new BookingClient(request, authToken));
  },

  // Creates a booking before the test and deletes it afterwards
  createdBooking: async ({ bookingClient }, use) => {
    const payload = new BookingBuilder().build();
    const res = await bookingClient.create(payload);
    expect(res.ok()).toBeTruthy();
    const body = (await res.json()) as CreateBookingResponse;

    await use({ id: body.bookingid, payload });

    await bookingClient.delete(body.bookingid); // cleanup; ignore result
  },
});

export { expect };