import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor per aggiungere token da sessionStorage o Authorization header
api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            // Prima prova da sessionStorage (fallback se i cookies non arrivano)
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

// Response interceptor per gestire errori di autenticazione
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log("[API] 401 Unauthorized - reindirizzando a /auth");
            // Token scaduto o invalido
            if (typeof window !== "undefined") {
                sessionStorage.removeItem("auth_token");
                window.location.href = "/auth";
            }
        }
        return Promise.reject(error);
    }
);

//process.env.NEXT_PUBLIC_API_URL