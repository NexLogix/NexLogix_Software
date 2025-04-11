// Simulación de base de datos de usuarios con roles
export const users: Record<string, string> = {
    "manager_user": "manager",
    "empleado_user": "empleado",
};

// Función para autenticar usuario con email y password (en un futuro aquí iría una API)
export const authenticateUser = (email: string): string | null => {
    return users[email] || null;
};

// Exportar correctamente
export default { authenticateUser };
