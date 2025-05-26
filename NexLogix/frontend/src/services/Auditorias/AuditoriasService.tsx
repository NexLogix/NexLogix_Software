// Importa axios y AxiosResponse para realizar y tipar solicitudes HTTP
import axios, { AxiosResponse } from 'axios';
// Importa las interfaces necesarias para tipar los datos de auditorías
import { IAuditoria, IAuditoria_ApiResponse } from '../../models/Interfaces/IAuditorias';

// Define la URL base para las solicitudes a la API
const BASE_URL = 'http://127.0.0.1:8000/api';

// Define la función fetchAuditorias para obtener todas las auditorías desde la API
export const fetchAuditorias = async (): Promise<IAuditoria_ApiResponse<IAuditoria[]>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('fetchAuditorias: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('fetchAuditorias: Enviando solicitud a', `${BASE_URL}/gestion_auditorias`);
    const response: AxiosResponse<IAuditoria_ApiResponse<IAuditoria[]>> = await axios.get(`${BASE_URL}/gestion_auditorias`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Normalizar los datos: asegurarse de que details sea siempre un string
    if (response.data.success && Array.isArray(response.data.data)) {
      response.data.data = response.data.data.map((auditoria) => ({
        ...auditoria,
        details: normalizeDetails(auditoria.details),
      }));
    }
    console.log('fetchAuditorias: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al cargar las auditorías';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 ? `${message}: ${Object.values(errors).join(', ')}` : message;
      console.error(`fetchAuditorias: Error ${status}: ${errorMessage}`, error.response?.data);
      if (status === 401) {
        window.location.href = '/login';
      }
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('fetchAuditorias: Error desconocido:', error);
    throw new Error('Error desconocido al cargar las auditorías');
  }
};

// Define la función fetchAuditoriaById para obtener una auditoría específica por ID desde la API
export const fetchAuditoriaById = async (id: number): Promise<IAuditoria_ApiResponse<IAuditoria>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('fetchAuditoriaById: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('fetchAuditoriaById: Enviando solicitud a', `${BASE_URL}/gestion_auditorias/buscar_auditoria/${id}`);
    const response: AxiosResponse<IAuditoria_ApiResponse<IAuditoria>> = await axios.get(`${BASE_URL}/gestion_auditorias/buscar_auditoria/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Normalizar los datos: asegurarse de que details sea siempre un string
    if (response.data.success && response.data.data) {
      response.data.data = {
        ...response.data.data,
        details: normalizeDetails(response.data.data.details),
      };
    }
    console.log('fetchAuditoriaById: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al cargar la auditoría';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 ? `${message}: ${Object.values(errors).join(', ')}` : message;
      console.error(`fetchAuditoriaById: Error ${status}: ${errorMessage}`, error.response?.data);
      if (status === 401) {
        window.location.href = '/login';
      }
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('fetchAuditoriaById: Error desconocido:', error);
    throw new Error('Error desconocido al cargar la auditoría');
  }
};

// Define la función updateAuditoria para editar una auditoría mediante la API
export const updateAuditoria = async (id: number, data: Partial<{ action: string; resource_type: string; details: string; updated_at: string }>): Promise<IAuditoria_ApiResponse<IAuditoria>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('updateAuditoria: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('updateAuditoria: Enviando solicitud a', `${BASE_URL}/gestion_auditorias/editar_auditoria/${id}`, 'con datos:', data);
    const response: AxiosResponse<IAuditoria_ApiResponse<IAuditoria>> = await axios.patch(`${BASE_URL}/gestion_auditorias/editar_auditoria/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // Normalizar los datos: asegurarse de que details sea siempre un string
    if (response.data.success && response.data.data) {
      response.data.data = {
        ...response.data.data,
        details: normalizeDetails(response.data.data.details),
      };
    }
    console.log('updateAuditoria: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al editar la auditoría';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 ? `${message}: ${Object.values(errors).join(', ')}` : message;
      console.error(`updateAuditoria: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('updateAuditoria: Error desconocido:', error);
    throw new Error('Error desconocido al editar la auditoría');
  }
};

// Define la función deleteAuditoria para eliminar una auditoría mediante la API
export const deleteAuditoria = async (id: number): Promise<IAuditoria_ApiResponse<null>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('deleteAuditoria: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('deleteAuditoria: Enviando solicitud a', `${BASE_URL}/gestion_auditorias/eliminar_auditoria/${id}`);
    const response: AxiosResponse<IAuditoria_ApiResponse<null>> = await axios.delete(`${BASE_URL}/gestion_auditorias/eliminar_auditoria/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('deleteAuditoria: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al eliminar la auditoría';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 ? `${message}: ${Object.values(errors).join(', ')}` : message;
      console.error(`deleteAuditoria: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('deleteAuditoria: Error desconocido:', error);
    throw new Error('Error desconocido al eliminar la auditoría');
  }
};

// Función auxiliar para normalizar details a string
const normalizeDetails = (details: unknown): string => {
  if (typeof details === 'string') {
    return details;
  } else if (details === null || details === undefined) {
    return 'N/A';
  } else {
    return JSON.stringify(details);
  }
};