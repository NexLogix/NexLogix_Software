import axios, { AxiosResponse } from 'axios';
import { IArea, IArea_ApiResponse } from '../../models/Interfaces/IAreas';

const BASE_URL = 'http://127.0.0.1:8000/api';

// GET: Obtener todas las áreas
export const fetchAreas = async (): Promise<IArea_ApiResponse<IArea[]>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('fetchAreas: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('fetchAreas: Enviando solicitud a', `${BASE_URL}/gestion_areas`);
    const response: AxiosResponse<IArea_ApiResponse<IArea[]>> = await axios.get(`${BASE_URL}/gestion_areas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('fetchAreas: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al cargar las áreas';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`fetchAreas: Error ${status}: ${errorMessage}`, error.response?.data);
      if (status === 401) {
        window.location.href = '/login';
      }
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('fetchAreas: Error desconocido:', error);
    throw new Error('Error desconocido al cargar las áreas');
  }
};

// POST: Crear un área
export const createArea = async (data: { nombreArea: string; descripcionArea?: string }): Promise<IArea_ApiResponse<IArea>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('createArea: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('createArea: Enviando solicitud a', `${BASE_URL}/gestion_areas`, 'con datos:', data);
    const response: AxiosResponse<IArea_ApiResponse<IArea>> = await axios.post(`${BASE_URL}/gestion_areas`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('createArea: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al crear el área';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`createArea: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('createArea: Error desconocido:', error);
    throw new Error('Error desconocido al crear el área');
  }
};

// PUT: Editar un área completa
export const updateArea = async (id: number, data: { nombreArea: string; descripcionArea: string }): Promise<IArea_ApiResponse<IArea>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('updateArea: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('updateArea: Enviando solicitud a', `${BASE_URL}/gestion_areas/${id}`, 'con datos:', data);
    const response: AxiosResponse<IArea_ApiResponse<IArea>> = await axios.put(`${BASE_URL}/gestion_areas/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('updateArea: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al editar el área';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`updateArea: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('updateArea: Error desconocido:', error);
    throw new Error('Error desconocido al editar el área');
  }
};

// PATCH: Editar parcialmente un área
export const updatePartialArea = async (id: number, data: Partial<{ nombreArea: string; descripcionArea: string }>): Promise<IArea_ApiResponse<IArea>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('updatePartialArea: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('updatePartialArea: Enviando solicitud a', `${BASE_URL}/gestion_areas/${id}`, 'con datos:', data);
    const response: AxiosResponse<IArea_ApiResponse<IArea>> = await axios.patch(`${BASE_URL}/gestion_areas/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('updatePartialArea: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al actualizar el área';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`updatePartialArea: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('updatePartialArea: Error desconocido:', error);
    throw new Error('Error desconocido al actualizar el área');
  }
};

// DELETE: Eliminar un área
export const deleteArea = async (id: number): Promise<IArea_ApiResponse<null>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('deleteArea: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('deleteArea: Enviando solicitud a', `${BASE_URL}/gestion_areas/${id}`);
    const response: AxiosResponse<IArea_ApiResponse<null>> = await axios.delete(`${BASE_URL}/gestion_areas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('deleteArea: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al eliminar el área';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`deleteArea: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('deleteArea: Error desconocido:', error);
    throw new Error('Error desconocido al eliminar el área');
  }
};

// GET: Obtener un área por ID
export const fetchAreaById = async (id: number): Promise<IArea_ApiResponse<IArea>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No autenticado');
  }
  try {
    const response: AxiosResponse<IArea_ApiResponse<IArea>> = await axios.get(`${BASE_URL}/gestion_areas/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al buscar el área';
      throw new Error(`Error ${status}: ${message}`);
    }
    throw new Error('Error desconocido al buscar el área');
  }
};