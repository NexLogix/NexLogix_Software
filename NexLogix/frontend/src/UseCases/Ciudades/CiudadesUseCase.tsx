import { createCiudad, updateCiudad, updatePartialCiudad } from '../../services/Ciudades/CiudadesService';
import { ICiudad, ICiudad_ApiResponse } from '../../models/Interfaces/ICiudades';

export class CiudadesUseCase {
  // POST: Crear ciudad
  async executeCreateCiudad(data: { nombreCiudad: string; costoPor_Ciudad: number }): Promise<ICiudad_ApiResponse<ICiudad>> {
    console.log('CiudadesUseCase: Ejecutando executeCreateCiudad con datos:', data);
    
    // Validaciones adicionales en el frontend
    if (!data.nombreCiudad.trim()) {
      console.error('CiudadesUseCase: Error de validación - nombreCiudad es requerido');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as ICiudad,
        errors: { nombreCiudad: 'El nombre de la ciudad es requerido' },
        status: 422,
      };
    }
    if (data.costoPor_Ciudad < 0) {
      console.error('CiudadesUseCase: Error de validación - costoPor_Ciudad no puede ser negativo');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as ICiudad,
        errors: { costoPor_Ciudad: 'El costo por ciudad no puede ser negativo' },
        status: 422,
      };
    }

    try {
      const response = await createCiudad(data);
      console.log('CiudadesUseCase: Respuesta de createCiudad:', response);
      return response;
    } catch (error) {
      console.error('CiudadesUseCase: Error en executeCreateCiudad:', error);
      throw error;
    }
  }

  // PUT: Editar ciudad completamente
  async executeUpdateCiudad(id: number, data: { nombreCiudad: string; costoPor_Ciudad: number }): Promise<ICiudad_ApiResponse<ICiudad>> {
    console.log('CiudadesUseCase: Ejecutando executeUpdateCiudad con ID:', id, 'y datos:', data);
    
    // Validaciones adicionales
    if (!data.nombreCiudad.trim()) {
      console.error('CiudadesUseCase: Error de validación - nombreCiudad es requerido');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as ICiudad,
        errors: { nombreCiudad: 'El nombre de la ciudad es requerido' },
        status: 422,
      };
    }
    if (data.costoPor_Ciudad < 0) {
      console.error('CiudadesUseCase: Error de validación - costoPor_Ciudad no puede ser negativo');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as ICiudad,
        errors: { costoPor_Ciudad: 'El costo por ciudad no puede ser negativo' },
        status: 422,
      };
    }

    try {
      const response = await updateCiudad(id, data);
      console.log('CiudadesUseCase: Respuesta de updateCiudad:', response);
      return response;
    } catch (error) {
      console.error('CiudadesUseCase: Error en executeUpdateCiudad:', error);
      throw error;
    }
  }

  // PATCH: Editar parcialmente
  async executeUpdatePartialCiudad(id: number, data: Partial<{ nombreCiudad: string; costoPor_Ciudad: number }>): Promise<ICiudad_ApiResponse<ICiudad>> {
    console.log('CiudadesUseCase: Ejecutando executeUpdatePartialCiudad con ID:', id, 'y datos:', data);
    
    // Validaciones adicionales (opcional, ya que PATCH permite campos opcionales)
    const cleanedData: Partial<{ nombreCiudad: string; costoPor_Ciudad: number }> = {};
    if (data.nombreCiudad !== undefined) {
      cleanedData.nombreCiudad = data.nombreCiudad.trim();
      if (!cleanedData.nombreCiudad) {
        console.error('CiudadesUseCase: Error de validación - nombreCiudad no puede estar vacío si se proporciona');
        return {
          success: false,
          message: 'Errores de validación',
          data: {} as ICiudad,
          errors: { nombreCiudad: 'El nombre de la ciudad no puede estar vacío' },
          status: 422,
        };
      }
    }
    if (data.costoPor_Ciudad !== undefined) {
      cleanedData.costoPor_Ciudad = data.costoPor_Ciudad;
      if (cleanedData.costoPor_Ciudad < 0) {
        console.error('CiudadesUseCase: Error de validación - costoPor_Ciudad no puede ser negativo si se proporciona');
        return {
          success: false,
          message: 'Errores de validación',
          data: {} as ICiudad,
          errors: { costoPor_Ciudad: 'El costo por ciudad no puede ser negativo' },
          status: 422,
        };
      }
    }

    try {
      const response = await updatePartialCiudad(id, cleanedData);
      console.log('CiudadesUseCase: Respuesta de updatePartialCiudad:', response);
      return response;
    } catch (error) {
      console.error('CiudadesUseCase: Error en executeUpdatePartialCiudad:', error);
      throw error;
    }
  }
}