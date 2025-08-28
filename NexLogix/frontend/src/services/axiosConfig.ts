import axios from "axios";
import { NavigateFunction } from 'react-router-dom';

// Crear instancia de axios con configuración base
// Configuración del entorno
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const axiosInstance = axios.create({
    baseURL: `${API_BASE_URL}/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 segundos
});

let navigate: NavigateFunction | null = null;

export const setNavigate = (nav: NavigateFunction) => {
    navigate = nav;
};

// Interceptor para agregar el token a cada request
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");
            
            // Use React Router's navigate if available, otherwise fallback to window.location
            if (navigate) {
                navigate("/unauthorized");
            } else {
                window.location.href = "/unauthorized";
            }
        }
        return Promise.reject(error);
    }
);