import axios, { AxiosResponse } from "axios";
import { IRol, IRol_ApiResponse } from "../../models/Interfaces/IRoles";

const BASE_URL = "http://127.0.0.1:8000/api";

// GET: Todos los roles
export const fetchRoles = async (): Promise<IRol_ApiResponse<IRol[]>> => {
  const token = localStorage.getItem("token");
  const response: AxiosResponse<IRol_ApiResponse<IRol[]>> = await axios.get(`${BASE_URL}/gestion_roles`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// POST: Crear rol
export const createRol = async (
  data: { nombreRole: string; descripcionRole: string }
): Promise<IRol_ApiResponse<IRol>> => {
  const token = localStorage.getItem("token");
  const response: AxiosResponse<IRol_ApiResponse<IRol>> = await axios.post(`${BASE_URL}/gestion_roles`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// PATCH: Editar rol
export const updateRol = async (
  id: number,
  data: { nombreRole: string; descripcionRole: string }
): Promise<IRol_ApiResponse<IRol>> => {
  const token = localStorage.getItem("token");
  const response: AxiosResponse<IRol_ApiResponse<IRol>> = await axios.patch(`${BASE_URL}/gestion_roles/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// DELETE: Eliminar rol
export const deleteRol = async (id: number): Promise<IRol_ApiResponse<null>> => {
  const token = localStorage.getItem("token");
  const response: AxiosResponse<IRol_ApiResponse<null>> = await axios.delete(`${BASE_URL}/gestion_roles/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};