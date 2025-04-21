import { Route, Routes } from "react-router-dom";

// IMPORT PROFILE MANAGER
import ManagerProfile from "../Views/pages/profiles/ManagerProfile/ManagerProfile";
import HomeManager from "../Views/pages/profiles/ManagerProfile/HomeManager";
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
import EstamosUbicadosEn from "../Views/componets/Footers/EstamosUbicadoEn";
import AcercaDe from "../Views/componets/Footers/AcercaDe";
// desde aqui se hacen las rutas como es una ruta privada....
const ProtectedRouteManagers = () => {
  return (
    <Routes>
      <Route path="/" element={<ManagerProfile />}>
        <Route index element={<HomeManager />} />
        <Route path="verEnvios" element={<VerEnvios />} />
        <Route path="crearEnvios" element={<CrearEnvios />} />
        <Route path="editarEnvios" element={<EditarEnvios />} />
        <Route path="eliminarEnvio" element={<EliminarEnvios />} />

        <Route path="crearUsuarios" element={<CrearUsuario />} />
        <Route path="verUsuarios" element={<VerUsuarios />} />
        <Route path="editarUsuarios" element={<EditarUsuarios />} />
        <Route path="desactivarUsuario" element={<DesactivarUsuario />} />
        <Route path="eliminarUsuarios" element={<EliminarUsuarios />} />

        <Route path="verListaRutas" element={<VerListaRutas />} />
        <Route path="editarRutas" element={<EditarRutas />} />
        <Route path="eliminarRutas" element={<EliminarRutas />} />

        <Route path="verListaVehiculos" element={<VerListaVehiculos />} />
        <Route path="verConductores" element={<VerConductores />} />

        <Route path="chatBot" element={<ChatBot />} />
        <Route path="chatIngeniero" element={<ChatConIngeniero />} />
        <Route path="reporteAnomalias" element={<ReporteAnomalias />} />

        <Route path="verReportes" element={<VerReportes />} />
        
        <Route path="ubicacion" element={<EstamosUbicadosEn />} />
        <Route path="acerca_de" element={<AcercaDe />} />

      </Route>
    </Routes>
  );
};

export default ProtectedRouteManagers;