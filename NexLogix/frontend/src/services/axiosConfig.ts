import axios from "axios";

// Interceptor para agregar el token a cada request
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      window.location.href = "/unauthorized";
    }
    return Promise.reject(error);
  }
);