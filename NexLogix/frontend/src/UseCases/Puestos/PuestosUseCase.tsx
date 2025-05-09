import { createPuesto, updatePuesto, updatePartialPuesto } from '../../services/Puestos/PuestosService';
import { IPuesto, IPuesto_ApiResponse } from '../../models/Interfaces/IPuestos';

export class PuestosUseCase {
  // POST: Crear puesto
  async executeCreatePuesto(data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> {
    console.log('PuestosUseCase: Ejecutando executeCreatePuesto con datos:', data);
    
    // Validaciones adicionales en el frontend
    if (!data.nombrePuesto.trim()) {
      console.error('PuestosUseCase: Error de validación - nombrePuesto es requerido');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as IPuesto,
        errors: { nombrePuesto: 'El nombre del puesto es requerido' },
        status: 422,
      };
    }
    if (data.idArea <= 0) {
      console.error('PuestosUseCase: Error de validación - idArea debe ser un número positivo');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as IPuesto,
        errors: { idArea: 'El ID del área debe ser un número positivo' },
        status: 422,
      };
    }

    try {
      const response = await createPuesto(data);
      console.log('PuestosUseCase: Respuesta de createPuesto:', response);
      return response;
    } catch (error) {
      console.error('PuestosUseCase: Error en executeCreatePuesto:', error);
      throw error;
    }
  }

  // PUT: Editar puesto completamente
  async executeUpdatePuesto(id: number, data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> {
    console.log('PuestosUseCase: Ejecutando executeUpdatePuesto con ID:', id, 'y datos:', data);
    
    // Validaciones adicionales
    if (!data.nombrePuesto.trim()) {
      console.error('PuestosUseCase: Error de validación - nombrePuesto es requerido');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as IPuesto,
        errors: { nombrePuesto: 'El nombre del puesto es requerido' },
        status: 422,
      };
    }
    if (data.idArea <= 0) {
      console.error('PuestosUseCase: Error de validación - idArea debe ser un número positivo');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as IPuesto,
        errors: { idArea: 'El ID del área debe ser un número positivo' },
        status: 422,
      };
    }

    try {
      const response = await updatePuesto(id, data);
      console.log('PuestosUseCase: Respuesta de updatePuesto:', response);
      return response;
    } catch (error) {
      console.error('PuestosUseCase: Error en executeUpdatePuesto:', error);
      throw error;
    }
  }

  // PATCH: Editar parcialmente
  async executeUpdatePartialPuesto(id: number, data: Partial<{ nombrePuesto: string; descripcionPuesto: string; idArea: number }>): Promise<IPuesto_ApiResponse<IPuesto>> {
    console.log('PuestosUseCase: Ejecutando executeUpdatePartialPuesto con ID:', id, 'y datos:', data);
    
    // Validaciones adicionales (opcional, ya que PATCH permite campos opcionales)
    const cleanedData: Partial<{ nombrePuesto: string; descripcionPuesto: string; idArea: number }> = {};
    if (data.nombrePuesto !== undefined) {
      cleanedData.nombrePuesto = data.nombrePuesto.trim();
      if (!cleanedData.nombrePuesto) {
        console.error('PuestosUseCase: Error de validación - nombrePuesto no puede estar vacío si se proporciona');
        return {
          success: false,
          message: 'Errores de validación',
          data: {} as IPuesto,
          errors: { nombrePuesto: 'El nombre del puesto no puede estar vacío' },
          status: 422,
        };
      }
    }
    if (data.descripcionPuesto !== undefined) {
      cleanedData.descripcionPuesto = data.descripcionPuesto.trim();
    }
    if (data.idArea !== undefined) {
      cleanedData.idArea = data.idArea;
      if (cleanedData.idArea <= 0) {
        console.error('PuestosUseCase: Error de validación - idArea debe ser un número positivo si se proporciona');
        return {
          success: false,
          message: 'Errores de validación',
          data: {} as IPuesto,
          errors: { idArea: 'El ID del área debe ser un número positivo' },
          status: 422,
        };
      }
    }

    try {
      const response = await updatePartialPuesto(id, cleanedData);
      console.log('PuestosUseCase: Respuesta de updatePartialPuesto:', response);
      return response;
    } catch (error) {
      console.error('PuestosUseCase: Error en executeUpdatePartialPuesto:', error);
      throw error;
    }
  }
}