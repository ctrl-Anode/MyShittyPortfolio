import RedisStore from 'rate-limit-redis';
import rateLimit from 'express-rate-limit';
import { redis } from '../lib/redis.js';
import { config } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

function store(prefix = 'rl:') {
  return new RedisStore({
    sendCommand: (...args) => redis.call(...args),
    prefix
  });
}

function build(max, message, prefix) {
  if (config.isTest || process.env.VITEST) {
    return (_req, _res, next) => next();
  }

  return rateLimit({
    windowMs: config.RATE_LIMIT_WINDOW_MS,
    limit: max,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    store: store(prefix),
    passOnStoreError: true,
    handler: () => {
      throw ApiError.tooManyRequests(message);
    }
  });
}

export const apiLimiter = build(config.RATE_LIMIT_MAX, 'Too many requests, please slow down.');

const authLimiter = (prefix, message) =>
  build(config.AUTH_RATE_LIMIT_MAX, message, prefix);

export const registerLimiter = authLimiter(
  'rl:auth:register:',
  'Too many registration attempts. Please wait a few minutes before trying again.'
);
export const loginLimiter = authLimiter(
  'rl:auth:login:',
  'Too many sign-in attempts. Please wait a few minutes before trying again.'
);
export const mfaLimiter = authLimiter(
  'rl:auth:mfa:',
  'Too many verification attempts. Please wait a few minutes before trying again.'
);
export const passwordLimiter = authLimiter(
  'rl:auth:password:',
  'Too many password requests. Please wait a few minutes before trying again.'
);
