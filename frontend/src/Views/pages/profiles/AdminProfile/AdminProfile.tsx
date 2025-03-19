import FooterGeneral from "../../../shared/Footers/FooterGeneral";
import "../generalStyle.css"
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import NavbarGeneral from "../../../shared/NavBars/NavbarGeneral";

// Componente AdminProfile: muestra la interfaz de perfil del administrador
const AdminProfile = () => {
  return (
    <>
      <NavbarGeneral/>
      {/* Contenedor principal */}
      <div className="container-fluid">
        <div className="row">

          {/* Sidebar: barra lateral de navegación */}
          <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block sidebar shadow-lg">
            <div className="position-sticky">
              <ul className="nav flex-column">

                      {/* Opción Inicio */}
                      <li className="nav-item">
                          <Link className="nav-link active" to="/admin">Inicio ADMIN</Link>
                      </li>

                      {/* Opción Envíos con submenú */}
                      <li className="nav-item position-relative ">
                          <Link className="nav-link" data-bs-toggle="collapse" to="#enviosSubmenu" role="button" aria-expanded="false" aria-controls="enviosSubmenu">Envíos</Link>
                          <div className="collapse" id="enviosSubmenu">
                                <ul className="nav flex-column ms-3">
                                  <li className="nav-item">
                                    <Link className="nav-link" to="/admin/verEnvios">Ver Envíos</Link>
                                  </li>
                                  <li className="nav-item">
                                    <Link className="nav-link" to="/admin/crearEnvios">Crear Envío</Link>
                                  </li>
                                  <li className="nav-item">
                                    <Link className="nav-link" to="/admin/editarEnvios">Editar Envío</Link>
                                  </li>
                                  <li className="nav-item">
                                    <Link className="nav-link" to="/admin/eliminarEnvio">Eliminar Envío</Link>
                                  </li>
                                </ul>
                          </div>
                      </li>

                      {/* Opción Rutas con submenú */}
                      <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="collapse" to="#RutasSubmenu"  role="button" aria-expanded="false"  aria-controls="RutasSubmenu" >Rutas</Link>
                            <div className="collapse" id="RutasSubmenu">
                                  <ul className="nav flex-column ms-3">
                                        <li className="nav-item">
                                          <Link className="nav-link" to="#">Ver lista de rutas</Link>
                                        </li>
                                        <li className="nav-item">
                                          <Link className="nav-link" to="#">Editar ruta</Link>
                                        </li>
                                        <li className="nav-item">
                                          <Link className="nav-link" to="#">Eliminar ruta</Link>
                                        </li>
                                  </ul>
                            </div>
                      </li>

                      {/* Opción Vehículos con submenú */}
                      <li className="nav-item">
                          <Link className="nav-link" data-bs-toggle="collapse" to="#VehiculosSubmenu" role="button" aria-expanded="false" aria-controls="VehiculosSubmenu">Vehículos</Link>
                          <div className="collapse" id="VehiculosSubmenu">
                              <ul className="nav flex-column ms-3">
                                  <li className="nav-item">
                                    <Link className="nav-link" to="#">Ver lista de vehículos</Link>
                                  </li>
                                  <li className="nav-item">
                                    <Link className="nav-link" to="#">Ver conductores</Link>
                                  </li>
                              </ul>
                          </div>
                      </li>

                      {/* Opción Empleados con submenú */}
                      <li className="nav-item">
                        <Link className="nav-link" data-bs-toggle="collapse" to="#EmpleadosSubmenu" role="button" aria-expanded="false" aria-controls="EmpleadosSubmenu">Empleados</Link>
                            <div className="collapse" id="EmpleadosSubmenu">
                                  <ul className="nav flex-column ms-3">
                                        <li className="nav-item">
                                          <Link className="nav-link" to="CreateUser">Crear usuarios</Link>
                                        </li>
                                        <li className="nav-item">
                                          <Link className="nav-link" to="/">Ver empleados activos</Link>
                                        </li>
                                        <li className="nav-item">
                                          <Link className="nav-link" to="/">Lista general (Buscar por ID)</Link>
                                        </li>
                                        <li className="nav-item">
                                          <Link className="nav-link" to="/">Editar usuario</Link>
                                        </li>
                                        <li className="nav-item">
                                          <Link className="nav-link" to="/">Desactivar usuario</Link>
                                        </li>
                                  </ul>
                            </div>
                      </li>
                      {/* Opción Soporte Técnico con submenú */}
                      <li className="nav-item">
                        <Link className="nav-link" data-bs-toggle="collapse" to="#SoporteTecnicoSubMenu" role="button" aria-expanded="false" aria-controls="SoporteTecnicoSubMenu">Soporte Técnico</Link>
                            <div className="collapse" id="SoporteTecnicoSubMenu">
                                  <ul className="nav flex-column ms-3">
                                        <li className="nav-item">
                                          <Link className="nav-link" to="#">Chatbot soporte</Link>
                                        </li>
                                        <li className="nav-item">
                                          <Link className="nav-link" to="#">Abrir chat con Ingeniero</Link>
                                        </li>
                                        <li className="nav-item">
                                          <Link className="nav-link" to="#">Reportar anomalías</Link>
                                        </li>
                                  </ul>
                            </div>
                      </li>

                      {/* Opción Reportes */}
                      <li className="nav-item">
                          <Link className="nav-link" data-bs-toggle="collapse" to="#ReportesSubMenu" role="button" aria-expanded="false" aria-controls="ReportesSubMenu">Reportes</Link>
                              <div className="collapse" id="ReportesSubMenu"> 
                                    <ul className="nav flex-column ms-3">
                                        <li className="nav-item">
                                          <Link className="nav-link" to="#">Ver reportes</Link>
                                        </li>
                                    </ul>
                              </div>
                      </li>
              </ul>
            </div>
          </nav>

           {/* Área principal (Main) */}
            <main className="p-3">
              <Outlet />  {/* Aquí se renderiza el contenido según la ruta */}
            </main>
        </div>
      </div>

      {/* Pie de página */}
      <FooterGeneral />
    </>
  );
}

export default AdminProfile;
