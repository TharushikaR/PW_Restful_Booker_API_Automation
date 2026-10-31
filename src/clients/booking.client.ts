import { APIRequestContext, APIResponse } from '@playwright/test';
import { BaseClient } from './base.client';
import { ENDPOINTS } from '../../config/endpoint';
import { Booking } from '../models/booking.model';

export class BookingClient extends BaseClient {
  constructor(request: APIRequestContext, private readonly token: string) {
    super(request);
  }

  private authHeaders() {
    return { Cookie: `token=${this.token}` };
  }

  async ping(): Promise<APIResponse> {
    return this.request.get(ENDPOINTS.ping);
  }

  async getAll(query?: Record<string, string>): Promise<APIResponse> {
    const res = await this.request.get(ENDPOINTS.booking, { params: query });
    this.log('GET', ENDPOINTS.booking, res);
    return res;
  }

  async getById(id: number | string): Promise<APIResponse> {
    const res = await this.request.get(ENDPOINTS.bookingById(id));
    this.log('GET', ENDPOINTS.bookingById(id), res);
    return res;
  }

  async create(payload: Booking): Promise<APIResponse> {
    const res = await this.request.post(ENDPOINTS.booking, { data: payload });
    this.log('POST', ENDPOINTS.booking, res);
    return res;
  }

  async update(id: number | string, payload: Booking, withAuth = true): Promise<APIResponse> {
    const res = await this.request.put(ENDPOINTS.bookingById(id), {
      data: payload,
      headers: withAuth ? this.authHeaders() : {},
    });
    this.log('PUT', ENDPOINTS.bookingById(id), res);
    return res;
  }

  async patch(id: number | string, payload: Partial<Booking>, withAuth = true): Promise<APIResponse> {
    const res = await this.request.patch(ENDPOINTS.bookingById(id), {
      data: payload,
      headers: withAuth ? this.authHeaders() : {},
    });
    this.log('PATCH', ENDPOINTS.bookingById(id), res);
    return res;
  }

  async delete(id: number | string, withAuth = true): Promise<APIResponse> {
    const res = await this.request.delete(ENDPOINTS.bookingById(id), {
      headers: withAuth ? this.authHeaders() : {},
    });
    this.log('DELETE', ENDPOINTS.bookingById(id), res);
    return res;
  }
}