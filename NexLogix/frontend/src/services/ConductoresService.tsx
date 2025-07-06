import axios from "axios";
import { IConductor } from "../models/Interfaces/IConductor";
import { IUsuario, IRol, IEstado, IPuesto } from "../models/Interfaces/IGestionUsuarios";

const BASE_URL = "http://127.0.0.1:8000/api";

// --- Conductores ---
export const getConductores = async (): Promise<IConductor[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/gestion_conductores`);
    console.log("Conductores recibidos:", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Error al obtener conductores:", error);
    throw error;
  }
};

export const createConductor = async (data: Partial<IConductor>) => {
  try {
    const res = await axios.post(`${BASE_URL}/gestion_conductores`, data);
    console.log("Conductor creado:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error al crear conductor:", error);
    throw error;
  }
};

export const updateConductor = async (id: number, data: Partial<IConductor>) => {
  try {
    const res = await axios.patch(`${BASE_URL}/gestion_conductores/${id}`, data);
    console.log("Conductor actualizado:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error al actualizar conductor:", error);
    throw error;
  }
};

export const deleteConductor = async (id: number) => {
  try {
    const res = await axios.delete(`${BASE_URL}/gestion_conductores/${id}`);
    console.log("Conductor eliminado:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error al eliminar conductor:", error);
    throw error;
  }
};

// --- Usuarios ---
export const getUsuarios = async (): Promise<IUsuario[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/gestion_usuarios`);
    console.log("Usuarios recibidos:", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const createUsuario = async (data: Partial<IUsuario>) => {
  try {
    const res = await axios.post(`${BASE_URL}/gestion_usuarios`, data);
    console.log("Usuario creado:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};

// --- Roles ---
export const getRoles = async (): Promise<IRol[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/gestion_roles`);
    console.log("Roles recibidos:", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Error al obtener roles:", error);
    throw error;
  }
};

// --- Estados ---
export const getEstados = async (): Promise<IEstado[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/gestion_estados`);
    console.log("Estados recibidos:", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Error al obtener estados:", error);
    throw error;
  }
};

// --- Puestos ---
export const getPuestos = async (): Promise<IPuesto[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/gestion_puestos`);
    console.log("Puestos recibidos:", res.data);
    return res.data.data;
  } catch (error) {
    console.error("Error al obtener puestos:", error);
    throw error;
  }
};