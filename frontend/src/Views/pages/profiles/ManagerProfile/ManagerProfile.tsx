import { Link} from "react-router-dom";
import { Outlet } from "react-router-dom";
import FooterGeneral from "../../../componets/Footers/FooterGeneral";
import NavbarGeneral from "../../../componets/NavBars/NavbarGeneral";


const ManagerProfile = () => {
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
                        <Link className="nav-link active" to="/manager">Inicio MANAGER</Link>
                       
                        {/* Opción Envíos con submenú */}
                        <li className="nav-item position-relative ">
                            <Link className="nav-link" data-bs-toggle="collapse" to="#enviosSubmenu" role="button" aria-expanded="false" aria-controls="enviosSubmenu">Envíos</Link>
                            <div className="collapse" id="enviosSubmenu">
                                  <ul className="nav flex-column ms-3">
                                      <Link className="nav-link" to="/manager/verEnvios">Ver Envíos</Link>
                                      <Link className="nav-link" to="/manager/crearEnvios">Crear Envío</Link>
                                      <Link className="nav-link" to="/manager/editarEnvios">Editar Envío</Link>
                                      <Link className="nav-link" to="/manager/eliminarEnvio">Eliminar Envío</Link>
                                  </ul>
                            </div>
                        </li>

                        {/* Opción Empleados con submenú */}
                        <li className="nav-item">
                          <Link className="nav-link" data-bs-toggle="collapse" to="#EmpleadosSubmenu" role="button" aria-expanded="false" aria-controls="EmpleadosSubmenu">Empleados</Link>
                              <div className="collapse" id="EmpleadosSubmenu">
                                    <ul className="nav flex-column ms-3">
                                      <Link className="nav-link" to="crearUsuarios">Crear usuarios</Link>
                                      <Link className="nav-link" to="/manager/verUsuarios">Lista general</Link>
                                      <Link className="nav-link" to="/manager/editarUsuarios">Editar usuario</Link>
                                      <Link className="nav-link" to="/manager/eliminarUsuarios">Desactivar usuario</Link>
                                    </ul>
                              </div>
                        </li>

                        {/* Opción Rutas con submenú */}
                        <li className="nav-item">
                              <Link className="nav-link" data-bs-toggle="collapse" to="#RutasSubmenu"  role="button" aria-expanded="false"  aria-controls="RutasSubmenu" >Rutas</Link>
                              <div className="collapse" id="RutasSubmenu">
                                    <ul className="nav flex-column ms-3">
                                      <Link className="nav-link" to="/manager/verListaRutas">Ver lista de rutas</Link>
                                      <Link className="nav-link" to="/manager/editarRutas">Editar rutas</Link>
                                      <Link className="nav-link" to="/manager/eliminarRutas">Eliminar rutas</Link>
                                    </ul>
                              </div>
                        </li>

                        {/* Opción Vehículos con submenú */}
                        <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="collapse" to="#VehiculosSubmenu" role="button" aria-expanded="false" aria-controls="VehiculosSubmenu">Vehículos</Link>
                            <div className="collapse" id="VehiculosSubmenu">
                                <ul className="nav flex-column ms-3">
                                  <Link className="nav-link" to="/manager/verListaVehiculos">Ver lista de vehículos</Link>
                                  <Link className="nav-link" to="/manager/verConductores">Ver conductores</Link>
                                </ul>
                            </div>
                        </li>

                        
                        {/* Opción Soporte Técnico con submenú */}
                        <li className="nav-item">
                          <Link className="nav-link" data-bs-toggle="collapse" to="#SoporteTecnicoSubMenu" role="button" aria-expanded="false" aria-controls="SoporteTecnicoSubMenu">Soporte Técnico</Link>
                              <div className="collapse" id="SoporteTecnicoSubMenu">
                                    <ul className="nav flex-column ms-3">
                                      <Link className="nav-link" to="/manager/chatBot">Chatbot soporte</Link>
                                      <Link className="nav-link" to="/manager/chatIngeniero">Abrir chat con Ingeniero</Link>
                                      <Link className="nav-link" to="/manager/reporteAnomalias">Reportar anomalías</Link>
                                    </ul>
                              </div>
                        </li> 

                        {/* Opción Reportes */}
                        <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="collapse" to="#ReportesSubMenu" role="button" aria-expanded="false" aria-controls="ReportesSubMenu">Reportes</Link>
                                <div className="collapse" id="ReportesSubMenu"> 
                                      <ul className="nav flex-column ms-3">
                                        <Link className="nav-link" to="/manager/verReportes">Ver reportes</Link>
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
};

export default ManagerProfile;