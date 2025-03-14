import FooterGeneral from "../../shared/FooterGeneral";
import "./generalStyle.css";

// Componente AdminProfile: muestra la interfaz de perfil del administrador
const AdminProfile = () => {
  return (
    <>
      {/* Barra de navegación principal */}
      <nav className="navbar navbar-expand-lg navbar-dark shadow-lg">
        <a className="navbar-brand p-3" href="#" >ADMIN</a>
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

        {/* Contenedor colapsable del navbar */}
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
                <li><a className="dropdown-item" href="#">SALIR</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {/* Contenedor principal */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar: barra lateral de navegación */}
          <nav 
            id="sidebar" 
            className="col-md-3 col-lg-2 d-md-block sidebar shadow-lg"
          >
            <div className="position-sticky">
              <ul className="nav flex-column">
                {/* Opción Inicio */}
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <i className="fas fa-book"></i> Inicio
                  </a>
                </li>
                {/* Opción Envíos con submenú */}
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    data-bs-toggle="collapse" 
                    href="#enviosSubmenu" 
                    role="button" 
                    aria-expanded="false" 
                    aria-controls="enviosSubmenu"
                  >
                    <i className="fas fa-box"></i> Envíos
                  </a>
                  <div className="collapse" id="enviosSubmenu">
                    <ul className="nav flex-column ms-3">
                      <li className="nav-item">
                        <a className="nav-link" href="#">Ver Envíos</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Crear Envío</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Editar Envío</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Eliminar Envío</a>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Opción Rutas con submenú */}
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    data-bs-toggle="collapse" 
                    href="#RutasSubmenu" 
                    role="button" 
                    aria-expanded="false" 
                    aria-controls="RutasSubmenu"
                  >
                    <i className="fas fa-road"></i> Rutas
                  </a>
                  <div className="collapse" id="RutasSubmenu">
                    <ul className="nav flex-column ms-3">
                      <li className="nav-item">
                        <a className="nav-link" href="#">Ver lista de rutas</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Editar ruta</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Eliminar ruta</a>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Opción Vehículos con submenú */}
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    data-bs-toggle="collapse" 
                    href="#VehiculosSubmenu" 
                    role="button" 
                    aria-expanded="false" 
                    aria-controls="VehiculosSubmenu"
                  >
                    <i className="fas fa-shipping-fast"></i> Vehículos
                  </a>
                  <div className="collapse" id="VehiculosSubmenu">
                    <ul className="nav flex-column ms-3">
                      <li className="nav-item">
                        <a className="nav-link" href="#">Ver lista de vehículos</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Ver conductores</a>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Opción Empleados con submenú */}
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    data-bs-toggle="collapse" 
                    href="#EmpleadosSubmenu" 
                    role="button" 
                    aria-expanded="false" 
                    aria-controls="EmpleadosSubmenu"
                  >
                    <i className="fas fa-user"></i> Empleados
                  </a>
                  <div className="collapse" id="EmpleadosSubmenu">
                    <ul className="nav flex-column ms-3">
                      <li className="nav-item">
                        <a className="nav-link" href="#">Crear usuarios</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Ver empleados activos</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Lista general (Buscar por ID)</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Editar usuario</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Desactivar usuario</a>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Opción Soporte Técnico con submenú */}
                <li className="nav-item">
                  <a 
                    className="nav-link" 
                    data-bs-toggle="collapse" 
                    href="#STSubmenu" 
                    role="button" 
                    aria-expanded="false" 
                    aria-controls="STSubmenu"
                  >
                    <i className="fas fa-wrench"></i> Soporte Técnico
                  </a>
                  <div className="collapse" id="STSubmenu">
                    <ul className="nav flex-column ms-3">
                      <li className="nav-item">
                        <a className="nav-link" href="#">Chatbot soporte</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Abrir chat con Ingeniero</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Reportar anomalías</a>
                      </li>
                    </ul>
                  </div>
                </li>
                {/* Opción Reportes */}
                <li className="nav-item">
                  <a className="nav-link" role="button">
                    <i className="fas fa-chart-line"></i> Reportes
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Contenido principal: perfil de usuario */}
          <main className="col-md-9 ml-sm-auto col-lg-10 px-md-4 p-5">
            <div className="user-profile-card">
              <div className="user-profile-image"></div>
              <h1 className="user-profile-title">Perfil de Usuario</h1>
              <div className="user-profile-info">
                <p><span className="user-profile-label">Nombre:</span> Juan Pérez</p>
                <p><span className="user-profile-label">Cargo:</span> Supervisor de Logística</p>
                <p><span className="user-profile-label">Fecha de Ingreso:</span> 15 de marzo de 2020</p>
                <p><span className="user-profile-label">Departamento:</span> Distribución</p>
                <p><span className="user-profile-label">Email:</span> juan.perez@logistica.com</p>
              </div>
              <div className="user-profile-footer">© 2024 Logística Global S.A.</div>
            </div>
          </main>
        </div>
      </div>

      {/* Pie de página */}
      <FooterGeneral />
    </>
  );
}

export default AdminProfile;
