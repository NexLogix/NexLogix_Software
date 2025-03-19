import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Views/pages/Login/Login";
import Home from "../Views/pages/Home";

//  AQUI SE IMPORTA EL PERFIL MANAGER Y LAS RUTAS DE MANAGER
import ManagerProfile from "../Views/pages/profiles/ManagerProfile/ManagerProfile";

//  AQUI SE IMPORTA EL PERFIL ADMIN Y LAS RUTAS DE ADMIN
import AdminProfile from "../Views/pages/profiles/AdminProfile/AdminProfile";
import VerEnvios from "../Views/pages/Envios/VerEnvios";
import CrearEnvios from "../Views/pages/Envios/CrearEnvios";
import EditarEnvios from "../Views/pages/Envios/EditarEnvios";
import EliminarEnvios from "../Views/pages/Envios/EliminarEnvios";

//  AQUI SE IMPORTA EL PERFIL EMPLEADO Y LAS RUTAS DE EMPLEADO
import Employee from "../Views/pages/profiles/EmpleadoProfile/EmpleadoProfile";


//  AQUI SE IMPORTA EL PERFIL CONDUCTOR Y LAS RUTAS DE CONDUCTOR
import Driver from "../Views/pages/profiles/ConductorProfile/CondutorProfile";


import CreateUser from "../Views/pages/Users/CrearUser";
import ViewAllUsers from "../Views/pages/Users/ViewAllUsers";
import EditUsers from "../Views/pages/Users/EditUser";
import DeleteUsers from "../Views/pages/Users/DeleteUser";


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
                    <Route path="createUser" element={<CreateUser/>} />
                    <Route path="viewAllUsers" element={<ViewAllUsers/>} />
                    <Route path="editUsers" element={<EditUsers/>} />
                    <Route path="deleteUsers" element={<DeleteUsers/>} />
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
                    <Route path="CreateUser" element={<CreateUser/>} />
                    <Route path="ViewAllUsers" element={<ViewAllUsers/>} />
                    <Route path="EditUsers" element={<EditUsers/>} />
                    <Route path="DeleteUsers" element={<DeleteUsers/>} />

                    
                </Route>
                <Route path="/employee" element={<Employee />} />
                <Route path="/driver" element={<Driver />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;
