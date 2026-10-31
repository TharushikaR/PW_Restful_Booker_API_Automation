import { test, expect } from '../../src/fixtures/api.fixture';
import { expectBookingSchema } from '../../src/utils/assertions';

test.describe('GET /booking', () => {
  test('lists booking ids @smoke', async ({ bookingClient }) => {
    const res = await bookingClient.getAll();
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
    expect(body[0]).toHaveProperty('bookingid');
  });

  test('gets a booking by id @regression', async ({ bookingClient, createdBooking }) => {
    const res = await bookingClient.getById(createdBooking.id);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ ...createdBooking.payload });
    expectBookingSchema(body);
  });

  test('filters by firstname @regression', async ({ bookingClient, createdBooking }) => {
    const res = await bookingClient.getAll({ firstname: createdBooking.payload.firstname });
    expect(res.status()).toBe(200);
    const ids = (await res.json()).map((b: { bookingid: number }) => b.bookingid);
    expect(ids).toContain(createdBooking.id);
  });

  test('non-existent id returns 404 @regression', async ({ bookingClient }) => {
    const res = await bookingClient.getById(999999999);
    expect(res.status()).toBe(404);
  });
});