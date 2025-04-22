import axios, { AxiosResponse } from 'axios';
import { ICiudad, ICiudad_ApiResponse } from '../../models/Interfaces/ICiudades';

const BASE_URL = 'http://127.0.0.1:8000/api';

// GET: Obtener todas las ciudades
export const fetchCiudades = async (): Promise<ICiudad_ApiResponse<ICiudad[]>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('fetchCiudades: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('fetchCiudades: Enviando solicitud a', `${BASE_URL}/gestion_ciudades`);
    const response: AxiosResponse<ICiudad_ApiResponse<ICiudad[]>> = await axios.get(`${BASE_URL}/gestion_ciudades`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('fetchCiudades: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al cargar las ciudades';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`fetchCiudades: Error ${status}: ${errorMessage}`, error.response?.data);
      // Excepcion de status 401, que dice que, si las credenciales no estan autorizadas, se cierra la seccion y redirije a Login
      if (status === 401) {
        window.location.href = '/login';
      }
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('fetchCiudades: Error desconocido:', error);
    throw new Error('Error desconocido al cargar las ciudades');
  }
};

// GET: Obtener una ciudad por ID
export const fetchCiudadById = async (id: number): Promise<ICiudad_ApiResponse<ICiudad>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('fetchCiudadById: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('fetchCiudadById: Enviando solicitud a', `${BASE_URL}/gestion_ciudades/buscar_ciudad/${id}`);
    const response: AxiosResponse<ICiudad_ApiResponse<ICiudad>> = await axios.get(`${BASE_URL}/gestion_ciudades/buscar_ciudad/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('fetchCiudadById: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al cargar la ciudad';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`fetchCiudadById: Error ${status}: ${errorMessage}`, error.response?.data);
    // Excepcion de status 401, que dice que, si las credenciales no estan autorizadas, se cierra la seccion y redirije a Login
      if (status === 401) {
        window.location.href = '/login';
      }
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('fetchCiudadById: Error desconocido:', error);
    throw new Error('Error desconocido al cargar la ciudad');
  }
};

// POST: Crear una ciudad
export const createCiudad = async (data: { nombreCiudad: string; costoPor_Ciudad: number }): Promise<ICiudad_ApiResponse<ICiudad>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('createCiudad: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('createCiudad: Enviando solicitud a', `${BASE_URL}/gestion_ciudades/crear_ciudad`, 'con datos:', data);
    const response: AxiosResponse<ICiudad_ApiResponse<ICiudad>> = await axios.post(`${BASE_URL}/gestion_ciudades/crear_ciudad`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('createCiudad: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al crear la ciudad';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`createCiudad: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('createCiudad: Error desconocido:', error);
    throw new Error('Error desconocido al crear la ciudad');
  }
};

// PATCH: Editar parcialmente una ciudad
export const updatePartialCiudad = async (id: number, data: Partial<{ nombreCiudad: string; costoPor_Ciudad: number }>): Promise<ICiudad_ApiResponse<ICiudad>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('updatePartialCiudad: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('updatePartialCiudad: Enviando solicitud a', `${BASE_URL}/gestion_ciudades/editar_ciudad/${id}`, 'con datos:', data);
    const response: AxiosResponse<ICiudad_ApiResponse<ICiudad>> = await axios.patch(`${BASE_URL}/gestion_ciudades/editar_ciudad/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    console.log('updatePartialCiudad: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al actualizar la ciudad';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`updatePartialCiudad: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('updatePartialCiudad: Error desconocido:', error);
    throw new Error('Error desconocido al actualizar la ciudad');
  }
};

// DELETE: Eliminar una ciudad
export const deleteCiudad = async (id: number): Promise<ICiudad_ApiResponse<null>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('deleteCiudad: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    console.log('deleteCiudad: Enviando solicitud a', `${BASE_URL}/gestion_ciudades/eliminar_ciudad/${id}`);
    const response: AxiosResponse<ICiudad_ApiResponse<null>> = await axios.delete(`${BASE_URL}/gestion_ciudades/eliminar_ciudad/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('deleteCiudad: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al eliminar la ciudad';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`deleteCiudad: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    console.error('deleteCiudad: Error desconocido:', error);
    throw new Error('Error desconocido al eliminar la ciudad');
  }
};