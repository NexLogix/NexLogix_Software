import axios, { AxiosResponse } from 'axios';
import { Envio, Ciudad, CategoriaEnvio, RecogidaData, EntregaData, EnvioData } from '../../models/Interfaces/IEnvios';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string>;
  status?: number;
}

const BASE_URL = 'http://127.0.0.1:8000/api';

// Obtener lista de ciudades
export const fetchCiudades = async (): Promise<ApiResponse<Ciudad[]>> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  try {
    const response: AxiosResponse<ApiResponse<Ciudad[]>> = await axios.get(`${BASE_URL}/gestion_ciudades`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al cargar las ciudades';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    throw new Error('Error desconocido al cargar las ciudades');
  }
};

// Obtener lista de categorías
export const fetchCategoriasEnvio = async (): Promise<ApiResponse<CategoriaEnvio[]>> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  try {
    const response: AxiosResponse<ApiResponse<CategoriaEnvio[]>> = await axios.get(`${BASE_URL}/gestion_categoria_envios`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al cargar las categorías';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    throw new Error('Error desconocido al cargar las categorías');
  }
};

// Crear una recogida
export const createRecogida = async (data: RecogidaData): Promise<ApiResponse<{ idRecogida: number }>> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  try {
    const response: AxiosResponse<ApiResponse<{ idRecogida: number }>> = await axios.post(
      `${BASE_URL}/gestion_recogidas/crear_recogida`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al crear la recogida';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    throw new Error('Error desconocido al crear la recogida');
  }
};

// Crear una entrega
export const createEntrega = async (data: EntregaData): Promise<ApiResponse<{ idEntrega: number }>> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  try {
    const response: AxiosResponse<ApiResponse<{ idEntrega: number }>> = await axios.post(
      `${BASE_URL}/gestion_entregas/crear_entrega`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al crear la entrega';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    throw new Error('Error desconocido al crear la entrega');
  }
};

// Crear un envío
export const createEnvio = async (data: EnvioData): Promise<ApiResponse<Envio>> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  try {
    const response: AxiosResponse<ApiResponse<Envio>> = await axios.post(`${BASE_URL}/gestion_envios/crear_envio`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al crear el envío';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    throw new Error('Error desconocido al crear el envío');
  }
};

// Métodos existentes
export const fetchEnvios = async (): Promise<ApiResponse<Envio[]>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No autenticado');
  }
  try {
    const response: AxiosResponse<ApiResponse<Envio[]>> = await axios.get(`${BASE_URL}/gestion_envios`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Respuesta completa del servidor:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al cargar los envíos';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    throw new Error('Error desconocido al cargar los envíos');
  }
};

export const fetchEnvioPorId = async (idEnvio: number): Promise<ApiResponse<Envio>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No autenticado');
  }
  try {
    const response: AxiosResponse<ApiResponse<Envio>> = await axios.get(`${BASE_URL}/gestion_envios/buscar_envio/${idEnvio}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('Respuesta completa del servidor (búsqueda por ID):', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500;
      const message = error.response?.data?.message ?? 'Error al buscar el envío';
      const errors = error.response?.data?.errors ?? {};
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    throw new Error('Error desconocido al buscar el envío');
  }
};