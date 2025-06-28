import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import FooterGeneralManager from "../../componets/Footers/FooterManager";
import NavbarGeneral from "../../componets/NavBars/NavbarGeneral";
import './../../Styles/Home/ProfilesGeneralStyle.css';

const ManagerProfile = () => {
  return (
    /// aqui tienen que poner lo demas....
    <>
      <NavbarGeneral />
      {/* Contenedor principal */}
      <div className="container-fluid">
        <div className="row">

          {/* Sidebar: barra lateral de navegación */}
          <nav id="sidebar" className=" col-lg-2 d-md-block sidebar">
            <div className="position-sticky">
              <ul className="nav flex-column">

                {/* Opción Inicio */}
                <li className="nav-item mb-1 mt-3">
                  <Link className="btn btn-danger w-100 rounded-3" to="/manager">
                    INICIO MANAGER
                  </Link>
                </li>

                {/* Opción Gestión Áreas con submenú */}
                <li className="nav-item">
                  <Link className="nav-link" data-bs-toggle="collapse" to="#AreasSubmenu" role="button" aria-expanded="false" aria-controls="AreasSubmenu">
                    Adminstración
                  </Link>
                  <div className="collapse" id="AreasSubmenu">
                    <ul className="nav flex-column">
                      <Link className="nav-link" to="/manager/verAreas">Areas</Link>
                      <Link className="nav-link" to="/manager/Puestos">Puestos</Link>
                      <Link className="nav-link" to="/manager/Reportes">Reportes</Link>
                      <Link className="nav-link" to="/manager/Roles">Roles</Link>
                      <Link className="nav-link" to="/manager/gestionUsuarios">Usuarios</Link>
                    </ul>
                  </div>
                </li>

                {/* Opción Auditorías con submenú */}
                <li className="nav-item">
                  <Link className="nav-link" data-bs-toggle="collapse" to="#AuditoriasSubmenu" role="button" aria-expanded="false" aria-controls="AuditoriasSubmenu">
                    Gestion Auditorias
                  </Link>
                  <div className="collapse" id="AuditoriasSubmenu">
                    <ul className="nav flex-column">
                      <Link className="nav-link" to="/manager/verAuditorias">Lista de auditorías</Link>
                      <Link className="nav-link" to="/manager/editarAuditorias">Editar auditorías</Link>
                      <Link className="nav-link" to="/manager/eliminarAuditorias">Eliminar auditorías</Link>
                    </ul>
                  </div>
                </li>

                {/* Opción Ciudades con submenú */}
                <li className="nav-item">
                  <Link className="nav-link" data-bs-toggle="collapse" to="#CiudadesSubmenu" role="button" aria-expanded="false" aria-controls="CiudadesSubmenu">
                    Gestión Ciudades
                  </Link>
                  <div className="collapse" id="CiudadesSubmenu">
                    <ul className="nav flex-column">
                      <Link className="nav-link" to="/manager/verCiudades">Lista de ciudades</Link>
                      <Link className="nav-link" to="/manager/crearCiudad">Crear ciudad</Link>
                      <Link className="nav-link" to="/manager/editarCiudad">Editar ciudad</Link>
                      <Link className="nav-link" to="/manager/eliminarCiudad">Eliminar ciudad</Link>
                    </ul>
                  </div>
                </li>

                {/* Opción Envíos con submenú */}
                <li className="nav-item position-relative ">
                  <Link className="nav-link" data-bs-toggle="collapse" to="#enviosSubmenu" role="button" aria-expanded="false" aria-controls="enviosSubmenu">Gestión Envíos</Link>
                  <div className="collapse" id="enviosSubmenu">
                    <ul className="nav flex-column">
                      <Link className="nav-link" to="/manager/verEnvios">Ver Envíos</Link>
                      <Link className="nav-link" to="/manager/crearEnvios">Crear Envío</Link>
                      <Link className="nav-link" to="/manager/editarEnvios">Editar Envío</Link>
                      <Link className="nav-link" to="/manager/eliminarEnvio">Eliminar Envío</Link>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" data-bs-toggle="collapse" to="#VehiculosSubmenu" role="button" aria-expanded="false" aria-controls="VehiculosSubmenu">Gestión Logística</Link>
                  <div className="collapse" id="VehiculosSubmenu">
                    <ul className="nav flex-column">
                      <Link className="nav-link" to="/manager/verListaVehiculos">Lista de vehículos</Link>
                      <Link className="nav-link" to="/manager/verConductores">Conductores</Link>
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