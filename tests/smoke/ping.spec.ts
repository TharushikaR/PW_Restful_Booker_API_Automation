import { test, expect } from '../../src/fixtures/api.fixture';

test.describe('Health check', () => {
  test('GET /ping responds @smoke', async ({ bookingClient }) => {
    const res = await bookingClient.ping();
    expect(res.status()).toBe(201); // verify: I believe /ping returns 201 Created
  });
});