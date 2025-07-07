import { createConductor as createConductorService, updateConductor as updateConductorService } from "../services/ConductoresService";
import { IConductor } from "../models/Interfaces/IConductor";

export class ConductoresUseCase {
  private validateFields(data: Partial<IConductor>): void {
    if (!data.licencia) throw new Error("La licencia es requerida");
    if (!data.tipoLicencia) throw new Error("El tipo de licencia es requerido");
    if (!data.vigenciaLicencia) throw new Error("La vigencia de la licencia es requerida");
    if (!data.estado) throw new Error("El estado es requerido");
    if (!data.idUsuario) throw new Error("El ID de usuario es requerido");

    const vigencia = new Date(data.vigenciaLicencia);
    if (vigencia <= new Date()) {
      throw new Error("La vigencia de la licencia debe ser una fecha futura");
    }

    const estadosValidos = ['disponible', 'en ruta', 'descanso', 'inactivo'];
    if (!estadosValidos.includes(data.estado.toLowerCase())) {
      throw new Error("El estado del conductor no es válido");
    }
  }

  async create(data: Partial<IConductor>): Promise<IConductor> {
    this.validateFields(data);
    return await createConductorService(data);
  }

  async update(id: number, data: Partial<IConductor>): Promise<IConductor> {
    if (!id) throw new Error("El ID del conductor es requerido");
    
    if (Object.keys(data).length > 0) {
      this.validateFields({ ...data, idConductor: id });
    }

    return await updateConductorService(id, data);
  }
}
