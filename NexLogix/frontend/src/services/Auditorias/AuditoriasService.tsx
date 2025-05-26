import axios, { AxiosResponse } from 'axios';
import { IAuditoria, IAuditoriaApiResponse } from '../../models/Interfaces/IAuditorias';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchAuditorias = async (): Promise<IAuditoriaApiResponse<IAuditoria[]>> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  try {
    const response: AxiosResponse<IAuditoriaApiResponse<IAuditoria[]>> = await axios.get(`${BASE_URL}/gestion_auditorias`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message ?? 'Error al cargar las auditorías';
      throw new Error(message);
    }
    throw new Error('Error desconocido al cargar las auditorías');
  }
};

export const fetchAuditoriaById = async (id: number): Promise<IAuditoriaApiResponse<IAuditoria>> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  try {
    const response: AxiosResponse<IAuditoriaApiResponse<IAuditoria>> = await axios.get(`${BASE_URL}/gestion_auditorias/buscar_auditoria/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message ?? 'Error al cargar la auditoría';
      throw new Error(message);
    }
    throw new Error('Error desconocido al cargar la auditoría');
  }
};

export const updatePartialAuditoria = async (id: number, data: Partial<IAuditoria>): Promise<IAuditoriaApiResponse<IAuditoria>> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  try {
    const response: AxiosResponse<IAuditoriaApiResponse<IAuditoria>> = await axios.patch(`${BASE_URL}/gestion_auditorias/editar_auditoria/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message ?? 'Error al actualizar la auditoría';
      throw new Error(message);
    }
    throw new Error('Error desconocido al actualizar la auditoría');
  }
};

export const deleteAuditoria = async (id: number): Promise<IAuditoriaApiResponse<null>> => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No autenticado');
  try {
    const response: AxiosResponse<IAuditoriaApiResponse<null>> = await axios.delete(`${BASE_URL}/gestion_auditorias/eliminar_auditoria/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message ?? 'Error al eliminar la auditoría';
      throw new Error(message);
    }
    throw new Error('Error desconocido al eliminar la auditoría');
  }
};