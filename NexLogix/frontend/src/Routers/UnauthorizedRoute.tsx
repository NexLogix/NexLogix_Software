import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function UnauthorizedRoute() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    const timeout = setTimeout(() => {
      navigate("/"); // Redirige a login
    }, 3000); // 3 segundos
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="container text-center mt-5">
      <h1 className="display-4 text-danger">403 - No Autorizado</h1>
      <p className="lead">
        Lo sentimos, no tienes permisos para acceder a esta página.
      </p>
      <p>Serás redirigido al inicio en unos segundos...</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
        Ir al Inicio
      </button>
    </div>
  );
}