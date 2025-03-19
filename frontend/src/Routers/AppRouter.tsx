import { BrowserRouter, Routes, Route } from "react-router-dom";

// SE IMPORTA LA GESTION DEL LOGIN
import Login from "../Views/pages/Login/Login";

// SE IMPORTA LA GESTION DEL HOME, ACERCA DE, CONTACTANOS Y ESTAMOS UBICADOS EN....
import Home from "../Views/pages/Home";

//  AQUI SE IMPORTA EL PERFIL MANAGER
import ManagerProfile from "../Views/pages/profiles/ManagerProfile/ManagerProfile";

//  AQUI SE IMPORTA EL PERFIL ADMIN Y LAS RUTAS DE ADMIN
import AdminProfile from "../Views/pages/profiles/AdminProfile/AdminProfile";

//  AQUI SE IMPORTA EL PERFIL EMPLEADO
import EmpleadoProfile from "../Views/pages/profiles/EmpleadoProfile/EmpleadoProfile";

//  AQUI SE IMPORTA EL PERFIL CONDUCTOR 
import Driver from "../Views/pages/profiles/ConductorProfile/CondutorProfile";


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

// 

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
                </Route>

                {/*PROFILE ADMIN*/}
                <Route path="/admin" element={<AdminProfile />}>
                    <Route index element={<Home />} />
                    {/*ROUTERS GESTIONS ENVIOS*/}
                    <Route path="verEnvios" element={<VerEnvios />} />
                    <Route path="crearEnvios" element={<CrearEnvios />} />
                    <Route path="editarEnvios" element={<EditarEnvios />} />
                    <Route path="eliminarEnvio" element={<EliminarEnvios />} />

                    {/*ROUTERS GESTION EMPLEADOS/USUARIOS */}
                    <Route path="crearUsuarios" element={<CrearUsuarios/>} />
                    <Route path="verUsuarios" element={<VerUsuarios/>} />
                    <Route path="editarUsuarios" element={<EditarUsuarios/>} />
                </Route>
                <Route path="/empleado" element={<EmpleadoProfile />} />
                <Route path="/conductor" element={<Driver />} />
            </Routes>

            {/* ROUTERS DE EMPLEADO */}
        </BrowserRouter>
    );
};

export default AppRouter;
