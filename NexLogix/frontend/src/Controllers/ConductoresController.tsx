import {
  getConductores,
  createConductor,
  updateConductor,
  deleteConductor,
  getUsuarios,
  createUsuario,
  getRoles,
  getEstados,
  getPuestos
} from "../services/ConductoresService";
import { IConductor } from "../models/Interfaces/IConductor";
import { IUsuario } from "../models/Interfaces/IGestionUsuarios";

export const ConductoresController = {
  getAllConductores: async () => {
    return await getConductores();
  },
  createConductor: async (data: Partial<IConductor>) => {
    return await createConductor(data);
  },
  updateConductor: async (id: number, data: Partial<IConductor>) => {
    return await updateConductor(id, data);
  },
  deleteConductor: async (id: number) => {
    return await deleteConductor(id);
  },
  getAllUsuarios: async () => {
    return await getUsuarios();
  },
  createUsuario: async (data: Partial<IUsuario>) => {
    return await createUsuario(data);
  },
  getAllRoles: async () => {
    return await getRoles();
  },
  getAllEstados: async () => {
    return await getEstados();
  },
  getAllPuestos: async () => {
    return await getPuestos();
  }
};
