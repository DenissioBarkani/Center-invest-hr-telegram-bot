import axios from 'axios';
import { handleApiError } from './errorHandler.ts';

const BOTS_API_URL = 'https://6842d197e1347494c31e0af7.mockapi.io';
const AUTH_API_URL = 'https://6842d197e1347494c31e0af7.mockapi.io/auth';

const commonConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const apiBots = axios.create({
  baseURL: BOTS_API_URL,
  ...commonConfig,
});

export const apiAuth = axios.create({
  baseURL: AUTH_API_URL,
  ...commonConfig,
});

apiBots.interceptors.request.use(
  (config) => {
    console.log('[перед отправкой запроса 2xx]');
    // Здесь можете сделать что-нибудь с перед отправкой запроса
    return config;
  },
  (error) => {
    // Сделайте что-нибудь с ошибкой запроса
    console.error('[API request]', error);
    return Promise.reject(error);
  }
);

apiBots.interceptors.response.use(
  (response) => {
    console.log('[API ответ]', response.status);
    return response;
  },
  (error) => {
    console.log('[Интерсептор сработал!] Сырая ошибка:', error);
    const apiError = handleApiError(error);
    return Promise.reject(apiError);
  }
);

// apiAuth.interceptors.request.use(
//   config => config,
//   error => Promise.reject(error)
// );

// apiAuth.interceptors.response.use(
//   response => response,
//   error => Promise.reject(error)
// );
