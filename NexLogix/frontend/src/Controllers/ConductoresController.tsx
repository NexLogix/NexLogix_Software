import { axiosInstance } from '../services/axiosConfig';
import { IConductor, IConductorCreate, IConductorApiResponse, IUsuarioCreate } from '../models/Interfaces/IConductor';

interface IUserResponse {
    success: boolean;
    data: {
        idusuarios: number;
        documentoIdentidad: string;
        nombreCompleto: string;
        email: string;
        numContacto: string;
        direccionResidencia: string;
        fechaCreacion: string;
        idRole: number;
        idestado: number;
        idPuestos: number;
    };
    message?: string;
    status: number;
}

const BASE_URL = 'http://127.0.0.1:8000/api';
const CONDUCTORES_URL = `${BASE_URL}/gestion_conductores`;
const USUARIOS_URL = `${BASE_URL}/gestion_usuarios`;

export class ConductoresController {
    static async getAllConductores(): Promise<IConductor[]> {
        try {
            const response = await axiosInstance.get<IConductorApiResponse>(CONDUCTORES_URL);
            if (response.data.success) {
                return Array.isArray(response.data.data) ? response.data.data : [response.data.data];
            }
            throw new Error(response.data.message || 'Error al obtener conductores');
        } catch (error) {
            console.error('Error al obtener conductores:', error);
            throw error;
        }
    }

    static async getConductorById(id: string): Promise<IConductor> {
        try {
            const response = await axiosInstance.get<IConductorApiResponse>(`${CONDUCTORES_URL}/${id}`);
            if (response.data.success && !Array.isArray(response.data.data)) {
                return response.data.data;
            }
            throw new Error(response.data.message || 'Error al obtener conductor');
        } catch (error) {
            console.error(`Error al obtener conductor ${id}:`, error);
            throw error;
        }
    }

    static async createConductorWithUser(userData: IUsuarioCreate & Partial<IConductorCreate>): Promise<IConductor> {
        try {
            // 1. Crear usuario primero con los datos predefinidos
            const userDataWithDefaults = {
                ...userData,
                idRole: 13, // Role ID para conductores
                idestado: 1, // Estado activo
                idPuestos: 2 // Puesto predefinido para conductores
            };

            const userResponse = await axiosInstance.post<IUserResponse>(USUARIOS_URL, userDataWithDefaults);
            
            if (!userResponse.data.success) {
                throw new Error(userResponse.data.message || 'Error al crear usuario');
            }

            // 2. Crear conductor con el ID de usuario obtenido
            const conductorData: IConductorCreate = {
                licencia: userData.licencia!,
                tipoLicencia: userData.tipoLicencia!,
                vigenciaLicencia: userData.vigenciaLicencia!,
                estado: 'disponible',
                idUsuario: userResponse.data.data.idusuarios
            };

            const conductorResponse = await axiosInstance.post<IConductorApiResponse>(CONDUCTORES_URL, conductorData);
            
            if (!conductorResponse.data.success) {
                // Si falla la creación del conductor, intentar eliminar el usuario creado
                await axiosInstance.delete(`${USUARIOS_URL}/${userResponse.data.data.idusuarios}`);
                throw new Error(conductorResponse.data.message || 'Error al crear conductor');
            }

            if (Array.isArray(conductorResponse.data.data)) {
                throw new Error('Respuesta inesperada del servidor');
            }

            return conductorResponse.data.data;

        } catch (error) {
            console.error('Error en el proceso de creación:', error);
            throw error;
        }
    }

    static async updateConductor(id: number, data: Partial<IConductorCreate>): Promise<IConductor> {
        try {
            const response = await axiosInstance.patch<IConductorApiResponse>(`${CONDUCTORES_URL}/${id}`, data);
            if (response.data.success && !Array.isArray(response.data.data)) {
                return response.data.data;
            }
            throw new Error(response.data.message || 'Error al actualizar conductor');
        } catch (error) {
            console.error(`Error al actualizar conductor ${id}:`, error);
            throw error;
        }
    }

    static async deleteConductor(id: number): Promise<boolean> {
        try {
            const response = await axiosInstance.delete<IConductorApiResponse>(`${CONDUCTORES_URL}/${id}`);
            return response.data.success;
        } catch (error) {
            console.error(`Error al eliminar conductor ${id}:`, error);
            throw error;
        }
    }

    static async getAllUsuarios() {
        try {
            const response = await axiosInstance.get<IUserResponse>(USUARIOS_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            throw error;
        }
    }
}
