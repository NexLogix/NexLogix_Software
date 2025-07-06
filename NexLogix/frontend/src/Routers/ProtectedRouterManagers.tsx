import { Route, Routes } from "react-router-dom";

// IMPORT PROFILE MANAGER
import ManagerProfile from "../Views/profiles/ManagerProfile/ManagerProfile";
import HomeManager from "../Views/profiles/ManagerProfile/HomeManager";

// AREAS
// import EditarAreas from "../Views/pages/Areas/EditarArea";
// import CrearArea from "../Views/pages/Areas/CrearArea";
// import EliminarArea from "../Views/pages/Areas/EliminarArea";

// ADMINISTRACION
import Puestos from "../Views/pages/Administracion/Puestos";
import VerAreas from '../Views/pages/Administracion/VerAreas';
import Reportes from "../Views/pages/Administracion/Reportes";
import Roles from "../Views/pages/Administracion/Roles";
import GestionUsuarios from "../Views/pages/Administracion/GestionUsuarios";


// CIUDADES
import Ciudades from "../Views/pages/Ciudades/Ciudades";

// ENVIOS
import VerEnvios from "../Views/pages/Envios/VerEnvios";
import CrearEnvios from "../Views/pages/Envios/CrearEnvios";
import EditarEnvios from "../Views/pages/Envios/EditarEnvios";
import EliminarEnvios from "../Views/pages/Envios/EliminarEnvios";
// RUTAS
import VerListaRutas from "../Views/pages/Rutas/VerListaRutas";
import EditarRutas from "../Views/pages/Rutas/EditarRutas";
import EliminarRutas from "../Views/pages/Rutas/EliminarRutas";
// VEHICULOS
import VerListaVehiculos from "../Views/pages/Vehiculos/VerListaVehiculos";
import VerConductores from "../Views/pages/Vehiculos/VerConductores";

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
        {/* <Route path="verAreas" element={<VerAreas />} />
        <Route path="crearArea" element={<CrearArea />} />
        <Route path="editarArea" element={<EditarAreas />} />
        <Route path="eliminarArea" element={<EliminarArea />} /> */}

        {/*GESTION ADMINISTRACION*/}
        <Route path="verAreas" element={<VerAreas />} />
        <Route path="puestos" element={<Puestos />} />
        <Route path="reportes" element={<Reportes />} />
        <Route path="roles" element={<Roles />} />
        <Route path="gestionUsuarios" element={<GestionUsuarios />} />


        {/*GESTION AUDITORIAS*/}
        <Route path="verAuditorias" element={<VerAuditorias />} />
        <Route path="editarAuditorias" element={<EditarAuditorias />} />
        <Route path="eliminarAuditorias" element={<EliminarAuditorias />} />

        {/*GESTION CIUDADES*/}
        <Route path="ciudades" element={<Ciudades />} />

        {/*GESTION ENVIOS*/}
        <Route path="verEnvios" element={<VerEnvios />} />
        <Route path="crearEnvios" element={<CrearEnvios />} />
        <Route path="editarEnvios" element={<EditarEnvios />} />
        <Route path="eliminarEnvio" element={<EliminarEnvios />} />

        {/*GESTION RUTAS*/}
        <Route path="verListaRutas" element={<VerListaRutas />} />
        <Route path="editarRutas" element={<EditarRutas />} />
        <Route path="eliminarRutas" element={<EliminarRutas />} />

        {/*GESTION VEHICULOS*/}
        <Route path="verListaVehiculos" element={<VerListaVehiculos />} />
        <Route path="verConductores" element={<VerConductores />} />

      

        {/*FOOTER*/}
        <Route path="ubicacion" element={<EstamosUbicadosEn />} />
        <Route path="acerca_de" element={<AcercaDe />} />

      </Route>
    </Routes>
  );
};

export default ProtectedRouteManagers;