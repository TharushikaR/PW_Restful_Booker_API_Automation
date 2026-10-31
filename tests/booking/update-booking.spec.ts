import { test, expect } from '../../src/fixtures/api.fixture';
import { BookingBuilder } from '../../src/builders/booking.builder';

test.describe('PUT /booking/:id', () => {
  test('updates a booking with a valid token @regression', async ({ bookingClient, createdBooking }) => {
    const updated = new BookingBuilder().withFirstname('Updated').withTotalPrice(999).build();
    const res = await bookingClient.update(createdBooking.id, updated);

    expect(res.status()).toBe(200);
    expect(await res.json()).toMatchObject(updated);

    const check = await bookingClient.getById(createdBooking.id);
    expect(await check.json()).toMatchObject(updated);
  });

  test('rejects update without auth @regression', async ({ bookingClient, createdBooking }) => {
    const res = await bookingClient.update(createdBooking.id, new BookingBuilder().build(), false);
    expect(res.status()).toBe(403); // verify against the docs
  });
});