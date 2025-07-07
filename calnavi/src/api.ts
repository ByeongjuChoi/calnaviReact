import axios from "axios";
import { getToken } from './auth';
import { error } from "console";
import logout from './logout';

const api = axios.create({
    baseURL:'http://localhost:8080',
    withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터 – refresh + 로그아웃 통합
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 토큰 만료 (401) 시 refresh 시도
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const oldToken = sessionStorage.getItem('token');
        const refreshResponse = await api.get('/api/refresh', {
          headers: { Authorization: 'Bearer ' + oldToken }
        });

        if (refreshResponse.status === 200) {
          const newToken = refreshResponse.data;
          sessionStorage.setItem('token', newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        } else {
          // refresh 실패 시 로그아웃
          logout();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        console.error('refresh 실패:', refreshError);
        logout();
        return Promise.reject(refreshError);
      }
    }

    // 401 또는 403이면서 refresh 시도가 이미 실패한 경우 → 로그아웃
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      logout();
    }

    return Promise.reject(error);
  }
);

export default api;