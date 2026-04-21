import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import {
  handlerGetItem,
  handlerSetItem,
  handlerRemoveItem,
  HARDCODED_EMAIL,
  HARDCODED_PASSWORD,
  ONE_HOUR_MS,
  Keys,
} from '@constants';

export interface AuthPayload {
  email: string;
  exp: number;
}

interface AuthResponse {
  email: string;
  token: string;
}

// MARK: Base64 Encode
const b64url = (input: string): string =>
  Base64.stringify(Utf8.parse(input))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

// MARK: Base64 Decode
const b64urlDecode = (input: string): string => {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = padded.length % 4;
  const padded2 = pad ? padded + '='.repeat(4 - pad) : padded;
  return Utf8.stringify(Base64.parse(padded2));
};

const signJwt = (payload: AuthPayload, secret: string): string => {
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = b64url(JSON.stringify(payload));
  const signingInput = `${header}.${body}`;
  const sig = Base64.stringify(HmacSHA256(signingInput, secret))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return `${signingInput}.${sig}`;
};

const verifyJwt = (token: string, secret: string): AuthPayload => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const [header, body, sig] = parts;
  const signingInput = `${header}.${body}`;

  const expectedSig = Base64.stringify(HmacSHA256(signingInput, secret))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  if (sig !== expectedSig) {
    throw new Error('Invalid token signature');
  }

  const payload = JSON.parse(b64urlDecode(body)) as AuthPayload;

  if (payload.exp * 1000 < Date.now()) {
    throw new Error('Token expired');
  }

  return payload;
};

export const useAuth = () => {
  const login = async (
    email: string,
    password: string,
  ): Promise<{ status: boolean; values: AuthResponse; message: string }> => {
    if (email !== HARDCODED_EMAIL || password !== HARDCODED_PASSWORD) {
      throw new Error('Invalid email or password');
    }

    const payload: AuthPayload = {
      email,
      exp: Math.floor((Date.now() + ONE_HOUR_MS) / 1000),
    };

    const token = signJwt(payload, Keys.JWT_SECRET);
    await handlerSetItem(Keys.AUTH_TOKEN, token);

    return {
      status: true,
      values: {
        email,
        token,
      },
      message: 'Success login',
    };
  };

  const logout = async (): Promise<void> => {
    await handlerRemoveItem(Keys.AUTH_TOKEN);
  };

  const getValidToken = async (): Promise<AuthPayload | null> => {
    const token = handlerGetItem(Keys.AUTH_TOKEN);
    if (!token) {
      return null;
    }

    try {
      return verifyJwt(token, Keys.JWT_SECRET);
    } catch {
      await handlerRemoveItem(Keys.AUTH_TOKEN);
      return null;
    }
  };

  return { login, logout, getValidToken };
};
