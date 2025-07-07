import { createArea, updateArea, updatePartialArea } from '../../../services/Areas/AreasService';
import { IArea, IArea_ApiResponse } from '../../../models/Interfaces/IAreas';

export class AreasUseCase {
  // POST: Crear área
  async executeCreateArea(data: { nombreArea: string; descripcionArea?: string }): Promise<IArea_ApiResponse<IArea>> {
    console.log('AreasUseCase: Ejecutando executeCreateArea con datos:', data);
    
    // Validaciones adicionales en el frontend
    if (!data.nombreArea.trim()) {
      console.error('AreasUseCase: Error de validación - nombreArea es requerido');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as IArea,
        errors: { nombreArea: 'El nombre del área es requerido' },
        status: 422,
      };
    }

    try {
      const response = await createArea(data);
      console.log('AreasUseCase: Respuesta de createArea:', response);
      return response;
    } catch (error) {
      console.error('AreasUseCase: Error en executeCreateArea:', error);
      throw error;
    }
  }

  // PUT: Editar área completa
  async executeUpdateArea(id: number, data: { nombreArea: string; descripcionArea: string }): Promise<IArea_ApiResponse<IArea>> {
    console.log('AreasUseCase: Ejecutando executeUpdateArea con ID:', id, 'y datos:', data);
    
    // Validaciones adicionales
    if (!data.nombreArea.trim() || !data.descripcionArea.trim()) {
      console.error('AreasUseCase: Error de validación - campos requeridos');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as IArea,
        errors: {
          ...(data.nombreArea.trim() ? {} : { nombreArea: 'El nombre del área es requerido' }),
          ...(data.descripcionArea.trim() ? {} : { descripcionArea: 'La descripción es requerida' }),
        },
        status: 422,
      };
    }

    try {
      const response = await updateArea(id, data);
      console.log('AreasUseCase: Respuesta de updateArea:', response);
      return response;
    } catch (error) {
      console.error('AreasUseCase: Error en executeUpdateArea:', error);
      throw error;
    }
  }

  // PATCH: Editar parcialmente
  async executeUpdatePartialArea(id: number, data: Partial<{ nombreArea: string; descripcionArea: string }>): Promise<IArea_ApiResponse<IArea>> {
    console.log('AreasUseCase: Ejecutando executeUpdatePartialArea con ID:', id, 'y datos:', data);
    
    // Validaciones adicionales (opcional, ya que PATCH permite campos opcionales)
    const cleanedData: Partial<{ nombreArea: string; descripcionArea: string }> = {};
    if (data.nombreArea !== undefined) {
      cleanedData.nombreArea = data.nombreArea.trim();
      if (!cleanedData.nombreArea) {
        console.error('AreasUseCase: Error de validación - nombreArea no puede estar vacío si se proporciona');
        return {
          success: false,
          message: 'Errores de validación',
          data: {} as IArea,
          errors: { nombreArea: 'El nombre del área no puede estar vacío' },
          status: 422,
        };
      }
    }
    if (data.descripcionArea !== undefined) {
      cleanedData.descripcionArea = data.descripcionArea.trim();
      if (!cleanedData.descripcionArea) {
        console.error('AreasUseCase: Error de validación - descripcionArea no puede estar vacío si se proporciona');
        return {
          success: false,
          message: 'Errores de validación',
          data: {} as IArea,
          errors: { descripcionArea: 'La descripción no puede estar vacía' },
          status: 422,
        };
      }
    }

    try {
      const response = await updatePartialArea(id, cleanedData);
      console.log('AreasUseCase: Respuesta de updatePartialArea:', response);
      return response;
    } catch (error) {
      console.error('AreasUseCase: Error en executeUpdatePartialArea:', error);
      throw error;
    }
  }
}