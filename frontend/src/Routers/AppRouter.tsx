import { BrowserRouter, Routes, Route } from "react-router-dom";

// SE IMPORTA LA GESTION DEL LOGIN
import Login from "../Views/pages/Login/Login";

// SE IMPORTA LA GESTION DEL HOME, ACERCA DE, CONTACTANOS Y ESTAMOS UBICADOS EN....
import Home from "../Views/pages/Home";

//  AQUI SE IMPORTA EL PERFIL MANAGER
import ManagerProfile from "../Views/pages/profiles/ManagerProfile/ManagerProfile";

//  AQUI SE IMPORTA EL PERFIL EMPLEADO
import EmpleadoProfile from "../Views/pages/profiles/EmpleadoProfile/EmpleadoProfile";

//  AQUI SE IMPORTA EL PERFIL CONDUCTOR 


// AQUI SE IMPORTACIONES LA GESTION ENVIOS
import VerEnvios from "../Views/pages/Envios/VerEnvios";
import CrearEnvios from "../Views/pages/Envios/CrearEnvios";
import EditarEnvios from "../Views/pages/Envios/EditarEnvios";
import EliminarEnvios from "../Views/pages/Envios/EliminarEnvios";

// AQUI SE IMPORTA LA GESTION DE USUARIOS
import CrearUsuarios from "../Views/pages/Users/CrearUsuarios";
import VerUsuarios from "../Views/pages/Users/VerUsuarios";
import EditarUsuarios from "../Views/pages/Users/EditarUsuarios";
import EliminarUsuarios from "../Views/pages/Users/EliminarUsuarios";

// AQUI SE IMPORTA RUTAS
import VerListaRutas from "../Views/pages/Rutas/VerListaRutas";
import EditarRutas from "../Views/pages/Rutas/EditarRutas";
import EliminarRutas from "../Views/pages/Rutas/EliminarRutas";

// AQUI SE IMPORTA VEHICULOS
import VerListaVehiculos from "../Views/pages/Vehiculos/VerListaVehiculos";
import VerConductores from "../Views/pages/Vehiculos/VerConductores";

// AQUI SE IMPORTA EL CHATBOT
import ChatBot from "../Views/pages/Soporte/ChatBot";
import ChatIngeniero from "../Views/pages/Soporte/ChatIngeniero";
import ReporteAnomalias from "../Views/pages/Soporte/ReporteAnomalias";  // error wtf?

// AQUI SE IMPORTA REPORTES
import VerReportes from "../Views/pages/Reportes/VerReportes";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/*LOGIN*/}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                
                {/*PROFILE MANAGER*/}
                <Route path="/manager" element={<ManagerProfile />}>
                    <Route index element={<Home />} />
                    {/*ROUTERS GESTIONS ENVIOS*/}
                    <Route path="verEnvios" element={<VerEnvios />} />
                    <Route path="crearEnvios" element={<CrearEnvios />} />
                    <Route path="editarEnvios" element={<EditarEnvios />} />
                    <Route path="eliminarEnvio" element={<EliminarEnvios />} />

                    {/*ROUTERS GESTION EMPLEADOS/USUARIOS */}
                    <Route path="crearUsuarios" element={<CrearUsuarios />} />
                    <Route path="verUsuarios" element={<VerUsuarios />} />
                    <Route path="editarUsuarios" element={<EditarUsuarios />} />
                    <Route path="eliminarUsuarios" element={<EliminarUsuarios />} />

                    {/*ROUTERS RUTAS*/}
                    <Route path="verListaRutas" element={<VerListaRutas />} />
                    <Route path="editarRutas" element={<EditarRutas />} />
                    <Route path="EliminarRutas" element={<EliminarRutas />} />

                    {/* ROUTERS VEHICULOS */}
                    <Route path="verListaVehiculos" element={<VerListaVehiculos />} />
                    <Route path="verConductores" element={<VerConductores />} />

                    {/* ROUTERS CHATBOT */}
                    <Route path="chatBot" element={<ChatBot />} />
                    <Route path="chatIngeniero" element={<ChatIngeniero />} />
                    <Route path="reporteAnomalias" element={<ReporteAnomalias />} />

                    {/* ROUTERS REPORTES */}
                    <Route path="verReportes" element={<VerReportes />} />
                </Route>

                <Route path="/empleado" element={<EmpleadoProfile />}>
                    <Route index element={<Home />} />

                    {/*ROUTERS GESTIONS ENVIOS*/}
                    <Route path="verEnvios" element={<VerEnvios />} />
                    <Route path="crearEnvios" element={<CrearEnvios />} />

                    {/*ROUTERS RUTAS*/}
                    <Route path="verListaRutas" element={<VerListaRutas />} />

                    {/* ROUTERS REPORTES */}
                    <Route path="verReportes" element={<VerReportes />} />

                </Route>
            </Routes>

            {/* ROUTERS DE EMPLEADO */}
        </BrowserRouter>
    );
};

export default AppRouter;
