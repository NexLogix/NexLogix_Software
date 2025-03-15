import "../GeneralStyle/NavGeneral.css";
import { Link } from "react-router-dom";



const NavbarGeneral = () => {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark shadow-lg">
        {/* Marca de la barra de navegación */}
        <a className="navbar-brand p-3" href="#">ADMIN</a>
  
        {/* Botón para colapsar el navbar en dispositivos móviles */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
  
        {/* Contenido colapsable del navbar */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Menú desplegable de configuraciones */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-cogs"></i> Configuraciones
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#">Configuración de cuenta</a></li>
                <li><a className="dropdown-item" href="#">Configuración de sistema</a></li>
                <li><a className="dropdown-item" href="#">Configuración de notificaciones</a></li>
                <li><a className="dropdown-item" href="#">Preferencias de idioma</a></li>
                <li><a className="dropdown-item" href="#">Manual de Uso</a></li>
                <Link to="/login" className="dropdown-item text-danger fw-bold"> SALIR</Link>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  };
  
  export default NavbarGeneral;
  