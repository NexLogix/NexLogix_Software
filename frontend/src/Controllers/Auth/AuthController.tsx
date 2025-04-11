import AuthService from "../../services/Auth/AuthService";

export const handleLogin = (email: string): string | null => {
 return AuthService.authenticateUser(email);
};

