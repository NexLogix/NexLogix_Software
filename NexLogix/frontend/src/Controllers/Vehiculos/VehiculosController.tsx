import axios from 'axios';
import { IVehiculo, IAsignacionVehiculo } from '../../models/Interfaces/IVehiculo';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export class VehiculosController {
    
    // Obtener todos los vehículos
    static async getAllVehiculos(): Promise<IVehiculo[]> {
        try {
            const response = await axios.get(`${API_URL}/gestion_vehiculos`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener vehículos:', error);
            throw error;
        }
    }

    // Obtener vehículo por ID
    static async getVehiculoById(id: string): Promise<IVehiculo> {
        try {
            const response = await axios.get(`${API_URL}/gestion_vehiculos/${id}`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener vehículo:', error);
            throw error;
        }
    }

    // Crear nuevo vehículo
    static async createVehiculo(vehiculo: Omit<IVehiculo, 'idVehiculo'>) {
        try {
            const response = await axios.post(`${API_URL}/gestion_vehiculos`, vehiculo);
            return response.data;
        } catch (error) {
            console.error('Error al crear vehículo:', error);
            throw error;
        }
    }

    // Actualizar vehículo
    static async updateVehiculo(id: string, vehiculo: Partial<IVehiculo>) {
        try {
            const response = await axios.patch(`${API_URL}/gestion_vehiculos/${id}`, vehiculo);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar vehículo:', error);
            throw error;
        }
    }

    // Eliminar vehículo
    static async deleteVehiculo(id: string) {
        try {
            const response = await axios.delete(`${API_URL}/gestion_vehiculos/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar vehículo:', error);
            throw error;
        }
    }

    // Obtener asignaciones de conductores por vehículo
    static async getAsignacionesConductores(): Promise<IAsignacionVehiculo[]> {
        try {
            const response = await axios.get(`${API_URL}/gestion_asignacion_conductores_por_vehiculos`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener asignaciones:', error);
            throw error;
        }
    }

    // Crear asignación conductor-vehículo
    static async createAsignacion(data: { idConductor: number; idVehiculo: number }) {
        try {
            const response = await axios.post(`${API_URL}/gestion_asignacion_conductores_por_vehiculos`, data);
            return response.data;
        } catch (error) {
            console.error('Error al crear asignación:', error);
            throw error;
        }
    }

    // Actualizar asignación
    static async updateAsignacion(id: number, data: Partial<IAsignacionVehiculo>) {
        try {
            const response = await axios.patch(`${API_URL}/gestion_asignacion_conductores_por_vehiculos/${id}`, data);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar asignación:', error);
            throw error;
        }
    }

    // Eliminar asignación
    static async deleteAsignacion(id: number) {
        try {
            const response = await axios.delete(`${API_URL}/gestion_asignacion_conductores_por_vehiculos/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al eliminar asignación:', error);
            throw error;
        }
    }
}
