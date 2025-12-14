import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = sessionStorage.getItem("auth_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log("[API Request] Token inviato via Authorization header");
            }
        }
        console.log("[API Request]", config.method?.toUpperCase(), config.url, {
            hasAuth: !!config.headers.Authorization,
            hasCookies: !!document.cookie,
        });
        return config;
    },
    (error) => Promise.reject(error)
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log("[API] 401 Unauthorized - reindirizzando a /auth");
            if (typeof window !== "undefined") {
                sessionStorage.removeItem("auth_token");
                window.location.href = "/auth";
            }
        }
        return Promise.reject(error);
    }
);