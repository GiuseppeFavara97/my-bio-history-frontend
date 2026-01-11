import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Evita il redirect se siamo in fase di login o se l'errore non è 401
        if (error.response?.status === 401 && !error.config.url.includes("/auth/login")) {
            if (typeof window !== "undefined") {
                window.location.href = "/auth";
            }
        }
        return Promise.reject(error);
    }
);