import AuthService from "../../../src/services/loginService/AuthService";

export const handleLogin = (email: string): string | null => {
 return AuthService.authenticateUser(email);
};

