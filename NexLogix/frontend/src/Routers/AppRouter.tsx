import { BrowserRouter, Routes, Route } from "react-router-dom";

// PÁGINAS PÚBLICAS
import Login from "../Views/componets/Login";
import UnauthorizedRoute from "../Views/componets/UnauthorizedRoute";
import EstamosUbicadosEn from "../Views/componets/Footers/EstamosUbicadoEn";
import AcercaDe from "../Views/componets/Footers/AcercaDe";

// PROTECCIÓN DE RUTAS
import PrivateRoute from "../Views/componets/PrivateRoute";
import ProtectedRouteEmpleados from "./ProtectedRouterEmpleados";
import ProtectedRouteManagers from "./ProtectedRouterManagers";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* RUTAS PÚBLICAS */}
        <Route path="/login" index element={<Login />} />
        <Route path="/unauthorized" element={<UnauthorizedRoute />} />
        <Route path="/ubicacion" element={<EstamosUbicadosEn />} />
        <Route path="/acerca_de" element={<AcercaDe />} />

        {/* RUTAS PROTEGIDAS - MANAGER */}
        <Route
          path="/Manager/*"
          element={
            <PrivateRoute allowedRoles={["Manager"]}>
              <ProtectedRouteManagers />
            </PrivateRoute>
          }
        />

        {/* RUTAS PROTEGIDAS - EMPLEADO */}
        <Route
          path="/Empleado/*"
          element={
            <PrivateRoute allowedRoles={["Empleado"]}>
              <ProtectedRouteEmpleados />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;