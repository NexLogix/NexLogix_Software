import { Link} from "react-router-dom";
import { Outlet } from "react-router-dom";
import FooterGeneralManager from "../../componets/Footers/FooterManager";
import NavbarGeneral from "../../componets/NavBars/NavbarGeneral";
import '../../../Views/Styles/Profiles/ProfilesGeneralStyle.css';

const ManagerProfile = () => {
 return (
  /// aqui tienen que poner lo demas....
        <>
        <NavbarGeneral/>
        {/* Contenedor principal */} 
        <div className="container-fluid">
          <div className="row">

            {/* Sidebar: barra lateral de navegación */}
            <nav id="sidebar" className=" col-lg-2 d-md-block sidebar">
              <div className="position-sticky">
                <ul className="nav flex-column">

                        {/* Opción Inicio */}
                        <Link className="nav-link active" to="/manager">INICIO MANAGER</Link>

                        {/* Opción Gestión Áreas con submenú */}
                        <li className="nav-item">
                          <Link className="nav-link" data-bs-toggle="collapse" to="#AreasSubmenu" role="button" aria-expanded="false" aria-controls="AreasSubmenu">
                            Gestion Areas
                          </Link>
                          <div className="collapse" id="AreasSubmenu">
                            <ul className="nav flex-column ms-3">
                              <Link className="nav-link" to="/manager/verAreas">Ver Areas</Link>
                              <Link className="nav-link" to="/manager/crearArea">Crear Area</Link>
                              <Link className="nav-link" to="/manager/editarArea">Editar Area</Link>
                              <Link className="nav-link" to="/manager/eliminarArea">Eliminar Area</Link>
                            </ul>
                          </div>
                        </li>

                      {/* Opción Auditorías con submenú */}
                        <li className="nav-item">
                          <Link className="nav-link" data-bs-toggle="collapse" to="#AuditoriasSubmenu" role="button" aria-expanded="false" aria-controls="AuditoriasSubmenu">
                            Gestion Auditorias
                          </Link>
                          <div className="collapse" id="AuditoriasSubmenu">
                            <ul className="nav flex-column ms-3">
                              <Link className="nav-link" to="/manager/verAuditorias">Lista de auditorías</Link>
                              <Link className="nav-link" to="/manager/editarAuditorias">Editar auditorías</Link>
                              <Link className="nav-link" to="/manager/eliminarAuditorias">Eliminar auditorías</Link>
                            </ul>
                          </div>
                        </li>


                      {/* Opción Puestos con submenú */}
                        <li className="nav-item">
                          <Link className="nav-link" data-bs-toggle="collapse" to="#PuestosSubmenu" role="button" aria-expanded="false" aria-controls="PuestosSubmenu">
                            Gestion Puestos
                          </Link>
                          <div className="collapse" id="PuestosSubmenu">
                            <ul className="nav flex-column ms-3">
                              <Link className="nav-link" to="/manager/verPuestos">Lista de puestos</Link>
                              <Link className="nav-link" to="/manager/crearPuesto">Crear puesto</Link>
                              <Link className="nav-link" to="/manager/editarPuesto">Editar puesto</Link>
                              <Link className="nav-link" to="/manager/eliminarPuesto">Eliminar puesto</Link>
                            </ul>
                          </div>
                        </li>

                      {/* Opción Ciudades con submenú */}
                        <li className="nav-item">
                          <Link className="nav-link" data-bs-toggle="collapse" to="#CiudadesSubmenu" role="button" aria-expanded="false" aria-controls="CiudadesSubmenu">
                            Gestion Ciudades
                          </Link>
                          <div className="collapse" id="CiudadesSubmenu">
                            <ul className="nav flex-column ms-3">
                              <Link className="nav-link" to="/manager/verCiudades">Lista de ciudades</Link>
                              <Link className="nav-link" to="/manager/crearCiudad">Crear ciudad</Link>
                              <Link className="nav-link" to="/manager/editarCiudad">Editar ciudad</Link>
                              <Link className="nav-link" to="/manager/eliminarCiudad">Eliminar ciudad</Link>
                            </ul>
                          </div>
                        </li>

                        {/* Opción Envíos con submenú */}
                        <li className="nav-item position-relative ">
                            <Link className="nav-link" data-bs-toggle="collapse" to="#enviosSubmenu" role="button" aria-expanded="false" aria-controls="enviosSubmenu">Gestion Envíos</Link>
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
                          <Link className="nav-link" data-bs-toggle="collapse" to="#EmpleadosSubmenu" role="button" aria-expanded="false" aria-controls="EmpleadosSubmenu">Gestion Empleados</Link>
                              <div className="collapse" id="EmpleadosSubmenu">
                                    <ul className="nav flex-column ms-3">
                                      <Link className="nav-link" to="crearUsuarios">Crear usuarios</Link>
                                      <Link className="nav-link" to="/manager/verUsuarios">Lista general</Link>
                                      <Link className="nav-link" to="/manager/editarUsuarios">Editar usuario</Link>
                                      <Link className="nav-link" to="/manager/desactivarUsuario">Desactivar Usuario</Link>
                                      <Link className="nav-link" to="/manager/eliminarUsuarios">Eliminar usuario</Link>
                                    </ul>
                              </div>
                        </li>

                        {/* Opción Rutas con submenú */}
                        <li className="nav-item">
                              <Link className="nav-link" data-bs-toggle="collapse" to="#RutasSubmenu"  role="button" aria-expanded="false"  aria-controls="RutasSubmenu" >Gestion Rutas</Link>
                              <div className="collapse" id="RutasSubmenu">
                                    <ul className="nav flex-column ms-3">
                                      <Link className="nav-link" to="/manager/verListaRutas">Ver lista de rutas</Link>
                                      <Link className="nav-link" to="/manager/editarRutas">Editar rutas</Link>
                                      <Link className="nav-link" to="/manager/eliminarRutas">Eliminar rutas</Link>
                                    </ul>
                              </div>
                        </li>

                        
                        
                          <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="collapse" to="#VehiculosSubmenu" role="button" aria-expanded="false" aria-controls="VehiculosSubmenu">Gestion Vehículos</Link>
                            <div className="collapse" id="VehiculosSubmenu">
                                <ul className="nav flex-column ms-3">
                                  <Link className="nav-link" to="/manager/verListaVehiculos">Ver lista de vehículos</Link>
                                  <Link className="nav-link" to="/manager/verConductores">Ver conductores</Link>
                                </ul>
                            </div>
                        </li>

                        
                        {/* 
                        // AREA DE BOTONES SOPORTE TECNICO
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
                        */}
                        

                        {/* Opción Reportes */}
                        <li className="nav-item">
                            <Link className="nav-link" data-bs-toggle="collapse" to="#ReportesSubMenu" role="button" aria-expanded="false" aria-controls="ReportesSubMenu">Gestion Reportes</Link>
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
              <main>
                <Outlet />  {/* Aquí se renderiza el contenido según la ruta */}
              </main>
          </div>
        </div>

        {/* Pie de página */}
        <FooterGeneralManager />
      </>
  );
};

export default ManagerProfile;