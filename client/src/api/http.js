import axios from 'axios';

export const TOKEN_STORAGE_KEY = 'bp.tokens';

function readTokens() {
  try {
    return JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY)) || null;
  } catch {
    return null;
  }
}

export function getStoredTokens() {
  return readTokens();
}

export function storeTokens(tokens) {
  if (!tokens) {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    return;
  }
  localStorage.setItem(
    TOKEN_STORAGE_KEY,
    JSON.stringify({ accessToken: tokens.accessToken, refreshToken: tokens.refreshToken })
  );
}

export const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL || ''}/api/v1`,
  timeout: 20000
});

let refreshSubscription = null;

async function refreshTokens(refreshToken) {
  const base = import.meta.env.VITE_API_BASE_URL || '';
  const response = await axios.post(`${base}/api/v1/auth/refresh`, { refreshToken });
  return response.data.data;
}

http.interceptors.request.use((config) => {
  const tokens = readTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken}`;
  }
  return config;
});

const REFRESHABLE_CODES = new Set(['TOKEN_EXPIRED']);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    const isExpired =
      error.response?.status === 401 &&
      REFRESHABLE_CODES.has(error.response?.data?.code);

    if (
      isExpired &&
      !original._retried &&
      readTokens()?.refreshToken
    ) {
      original._retried = true;

      try {
        refreshSubscription ||= refreshTokens(readTokens().refreshToken).finally(() => {
          refreshSubscription = null;
        });

        const data = await refreshSubscription;
        storeTokens(data);

        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return http(original);
      } catch {
        storeTokens(null);
        if (typeof window !== 'undefined') {
          window.location.href = '/login?session=expired';
        }
        return Promise.reject(normalizeError(error));
      }
    }

    return Promise.reject(normalizeError(error));
  }
);

export function normalizeError(error) {
  if (error.response?.data) {
    return {
      status: error.response.status,
      code: error.response.data.code || 'ERROR',
      message: error.response.data.message || 'Request failed',
      details: error.response.data.details || null
    };
  }
  if (error.code === 'ECONNABORTED') {
    return { status: 0, code: 'TIMEOUT', message: 'The request timed out', details: null };
  }
  return { status: 0, code: 'NETWORK_ERROR', message: 'Cannot reach the server', details: null };
}

export default http;
