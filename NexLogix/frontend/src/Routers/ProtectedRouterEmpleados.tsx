import { Routes, Route } from "react-router-dom";
import EmpleadoProfile from "../Views/profiles/EmpleadoProfile/EmpleadoProfile";
import HomeEmpleado from "../Views/profiles/EmpleadoProfile/HomeEmpleado";
import Envios from "../Views/pages/GestionLogistica/Envios";
import Rutas from "../Views/pages/GestionLogistica/Rutas";
import Reportes from "../Views/pages/Administracion/Reportes";
import EstamosUbicadosEn from "../Views/componets/Footers/EstamosUbicadoEn";
import AcercaDe from "../Views/componets/Footers/AcercaDe";
// importa más páginas si tienes...

const ProtectedRouteEmpleados = () => {
  return (
    <Routes>
      <Route path="/" element={<EmpleadoProfile />}>
        <Route index element={<HomeEmpleado />} />

        {/*ROUTERS GESTIONS ENVIOS*/}
        <Route path="envios" element={<Envios />} />

        {/*ROUTERS RUTAS*/}
        <Route path="rutas" element={<Rutas />} />

        {/* ROUTERS REPORTES */}
        {<Route path="reportes" element={<Reportes />} />}

        <Route path="ubicacion" element={<EstamosUbicadosEn />} />
        <Route path="/acerca_de" element={<AcercaDe />} />
        
      </Route>
    </Routes>
  );
};

export default ProtectedRouteEmpleados;
