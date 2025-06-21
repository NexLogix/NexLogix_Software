import { Route, Routes } from "react-router-dom";

// IMPORT PROFILE MANAGER
import ManagerProfile from "../Views/profiles/ManagerProfile/ManagerProfile";
import HomeManager from "../Views/profiles/ManagerProfile/HomeManager";

// AREAS
import VerAreas from '../Views/pages/Areas/VerAreas';
import EditarAreas from "../Views/pages/Areas/EditarArea";
import CrearArea from "../Views/pages/Areas/CrearArea";
import EliminarArea from "../Views/pages/Areas/EliminarArea";

// PUESTOS
import VerPuestos from "../Views/pages/Puestos/VerPuestos";
import CrearPuesto from "../Views/pages/Puestos/CrearPuesto";
import EditarPuestos from "../Views/pages/Puestos/EditarPuestos";
import EliminarPuesto from "../Views/pages/Puestos/EliminarPuesto";

// CIUDADES
import VerCiudades from "../Views/pages/Ciudades/VerCiudades";
import CrearCiudad from "../Views/pages/Ciudades/CrearCiudad";
import EditarCiudad from "../Views/pages/Ciudades/EditarCuidad";
import EliminarCiudad from "../Views/pages/Ciudades/EliminarCiudad";

// ENVIOS
import VerEnvios from "../Views/pages/Envios/VerEnvios";
import CrearEnvios from "../Views/pages/Envios/CrearEnvios";
import EditarEnvios from "../Views/pages/Envios/EditarEnvios";
import EliminarEnvios from "../Views/pages/Envios/EliminarEnvios";
// EMPLEADOS
import CrearUsuario from "../Views/pages/Users/CrearUsuarios";
import VerUsuarios from "../Views/pages/Users/VerUsuarios";
import EditarUsuarios from "../Views/pages/Users/EditarUsuarios";
import DesactivarUsuario from "../Views/pages/Users/DesactivarUsuarios";
import EliminarUsuarios from "../Views/pages/Users/EliminarUsuarios";
// RUTAS
import VerListaRutas from "../Views/pages/Rutas/VerListaRutas";
import EditarRutas from "../Views/pages/Rutas/EditarRutas";
import EliminarRutas from "../Views/pages/Rutas/EliminarRutas";
// VEHICULOS
import VerListaVehiculos from "../Views/pages/Vehiculos/VerListaVehiculos";
import VerConductores from "../Views/pages/Vehiculos/VerConductores";
// SOPORTE TECNICO
import ChatBot from "../Views/pages/Soporte/ChatBot";
import ChatConIngeniero from "../Views/pages/Soporte/ChatIngeniero";
import ReporteAnomalias from "../Views/pages/Soporte/ReporteAnomalias";
// REPORTES
import VerReportes from "../Views/pages/Reportes/VerReportes";
import CrearReporte from "../Views/pages/Reportes/CrearReporte";

// FOOTER
import EstamosUbicadosEn from "../Views/componets/Footers/EstamosUbicadoEn";
import AcercaDe from "../Views/componets/Footers/AcercaDe";

// AUDITORIAS
import VerAuditorias from "../Views/pages/Auditorias/VerAuditoria";
import EditarAuditorias from "../Views/pages/Auditorias/EditarAuditoria";
import EliminarAuditorias from "../Views/pages/Auditorias/EliminarAuditoria";
// desde aqui se hacen las rutas como es una ruta privada....

const ProtectedRouteManagers = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagerProfile />}>
        <Route index element={<HomeManager />} />

        {/*GESTION AREAS*/} 
        <Route path="verAreas" element={<VerAreas />} />
        <Route path="crearArea" element={<CrearArea />} />
        <Route path="editarArea" element={<EditarAreas />} />
        <Route path="eliminarArea" element={<EliminarArea />} />

        {/*GESTION AUDITORIAS*/}
        <Route path="verAuditorias" element={<VerAuditorias />} />
        <Route path="editarAuditorias" element={<EditarAuditorias />} />
        <Route path="eliminarAuditorias" element={<EliminarAuditorias />} />


        {/*GESTIÓN PUESTOS */}
        <Route path="verPuestos" element={<VerPuestos />} />
        <Route path="crearPuesto" element={<CrearPuesto />} />
        <Route path="editarPuesto" element={<EditarPuestos />} />
        <Route path="eliminarPuesto" element={<EliminarPuesto />} />

        {/*GESTION CIUDADES*/}
        <Route path="crearCiudad" element={<CrearCiudad />} />
        <Route path="verCiudades" element={<VerCiudades />} />
        <Route path="editarCiudad" element={<EditarCiudad />} />
        <Route path="eliminarCiudad" element={<EliminarCiudad />} />


        {/*GESTION ENVIOS*/}
        <Route path="verEnvios" element={<VerEnvios />} />
        <Route path="crearEnvios" element={<CrearEnvios />} />
        <Route path="editarEnvios" element={<EditarEnvios />} />
        <Route path="eliminarEnvio" element={<EliminarEnvios />} />

        {/*GESTION USUARIOS*/}
        <Route path="crearUsuarios" element={<CrearUsuario />} />
        <Route path="verUsuarios" element={<VerUsuarios />} />
        <Route path="editarUsuarios" element={<EditarUsuarios />} />
        <Route path="desactivarUsuario" element={<DesactivarUsuario />} />
        <Route path="eliminarUsuarios" element={<EliminarUsuarios />} />

        {/*GESTION RUTAS*/}
        <Route path="verListaRutas" element={<VerListaRutas />} />
        <Route path="editarRutas" element={<EditarRutas />} />
        <Route path="eliminarRutas" element={<EliminarRutas />} />

        {/*GESTION VEHICULOS*/}
        <Route path="verListaVehiculos" element={<VerListaVehiculos />} />
        <Route path="verConductores" element={<VerConductores />} />

        {/*SPORTE TECNICO*/}
        <Route path="chatBot" element={<ChatBot />} />
        <Route path="chatIngeniero" element={<ChatConIngeniero />} />
        <Route path="reporteAnomalias" element={<ReporteAnomalias />} />

        {/*GESTION REPORTES*/}
        <Route path="verReportes" element={<VerReportes />} />
        <Route path="crearReporte" element={<CrearReporte />} />

        {/*FOOTER*/}
        <Route path="ubicacion" element={<EstamosUbicadosEn />} />
        <Route path="acerca_de" element={<AcercaDe />} />

      </Route>
    </Routes>
  );
};

export default ProtectedRouteManagers;