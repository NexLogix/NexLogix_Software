import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../Views/pages/Login/Login";
import Manager from "../Views/pages/ManagerProfile/ManagerProfile";
import AdminProfile from "../Views/pages/AdminProfile/AdminProfile";
import VerEnvios from "../Views/pages/AdminProfile/components/Envios/VerEnvios";
import Employee from "../Views/pages/EmpleadoProfile/EmpleadoProfile";
import Driver from "../Views/pages/ConductorProfile/CondutorProfile";

const AppRouter = () => {
   return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/manager" element={<Manager />} />
                <Route path="/admin" element={<AdminProfile />}>
                    <Route path="verEnvios" element={<VerEnvios />} />
                </Route>
                <Route path="/employee" element={<Employee />} />
                <Route path="/driver" element={<Driver />} />
            </Routes>
        </BrowserRouter>
   );
};

export default AppRouter;
