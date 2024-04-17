import axios from 'axios';
import { localStorageManager } from './LocalStorage';
import { REFRESH_TOKEN, TOKEN } from '../constants/auth';
import routes from '@router/index';

const api = axios.create({
  baseURL: routes.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(async config => {
  const token = localStorageManager.getItem(TOKEN);
  const refreshToken = localStorageManager.getItem(REFRESH_TOKEN);

  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  if (refreshToken) config.headers['Refresh-Token'] = refreshToken;

  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401) {
      try {
        const refreshToken = await localStorageManager.getItem(REFRESH_TOKEN);

        const response = await axios.post(
          `${routes.baseURL}${routes.refresh}`,
          {
            refresh: refreshToken,
          }
        );

        if (response.status == 200) {
          const { access, refresh: newRefreshToken } = response.data;

          localStorageManager.setItem(TOKEN, access),
            localStorageManager.setItem(REFRESH_TOKEN, newRefreshToken);

          originalRequest.headers['Authorization'] = `Bearer ${access}`;
          originalRequest.headers['Refresh-Token'] = newRefreshToken;
          return axios(originalRequest);
        }

        if (response.status !== 200) {
          localStorageManager.removeItem(TOKEN),
            localStorageManager.removeItem(REFRESH_TOKEN);
          return;
        }
      } catch (err) {
        localStorageManager.removeItem(TOKEN),
          localStorageManager.removeItem(REFRESH_TOKEN);
        console.log(err);
      }
    }

    return Promise.reject(error.response);
  }
);

export default api;
