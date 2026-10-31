export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  reason?: string; // returned on bad credentials, as far as I know
}