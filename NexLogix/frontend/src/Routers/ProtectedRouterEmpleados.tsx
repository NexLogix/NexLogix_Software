import { Routes, Route } from "react-router-dom";
import EmpleadoProfile from "../Views/pages/profiles/EmpleadoProfile/EmpleadoProfile";
import HomeEmpleado from "../Views/pages/profiles/EmpleadoProfile/HomeEmpleado";
import VerEnvios from "../Views/pages/Envios/VerEnvios";
import CrearEnvios from "../Views/pages/Envios/CrearEnvios";
import VerListaRutas from "../Views/pages/Rutas/VerListaRutas";
import VerReportes from "../Views/pages/Reportes/VerReportes";
import EstamosUbicadosEn from "../Views/componets/Footers/EstamosUbicadoEn";
import AcercaDe from "../Views/componets/Footers/AcercaDe";
// importa más páginas si tienes...

const ProtectedRouteEmpleados = () => {
  return (
    <Routes>
      <Route path="/" element={<EmpleadoProfile />}>
        <Route index element={<HomeEmpleado />} />

        {/*ROUTERS GESTIONS ENVIOS*/}
        <Route path="verEnvios" element={<VerEnvios />} />
        <Route path="crearEnvios" element={<CrearEnvios />} />

        {/*ROUTERS RUTAS*/}
        <Route path="verListaRutas" element={<VerListaRutas />} />

        {/* ROUTERS REPORTES */}
        <Route path="verReportes" element={<VerReportes />} />

        <Route path="ubicacion" element={<EstamosUbicadosEn />} />
        <Route path="/acerca_de" element={<AcercaDe />} />
        
      </Route>
    </Routes>
  );
};

export default ProtectedRouteEmpleados;
