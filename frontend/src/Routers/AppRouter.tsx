import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Views/pages/Login/Login";
import Manager from "../Views/pages/profiles/ManagerProfile/ManagerProfile";
import AdminProfile from "../Views/pages/profiles/AdminProfile/AdminProfile";
import VerEnvios from "../Views/pages/Envios/VerEnvios";
import CrearEnvios from "../Views/pages/Envios/CrearEnvios";
import EditarEnvios from "../Views/pages/Envios/EditarEnvios";
import Employee from "../Views/pages/profiles/EmpleadoProfile/EmpleadoProfile";
import Driver from "../Views/pages/profiles/ConductorProfile/CondutorProfile";


const AppRouter = () => {
   return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/manager" element={<Manager />} />
                <Route path="/admin" element={<AdminProfile />}>
                    <Route path="verEnvios" element={<VerEnvios/>} />
                    <Route path="crearEnvios" element={<CrearEnvios />} />
                    <Route path="editarEnvios" element={<EditarEnvios />} />

                </Route>
                <Route path="/employee" element={<Employee />} />
                <Route path="/driver" element={<Driver />} />
            </Routes>
        </BrowserRouter>
   );
};

export default AppRouter;
