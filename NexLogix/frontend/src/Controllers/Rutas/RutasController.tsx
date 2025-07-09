import { axiosInstance } from '../../services/axiosConfig';
import { 
    IRutaResponse, 
    ISingleRutaResponse, 
    ICreateRutaRequest,
    IBasicResponse,
    IVehiculosResponse,
    ICiudadesResponse,
    IAsignacionVehiculoResponse,
    IAsignacionCiudadResponse,
    ApiError
} from "../../models/Interfaces/IRutas";

export class RutasController {
    private static BASE_URL = '/gestion_rutas';
    private static AVPR_URL = '/gestion_asignacion_vehiculos_por_rutas';
    private static ARPC_URL = '/gestion_asignacion_rutas_por_ciudades';

    // Métodos principales de Rutas
    static async getAllRutas(): Promise<IRutaResponse> {
        try {
            const response = await axiosInstance.get(this.BASE_URL);
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    static async getRutaById(id: number): Promise<ISingleRutaResponse> {
        try {
            const response = await axiosInstance.get(`${this.BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    static async createRuta(data: ICreateRutaRequest): Promise<ISingleRutaResponse> {
        try {
            const response = await axiosInstance.post(this.BASE_URL, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    static async updateRuta(id: number, data: Partial<ICreateRutaRequest>): Promise<ISingleRutaResponse> {
        try {
            const response = await axiosInstance.patch(`${this.BASE_URL}/${id}`, data);
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    static async deleteRuta(id: number): Promise<IBasicResponse> {
        try {
            const response = await axiosInstance.delete(`${this.BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    // Métodos para asignación de vehículos
    static async assignVehicleToRoute(idRuta: number, idVehiculo: number, fechaInicio: string, fechaFin?: string): Promise<IAsignacionVehiculoResponse> {
        try {
            const response = await axiosInstance.post(this.AVPR_URL, {
                idRuta,
                idVehiculo,
                fechaAsignacionInicio: fechaInicio,
                fechaAsignacionFinalizacion: fechaFin
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    static async removeVehicleFromRoute(idAsignacion: number): Promise<IBasicResponse> {
        try {
            const response = await axiosInstance.delete(`${this.AVPR_URL}/${idAsignacion}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    // Métodos para asignación de ciudades
    static async assignCityToRoute(idRuta: number, idCiudad: number): Promise<IAsignacionCiudadResponse> {
        try {
            const response = await axiosInstance.post(this.ARPC_URL, {
                idRuta,
                idCiudad
            });
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    static async removeCityFromRoute(idAsignacion: number): Promise<IBasicResponse> {
        try {
            const response = await axiosInstance.delete(`${this.ARPC_URL}/${idAsignacion}`);
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    // Endpoints auxiliares
    static async getAvailableVehicles(): Promise<IVehiculosResponse> {
        try {
            const response = await axiosInstance.get('/gestion_vehiculos');
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    static async getAvailableCities(): Promise<ICiudadesResponse> {
        try {
            const response = await axiosInstance.get('/gestion_ciudades');
            return response.data;
        } catch (error) {
            throw this.handleError(error as ApiError);
        }
    }

    private static handleError(error: ApiError): Error {
        if (error.response?.data?.message) {
            return new Error(error.response.data.message);
        }
        return new Error(error.message || 'Error desconocido en la aplicación');
    }
}
