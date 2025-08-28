import { axiosInstance } from '../services/axiosConfig';
import { 
    IVehiculo, 
    IVehiculoApiResponse, 
    IAsignacionVehiculo, 
    IAsignacionVehiculoApiResponse 
} from '../models/Interfaces/IVehiculo';
import { IConductor, IConductorApiResponse } from '../models/Interfaces/IConductor';

export class VehiculosController {
    // Obtener todos los vehículos
    static async getAllVehiculos(): Promise<IVehiculo[]> {
        try {
            const response = await axiosInstance.get<IVehiculoApiResponse>('http://127.0.0.1:8000/api/gestion_vehiculos');
            return Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        } catch (error) {
            console.error('Error al obtener vehículos:', error);
            throw error;
        }
    }

    // Obtener vehículo por ID
    static async getVehiculoById(id: string): Promise<IVehiculo> {
        try {
            const response = await axiosInstance.get<IVehiculoApiResponse>(`http://127.0.0.1:8000/api/gestion_vehiculos/${id}`);
            return Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
        } catch (error) {
            console.error('Error al obtener vehículo:', error);
            throw error;
        }
    }

    // Crear nuevo vehículo
    static async createVehiculo(vehiculo: Omit<IVehiculo, 'idVehiculo'>): Promise<IVehiculo> {
        try {
            const response = await axiosInstance.post<IVehiculoApiResponse>('http://127.0.0.1:8000/api/gestion_vehiculos', vehiculo);
            return Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
        } catch (error) {
            console.error('Error al crear vehículo:', error);
            throw error;
        }
    }

    // Actualizar vehículo
    static async updateVehiculo(id: string, vehiculo: Partial<IVehiculo>): Promise<IVehiculo> {
        try {
            const response = await axiosInstance.patch<IVehiculoApiResponse>(`http://127.0.0.1:8000/api/gestion_vehiculos/${id}`, vehiculo);
            return Array.isArray(response.data.data) ? response.data.data[0] : response.data.data;
        } catch (error) {
            console.error('Error al actualizar vehículo:', error);
            throw error;
        }
    }

    // Eliminar vehículo
    static async deleteVehiculo(id: string): Promise<boolean> {
        try {
            const response = await axiosInstance.delete<IVehiculoApiResponse>(`http://127.0.0.1:8000/api/gestion_vehiculos/${id}`);
            return response.data.success;
        } catch (error) {
            console.error('Error al eliminar vehículo:', error);
            throw error;
        }
    }

    // Obtener asignaciones de conductores por vehículo
    static async getAsignacionesConductores(): Promise<IAsignacionVehiculo[]> {
        try {
            const response = await axiosInstance.get<IAsignacionVehiculoApiResponse>('http://127.0.0.1:8000/api/gestion_asignacion_conductores_por_vehiculos');
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener asignaciones:', error);
            throw error;
        }
    }

    // Crear asignación conductor-vehículo
    static async createAsignacion(data: { idConductor: number; idVehiculo: number }): Promise<IAsignacionVehiculo> {
        try {
            const response = await axiosInstance.post<IAsignacionVehiculoApiResponse>('http://127.0.0.1:8000/api/gestion_asignacion_conductores_por_vehiculos', data);
            return response.data.data[0];
        } catch (error) {
            console.error('Error al crear asignación:', error);
            throw error;
        }
    }

    // Actualizar asignación
    static async updateAsignacion(id: number, data: { fecha_entrega_vehiculo: string }): Promise<IAsignacionVehiculo> {
        try {
            const response = await axiosInstance.patch<IAsignacionVehiculoApiResponse>(`http://127.0.0.1:8000/api/gestion_asignacion_conductores_por_vehiculos/${id}`, data);
            return response.data.data[0];
        } catch (error) {
            console.error('Error al actualizar asignación:', error);
            throw error;
        }
    }

    // Eliminar asignación
    static async deleteAsignacion(id: number): Promise<boolean> {
        try {
            const response = await axiosInstance.delete<IAsignacionVehiculoApiResponse>(`http://127.0.0.1:8000/api/gestion_asignacion_conductores_por_vehiculos/${id}`);
            return response.data.success;
        } catch (error) {
            console.error('Error al eliminar asignación:', error);
            throw error;
        }
    }

    // Obtener conductores activos
    static async getActiveConductors(): Promise<IConductor[]> {
        try {
            const response = await axiosInstance.get<IConductorApiResponse>('http://127.0.0.1:8000/api/gestion_conductores/filtro_conductores_activos');
            return Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        } catch (error) {
            console.error('Error al obtener conductores activos:', error);
            throw error;
        }
    }
}
