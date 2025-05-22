import axios from "axios";
import { getToken } from './auth';
import { error } from "console";

const api = axios.create({
    baseURL:'http://localhost:8080',
    withCredentials: true,
});

api.interceptors.request.use(config => {
    const token = getToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if(error.response && (error.response.status === 401 || error.response.status === 403)) {
            sessionStorage.clear();
            alert("セッションが無効です。再ログインしてください。");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;