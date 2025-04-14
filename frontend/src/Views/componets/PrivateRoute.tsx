import { FC, ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../services/Auth/AuthService";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: string[];
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { token, role, isAuthenticated } = useAuth();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const authRedirect = localStorage.getItem("authRedirect");
    if (authRedirect === "true") {
      console.log("[PrivateRoute] Detectada bandera authRedirect, esperando autenticación");
      // Esperar brevemente para que useAuth se actualice
      const timer = setTimeout(() => {
        setIsChecking(false);
        localStorage.removeItem("authRedirect"); // Limpiar la bandera
      }, 500); // 500ms debería ser suficiente
      return () => clearTimeout(timer);
    } else {
      setIsChecking(false);
    }
  }, []);

  console.log("[PrivateRoute] Estado - Token:", token ? "presente" : "ausente");
  console.log("[PrivateRoute] Estado - Rol:", role);
  console.log("[PrivateRoute] Estado - IsAuthenticated:", isAuthenticated);
  console.log("[PrivateRoute] Roles permitidos:", allowedRoles);

  if (isChecking) {
    console.log("[PrivateRoute] Verificando autenticación...");
    return <div className="text-center mt-5">Cargando...</div>;
  }

  // Verificar localStorage directamente como respaldo
  const storedToken = localStorage.getItem("token");
  const storedRole = localStorage.getItem("userRole");
  if (storedToken && storedRole && allowedRoles.includes(storedRole)) {
    console.log("[PrivateRoute] Autenticación confirmada vía localStorage, acceso permitido");
    return <>{children}</>;
  }

  if (!token || !isAuthenticated) {
    console.log("[PrivateRoute] Redirigiendo a /login: no autenticado");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role === null) {
    console.log("[PrivateRoute] Rol null, mostrando cargando...");
    return <div className="text-center mt-5">Cargando permisos...</div>;
  }

  if (!allowedRoles.includes(role)) {
    console.log("[PrivateRoute] Rol no permitido:", role);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("[PrivateRoute] Acceso permitido a la ruta");
  return <>{children}</>;
};

export default PrivateRoute;