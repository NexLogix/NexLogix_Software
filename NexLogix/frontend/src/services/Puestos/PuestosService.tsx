import axios, { AxiosResponse } from 'axios';
import { IPuesto, IPuesto_ApiResponse, IArea } from '../../models/Interfaces/IPuestos';

const BASE_URL = 'http://127.0.0.1:8000/api';

// GET: Obtener todas las áreas (para el select)
export const fetchAreas = async (): Promise<IPuesto_ApiResponse<IArea[]>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('fetchAreas: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('fetchAreas: Enviando solicitud a', `${BASE_URL}/gestion_areas`);
    const response: AxiosResponse<IPuesto_ApiResponse<IArea[]>> = await axios.get(`${BASE_URL}/gestion_areas`, {
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

// GET: Obtener todos los puestos
export const fetchPuestos = async (): Promise<IPuesto_ApiResponse<IPuesto[]>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('fetchPuestos: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('fetchPuestos: Enviando solicitud a', `${BASE_URL}/gestion_puestos`);
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto[]>> = await axios.get(`${BASE_URL}/gestion_puestos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('fetchPuestos: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al cargar los puestos';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`fetchPuestos: Error ${status}: ${errorMessage}`, error.response?.data);
      if (status === 401) {
        window.location.href = '/login';
      }
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('fetchPuestos: Error desconocido:', error);
    throw new Error('Error desconocido al cargar los puestos');
  }
};

// GET: Obtener un puesto por ID
export const fetchPuestoById = async (id: number): Promise<IPuesto_ApiResponse<IPuesto>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('fetchPuestoById: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('fetchPuestoById: Enviando solicitud a', `${BASE_URL}/gestion_puestos/buscar_puesto/${id}`);
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.get(`${BASE_URL}/gestion_puestos/buscar_puesto/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('fetchPuestoById: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al cargar el puesto';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`fetchPuestoById: Error ${status}: ${errorMessage}`, error.response?.data);
      if (status === 401) {
        window.location.href = '/login';
      }
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('fetchPuestoById: Error desconocido:', error);
    throw new Error('Error desconocido al cargar el puesto');
  }
};

// POST: Crear un puesto
export const createPuesto = async (data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('createPuesto: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('createPuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos/crear_puesto`, 'con datos:', data);
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.post(`${BASE_URL}/gestion_puestos/crear_puesto`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('createPuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al crear el puesto';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`createPuesto: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('createPuesto: Error desconocido:', error);
    throw new Error('Error desconocido al crear el puesto');
  }
};

// PUT: Editar un puesto completamente
export const updatePuesto = async (id: number, data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('updatePuesto: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('updatePuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos/editar_puesto/${id}`, 'con datos:', data);
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.put(`${BASE_URL}/gestion_puestos/editar_puesto/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('updatePuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al editar el puesto';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`updatePuesto: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('updatePuesto: Error desconocido:', error);
    throw new Error('Error desconocido al editar el puesto');
  }
};

// PATCH: Editar parcialmente un puesto
export const updatePartialPuesto = async (id: number, data: Partial<{ nombrePuesto: string; descripcionPuesto: string; idArea: number }>): Promise<IPuesto_ApiResponse<IPuesto>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('updatePartialPuesto: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('updatePartialPuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos/actualizar_campos_especificos_puesto/${id}`, 'con datos:', data);
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.patch(`${BASE_URL}/gestion_puestos/actualizar_campos_especificos_puesto/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('updatePartialPuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al actualizar el puesto';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`updatePartialPuesto: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('updatePartialPuesto: Error desconocido:', error);
    throw new Error('Error desconocido al actualizar el puesto');
  }
};

// DELETE: Eliminar un puesto
export const deletePuesto = async (id: number): Promise<IPuesto_ApiResponse<null>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('deletePuesto: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('deletePuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos/eliminar_puesto/${id}`);
    const response: AxiosResponse<IPuesto_ApiResponse<null>> = await axios.delete(`${BASE_URL}/gestion_puestos/eliminar_puesto/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('deletePuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al eliminar el puesto';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`deletePuesto: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('deletePuesto: Error desconocido:', error);
    throw new Error('Error desconocido al eliminar el puesto');
  }
};