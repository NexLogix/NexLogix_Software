import {
  getConductores,
  deleteConductor,
  getUsuarios,
} from "../services/ConductoresService";
import { IConductor } from "../models/Interfaces/IConductor";
import { ConductoresUseCase } from "../UseCases/ConductoresUseCase";
import { IUsuariosApiResponse } from "../services/ConductoresService";

const conductoresUseCase = new ConductoresUseCase();

export const ConductoresController = {
  // GET: directo al service
  getAllConductores: async () => {
    return await getConductores();
  },

  // POST: usa el UseCase
  createConductor: async (data: Partial<IConductor>) => {
    return await conductoresUseCase.create(data);
  },

  // PATCH: usa el UseCase
  updateConductor: async (id: number, data: Partial<IConductor>) => {
    return await conductoresUseCase.update(id, data);
  },

  // DELETE: directo al service
  deleteConductor: async (id: number): Promise<boolean> => {
    if (!id) {
      throw new Error('El ID del conductor es requerido');
    }
    try {
      return await deleteConductor(id);
    } catch (error) {
      console.error('Error en el controlador al eliminar conductor:', error);
      throw error;
    }
  },

  // Métodos auxiliares que van directo al service
  getAllUsuarios: async (): Promise<IUsuariosApiResponse> => {
    return await getUsuarios();
  },
};
