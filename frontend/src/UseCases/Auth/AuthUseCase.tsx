import { NavigateFunction } from 'react-router-dom';
import { AuthLoginService } from '../../services/Auth/AuthService';

export const useLoginUseCase = () => {
  const login = async (
    email: string,
    contrasena: string,
    navigate: NavigateFunction
  ) => {
    try {
      console.log("[useLoginUseCase] Iniciando login con:", { email, contrasena });
      const response = await AuthLoginService(email, contrasena);
      
      if (response) {
        const { token } = response;
        const role = localStorage.getItem("userRole");
        console.log("[useLoginUseCase] Respuesta de AuthLoginService:", response);
        console.log("[useLoginUseCase] Token recibido:", token);
        console.log("[useLoginUseCase] Rol desde localStorage:", role);
        
        if (role === 'Manager') {
          console.log("[useLoginUseCase] Redirigiendo a /Manager");
          localStorage.setItem("authRedirect", "true");
          navigate('/Manager', { replace: true });
        } else if (role === 'Empleado') {
          console.log("[useLoginUseCase] Redirigiendo a /Empleado");
          localStorage.setItem("authRedirect", "true");
          navigate('/Empleado', { replace: true });
        } else {
          console.log("[useLoginUseCase] Rol no reconocido, redirigiendo a /unauthorized");
          navigate('/unauthorized', { replace: true });
        }
      } else {
        console.log("[useLoginUseCase] No se recibió respuesta válida de AuthLoginService");
        throw new Error("No se recibió respuesta del servidor");
      }
    } catch (error) {
      console.error("[useLoginUseCase] Error en login:", error);
      throw error;
    }
  };

  return { login };
};