import axios, { AxiosResponse } from 'axios';
import { Envio } from '../../models/Interfaces/IEnvios';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const API_URL = 'http://127.0.0.1:8000/api/gestion_envios';

export const fetchEnvios = async (): Promise<ApiResponse<Envio[]>> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No autenticado');
  }

  try {
    const response: AxiosResponse<ApiResponse<Envio[]>> = await axios.get(API_URL, {
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
      throw new Error(`Error ${status}: ${message}`);
    }
    throw new Error('Error desconocido al cargar los envíos');
  }
};