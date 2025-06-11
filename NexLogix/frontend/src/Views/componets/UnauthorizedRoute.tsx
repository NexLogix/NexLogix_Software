import { useNavigate } from "react-router-dom"; // Importa el hook useNavigate para navegación programática
import { useEffect } from "react"; // Importa el hook useEffect para efectos secundarios

export default function UnauthorizedRoute() { // Define el componente funcional para la página de acceso no autorizado
  const navigate = useNavigate(); // Obtiene la función de navegación

  useEffect(() => { // Define un efecto para redirigir automáticamente
    // Opcional: redireccionar automáticamente después de unos segundos
    const timeout = setTimeout(() => { // Configura un temporizador de 5 segundos
      navigate("/"); // Navega a la página de inicio
    }, 5000); // 5000ms de espera
    return () => clearTimeout(timeout); // Limpia el temporizador al desmontar
  }, [navigate]); // Dependencia: navigate

  return (
    <div className="container text-center mt-5"> {/* Contenedor principal con estilos Bootstrap */}
      <h1 className="display-4 text-danger">403 - No Autorizado</h1> {/* Título de error */}
      <p className="lead"> {/* Mensaje principal */}
        Lo sentimos, no tienes permisos para acceder a esta página.
      </p>
      <p>Serás redirigido al inicio en unos segundos...</p> {/* Mensaje de redirección */}
      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}> {/* Botón para navegar manualmente */}
        Ir al Inicio
      </button>
    </div>
  );
}