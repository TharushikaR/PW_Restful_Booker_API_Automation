import { APIResponse } from '@playwright/test';
import { BaseClient } from './base.client';
import { ENDPOINTS } from '../../config/endpoint';
import { AuthRequest, AuthResponse } from '../models/auth.model';

export class AuthClient extends BaseClient {
  async login(credentials: AuthRequest): Promise<APIResponse> {
    const res = await this.request.post(ENDPOINTS.auth, { data: credentials });
    this.log('POST', ENDPOINTS.auth, res);
    return res;
  }

  async getToken(credentials: AuthRequest): Promise<string> {
    const res = await this.login(credentials);
    const body = (await res.json()) as AuthResponse;
    if (!body.token) {
      throw new Error(`Auth failed: ${JSON.stringify(body)}`);
    }
    return body.token;
  }
}