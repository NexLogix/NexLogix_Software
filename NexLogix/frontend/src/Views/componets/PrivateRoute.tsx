import { FC, ReactNode, useEffect, useState } from "react"; // Importa tipos y hooks de React
import { Navigate, useLocation } from "react-router-dom"; // Importa componentes de react-router-dom para redirección y ubicación
import { useAuth } from "../../services/Auth/AuthService"; // Importa el hook useAuth para manejar autenticación

interface PrivateRouteProps { // Define la interfaz para las props del componente PrivateRoute
  children: ReactNode; // Contenido anidado que se renderiza si se permite el acceso
  allowedRoles: string[]; // Lista de roles permitidos para acceder a la ruta
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, allowedRoles }) => { // Define el componente funcional PrivateRoute
  const { token, role, isAuthenticated } = useAuth(); // Obtiene el token, rol y estado de autenticación desde useAuth
  const location = useLocation(); // Obtiene la ubicación actual (URL) para redirecciones
  const [isChecking, setIsChecking] = useState(true); // Estado para controlar el proceso de verificación de autenticación

  useEffect(() => { // Define un efecto para manejar la bandera authRedirect
    const authRedirect = localStorage.getItem("authRedirect"); // Obtiene la bandera authRedirect de localStorage
    if (authRedirect === "true") { // Si la bandera está activa
      console.log("[PrivateRoute] Detectada bandera authRedirect, esperando autenticación"); // Log para depuración
      // Esperar brevemente para que useAuth se actualice
      const timer = setTimeout(() => { // Configura un temporizador de 500ms
        setIsChecking(false); // Marca la verificación como completa
        localStorage.removeItem("authRedirect"); // Limpia la bandera
      }, 500); // 500ms debería ser suficiente
      return () => clearTimeout(timer); // Limpia el temporizador al desmontar
    } else {
      setIsChecking(false); // Si no hay bandera, marca la verificación como completa
    }
  }, []); // Efecto sin dependencias, se ejecuta solo al montar

  console.log("[PrivateRoute] Estado - Token:", token ? "presente" : "ausente"); // Log del estado del token
  console.log("[PrivateRoute] Estado - Rol:", role); // Log del rol del usuario
  console.log("[PrivateRoute] Estado - IsAuthenticated:", isAuthenticated); // Log del estado de autenticación
  console.log("[PrivateRoute] Roles permitidos:", allowedRoles); // Log de los roles permitidos

  if (isChecking) { // Si aún se está verificando la autenticación
    console.log("[PrivateRoute] Verificando autenticación..."); // Log para depuración
    return <div className="text-center mt-5">Cargando...</div>; /* Muestra un mensaje de carga */
  }

  // Verificar localStorage directamente como respaldo
  const storedToken = localStorage.getItem("token"); // Obtiene el token de localStorage
  const storedRole = localStorage.getItem("userRole"); // Obtiene el rol de localStorage

  // SECCION USER AUTENTICADO
  if (storedToken && storedRole && allowedRoles.includes(storedRole)) { // Si hay token y rol válido
    console.log("[PrivateRoute] Autenticación confirmada vía localStorage, acceso permitido"); // Log para depuración
    return <>{children}</>; /* Renderiza el contenido protegido */
  }

  // SECCION ACCESO DENEGADO 1
  if (!token || !isAuthenticated) { // Si no hay token o no está autenticado
    console.log("[PrivateRoute] Redirigiendo a /login: no autenticado"); // Log para depuración
    return <Navigate to="/login" state={{ from: location }} replace />; /* Redirige al login con la ubicación actual */
  }

  // SECCION ACCESO DENEGADO 2
  if (role === null) { // Si el rol es null (aún no cargado)
    console.log("[PrivateRoute] Rol null, mostrando cargando..."); // Log para depuración
    return <div className="text-center mt-5">Cargando permisos...</div>; /* Muestra un mensaje de carga */
  }

  // SECCION ACCESO DENEGADO 3
  if (!allowedRoles.includes(role)) { // Si el rol no está permitido
    console.log("[PrivateRoute] Rol no permitido:", role); // Log para depuración
    return <Navigate to="/unauthorized" replace />; /* Redirige a la página de no autorizado */
  }

  console.log("[PrivateRoute] Acceso permitido a la ruta"); // Log para depuración
  return <>{children}</>; /* Renderiza el contenido protegido */
};

export default PrivateRoute; // Exporta PrivateRoute como componente predeterminado