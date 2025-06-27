import axios, { AxiosResponse } from "axios";
import { IReporte, IReporte_ApiResponse } from "../../models/Interfaces/IReportes";

const BASE_URL = "http://127.0.0.1:8000/api";

// GET: Todos los reportes
export const fetchReportes = async (): Promise<IReporte_ApiResponse<IReporte[]>> => {
  const token = localStorage.getItem("token");
  const response: AxiosResponse<IReporte_ApiResponse<IReporte[]>> = await axios.get(`${BASE_URL}/gestion_reportes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// POST: Crear reporte
export const createReporte = async (
  data: { tipoReporte: string; descripcion: string }
): Promise<IReporte_ApiResponse<IReporte>> => {
  const token = localStorage.getItem("token");
  const response: AxiosResponse<IReporte_ApiResponse<IReporte>> = await axios.post(
    `${BASE_URL}/gestion_reportes`,
    data,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// PATCH: Editar reporte
export const updateReporte = async (id: number, data: Partial<Omit<IReporte, "idReporte" | "users">>): Promise<IReporte_ApiResponse<IReporte>> => {
  const token = localStorage.getItem("token");
  const response: AxiosResponse<IReporte_ApiResponse<IReporte>> = await axios.patch(`${BASE_URL}/gestion_reportes/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// DELETE: Eliminar reporte
export const deleteReporte = async (id: number): Promise<IReporte_ApiResponse<null>> => {
  const token = localStorage.getItem("token");
  const response: AxiosResponse<IReporte_ApiResponse<null>> = await axios.delete(`${BASE_URL}/gestion_reportes/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};