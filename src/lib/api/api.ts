import axios from "axios";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor per gestire errori di autenticazione
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token scaduto o invalido
            if (typeof window !== "undefined") {
                window.location.href = "/auth";
            }
        }
        return Promise.reject(error);
    }
);