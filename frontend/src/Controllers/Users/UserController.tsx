import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../services/Auth/AuthService";
import { getUserProfile } from "../../services/Auth/AuthService";

// GET PROFILE
export const UserProfileController = async (): Promise<AxiosResponse> => {
    return await getUserProfile();
};

// LOGOUT 
export const useLogoutController = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await LogoutUser();
            navigate("/login", { replace: true });
            return { success: true, message: 'Sesión cerrada correctamente' };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Error al cerrar sesión';
            return { success: false, message };
        }
    };

    return { handleLogout };
};