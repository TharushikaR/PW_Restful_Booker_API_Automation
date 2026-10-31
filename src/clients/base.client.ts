import { APIRequestContext, APIResponse } from '@playwright/test';

export abstract class BaseClient {
  constructor(protected readonly request: APIRequestContext) {}

  protected log(method: string, url: string, res: APIResponse) {
    if (process.env.API_LOG === 'true') {
      console.log(`[API] ${method} ${url} -> ${res.status()}`);
    }
  }
}