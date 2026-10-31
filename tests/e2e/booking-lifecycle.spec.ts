import { test, expect } from '../../src/fixtures/api.fixture';
import { BookingBuilder } from '../../src/builders/booking.builder';
import { CreateBookingResponse } from '../../src/models/booking.model';

test('booking lifecycle: create → get → update → patch → delete @regression', async ({ bookingClient }) => {
  const payload = new BookingBuilder().build();

  // Create
  const created = (await (await bookingClient.create(payload)).json()) as CreateBookingResponse;
  const id = created.bookingid;

  // Get
  const got = await bookingClient.getById(id);
  expect(got.status()).toBe(200);
  expect(await got.json()).toMatchObject(payload as unknown as Record<string, unknown>);

  // Update
  const updated = new BookingBuilder().withFirstname('Lifecycle').build();
  expect((await bookingClient.update(id, updated)).status()).toBe(200);

  // Patch
  const patched = await bookingClient.patch(id, { lastname: 'Patched' });
  expect((await patched.json()).lastname).toBe('Patched');

  // Delete
  expect((await bookingClient.delete(id)).ok()).toBeTruthy();
  expect((await bookingClient.getById(id)).status()).toBe(404);
});