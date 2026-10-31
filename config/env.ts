import 'dotenv/config';
import dotenv from 'dotenv';

export const env = {
  baseUrl: process.env.BASE_URL ?? 'https://restful-booker.herokuapp.com',
  username: process.env.API_USERNAME ?? '',
  password: process.env.API_PASSWORD ?? '',
};