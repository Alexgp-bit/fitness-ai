import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'fitness_ai_session';

function sign(value: string) {
  const secret = process.env.SESSION_SECRET || 'dev-secret';
  return crypto.createHmac('sha256', secret).update(value).digest('hex');
}

export function createSessionValue() {
  const payload = `user:${Date.now()}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidSession(value?: string | null) {
  if (!value) return false;
  const [payload, signature] = value.split('.');
  if (!payload || !signature) return false;
  return sign(payload) === signature;
}

export function requirePassword(password: string) {
  const expected = process.env.APP_LOGIN_PASSWORD || 'demo1234';
  return password === expected;
}

export function setLoginCookie() {
  cookies().set(COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 14,
  });
}

export function clearLoginCookie() {
  cookies().delete(COOKIE_NAME);
}

export function isLoggedIn() {
  const value = cookies().get(COOKIE_NAME)?.value;
  return isValidSession(value);
}
