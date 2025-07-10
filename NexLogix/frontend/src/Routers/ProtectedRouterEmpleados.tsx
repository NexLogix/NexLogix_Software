import { Routes, Route } from "react-router-dom";
import EmpleadoProfile from "../Views/profiles/EmpleadoProfile/EmpleadoProfile";
import HomeEmpleado from "../Views/profiles/EmpleadoProfile/HomeEmpleado";
import ReportesConductor from "../Views/pages/EmpleadoPages/ReportesConductor";
import RutasConductor from "../Views/pages/EmpleadoPages/RutasConductor";
import VehiculosConductor from "../Views/pages/EmpleadoPages/VehiculosConductor";
import EstamosUbicadosEn from "../Views/componets/Footers/EstamosUbicadoEn";
import AcercaDe from "../Views/componets/Footers/AcercaDe";
// importa más páginas si tienes...

const ProtectedRouteEmpleados = () => {
  return (
    <Routes>
      <Route path="/" element={<EmpleadoProfile />}>
        <Route index element={<HomeEmpleado />} />

        {/*ROUTERS GESTIONS ENVIOS*/}

        {/*ROUTERS RUTAS*/}
        <Route path="rutas" element={<RutasConductor />} />

        {/* ROUTERS VEHICULOS */}
        <Route path="vehiculos" element={<VehiculosConductor />} />

        {/* ROUTERS REPORTES */}
        {<Route path="reportes" element={<ReportesConductor />} />}

        <Route path="ubicacion" element={<EstamosUbicadosEn />} />
        <Route path="/acerca_de" element={<AcercaDe />} />
        
      </Route>
    </Routes>
  );
};

export default ProtectedRouteEmpleados;
