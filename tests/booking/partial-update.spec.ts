import { test, expect } from '../../src/fixtures/api.fixture';

test.describe('PATCH /booking/:id', () => {
  test('partially updates names @regression', async ({ bookingClient, createdBooking }) => {
    const res = await bookingClient.patch(createdBooking.id, {
      firstname: 'Patched',
      lastname: 'Name',
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.firstname).toBe('Patched');
    expect(body.lastname).toBe('Name');
    expect(body.totalprice).toBe(createdBooking.payload.totalprice); // untouched
  });

  test('rejects patch without auth @regression', async ({ bookingClient, createdBooking }) => {
    const res = await bookingClient.patch(createdBooking.id, { firstname: 'X' }, false);
    expect(res.status()).toBe(403); // verify against the docs
  });
});