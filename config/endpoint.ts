export const ENDPOINTS = {
  ping: '/ping',
  auth: '/auth',
  booking: '/booking',
  bookingById: (id: number | string) => `/booking/${id}`,
} as const;