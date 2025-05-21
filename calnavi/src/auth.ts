import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  exp: number;
  iat: number;
  role: string;
  sub: string;
}

export function getToken(): string | null {
  return sessionStorage.getItem("token");
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwtDecode<DecodedToken>(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export function getTokenRemainingTime(token: string): number {
  const decoded = decodeToken(token);
  if (!decoded) return 0;
  const currentTime = Date.now() / 1000;
  return decoded.exp - currentTime;
}