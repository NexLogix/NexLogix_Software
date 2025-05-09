import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from "react";
import { UserProfile } from '../../models/Interfaces/UserProfile';
const API_URL = 'http://localhost:8000/api/auth';

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: {
    idRole: number;
    idestado: number;
    idPuestos: number;
  };
  status: number;
}

const getRoleName = (idRole: number): string => {
  switch (idRole) {
    case 1:
      return "Soporte Tecnico";
    case 2:
      return "Manager";
    case 3:
      return "Empleado"
    default:
      console.warn("[AuthLoginService] idRole desconocido:", idRole);
      return "Unknown";
  }
};

export const AuthLoginService = async (
  email: string,
  contrasena: string
): Promise<LoginResponse | null> => {
  try {
    console.log("[AuthLoginService] Enviando solicitud de login:", { email });
    const response: AxiosResponse<LoginResponse> = await axios.post(
      `${API_URL}/login`,
      {
        email,
        contrasena,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    console.log("[AuthLoginService] Respuesta completa del backend:", response.data);
    const { token, user } = response.data;
    console.log("[AuthLoginService] Usuario recibido:", user);
    console.log("[AuthLoginService] idRole recibido:", user.idRole);

    const roleName = getRoleName(user.idRole);
    console.log("[AuthLoginService] Rol mapeado:", roleName);

    localStorage.setItem("token", token);
    localStorage.setItem("userRole", roleName);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("[AuthLoginService] Datos guardados en localStorage:", {
      token: token.slice(0, 10) + "...",
      userRole: roleName,
      user,
    });

    return response.data;
  } catch (error) {
    console.error("[AuthLoginService] Error en login:", error);
    return null;
  }
};


// ————————————————————————
// 2) Manejo del header Authorization
// ————————————————————————
export const setAuthHeader = () => {
    const token = getToken();
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  
// ————————————————————————
// 3) Getters / Setters
// ————————————————————————
    export const setToken = (token: string) => {
        localStorage.setItem("token", token);
    };
  
    export const getToken = (): string | null => {
        return localStorage.getItem("token");
    };
  
    export const setUserRole = (role: string) => {
        localStorage.setItem("userRole", role);
    };
  
    export const getUserRole = (): string | null => {
        return localStorage.getItem("userRole");
    };

// ————————————————————————
// 4) Hook de autenticación
  //  esta parte es importante porque es la que usa Private Router
// ————————————————————————

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setTokenState] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const checkAuth = () => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("userRole");
    console.log("[useAuth] Verificando auth - Token:", storedToken ? "presente" : "ausente");
    console.log("[useAuth] Verificando auth - Rol:", storedRole);

    if (storedToken && storedRole) {
      setTokenState(storedToken);
      setRole(storedRole);
      setIsAuthenticated(true);
      console.log("[useAuth] Autenticación establecida: true");
    } else {
      console.log("[useAuth] No hay token o rol en localStorage");
      setIsAuthenticated(false);
      setTokenState(null);
      setRole(null);
    }
  };

  useEffect(() => {
    checkAuth();

    // Escuchar cambios en localStorage
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  return { token, role, isAuthenticated, checkAuth };
};

// ————————————————————————
// 5) SHOW PROFILE 
// ————————————————————————

export const getUserProfile = async (): Promise<UserProfile> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No autenticado');
  }

  try {
    console.log('Token encontrado:', token); // Verificar que el token está presente

    const response: AxiosResponse = await axios.get(`${API_URL}/mostrar_perfil_auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('Respuesta del backend:', response);

    if (response.data && response.data.data) {
      console.log('Perfil del usuario:', response.data.data);
      return response.data.data as UserProfile;
    } else {
      throw new Error('Respuesta inesperada del backend');
    }
  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    throw new Error('Error al obtener el perfil');
  }
};


// ————————————————————————
// 6) Logout 
// ————————————————————————
export const LogoutUser = async (): Promise<void> => {
  const token = localStorage.getItem('token');
  if (!token) {
      throw new Error('No hay sesión activa');
  }
  try {
      await axios.post(`${API_URL}/logout`, {}, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });
      // Limpiar localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('user');
  } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw new Error('Error al cerrar sesión');
  }
};