import { test, expect } from '../../src/fixtures/api.fixture';
import { BookingBuilder } from '../../src/builders/booking.builder';
import { CreateBookingResponse } from '../../src/models/booking.model';
import { expectBookingSchema } from '../../src/utils/assertions';
import invalidBookings from '../../test-data/invalid-bookings.json';

test.describe('POST /booking', () => {
  test('creates a booking @smoke @regression', async ({ bookingClient }) => {
    const payload = new BookingBuilder().build();
    const res = await bookingClient.create(payload);

    expect(res.status()).toBe(200);
    const body = (await res.json()) as CreateBookingResponse;
    expect(body.bookingid).toBeGreaterThan(0);
    expect(body.booking).toMatchObject({ ...payload });
    expectBookingSchema(body.booking);

    await bookingClient.delete(body.bookingid); // cleanup
  });

  for (const { name, payload } of invalidBookings) {
    test(`validates payload behavior: ${name} @regression`, async ({ bookingClient }) => {
      const res = await bookingClient.create(payload as never);

      if (name === 'totalprice as numeric string (accepted by API)') {
        expect(res.ok()).toBeTruthy();
        return;
      }

      // Other invalid payloads should still be rejected by the API.
      expect(res.ok()).toBeFalsy();
    });
  }
});