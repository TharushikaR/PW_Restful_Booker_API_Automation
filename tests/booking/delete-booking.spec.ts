import { test, expect } from '../../src/fixtures/api.fixture';
import { BookingBuilder } from '../../src/builders/booking.builder';
import { CreateBookingResponse } from '../../src/models/booking.model';

test.describe('DELETE /booking/:id', () => {
  test('deletes a booking @regression', async ({ bookingClient }) => {
    const created = (await (await bookingClient.create(new BookingBuilder().build())).json()) as CreateBookingResponse;

    const res = await bookingClient.delete(created.bookingid);
    // I believe this API returns 201 on delete (a known quirk); verify.
    expect(res.status()).toBe(201);

    const after = await bookingClient.getById(created.bookingid);
    expect(after.status()).toBe(404);
  });

  test('rejects delete without auth @regression', async ({ bookingClient, createdBooking }) => {
    const res = await bookingClient.delete(createdBooking.id, false);
    expect(res.status()).toBe(403); // verify against the docs
  });
});