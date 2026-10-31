import { test, expect } from '../../src/fixtures/api.fixture';
import { env } from '../../config/env';

test.describe('Auth', () => {
  test('valid credentials return a token @smoke', async ({ authClient }) => {
    const res = await authClient.login({ username: env.username, password: env.password });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('invalid credentials do not return a token @regression', async ({ authClient }) => {
    const res = await authClient.login({ username: 'wrong', password: 'wrong' });
    const body = await res.json();
    expect(body.token).toBeUndefined();
    // I believe the API returns 200 with a "reason" field here; verify in the docs.
    expect(body.reason).toBeDefined();
  });
});