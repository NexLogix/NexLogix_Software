// Importa las funciones del servicio para interactuar con la API de auditorías
import { updateAuditoria } from '../../services/Auditorias/AuditoriasService';
// Importa las interfaces necesarias para tipar los datos de auditorías
import { IAuditoria, IAuditoria_ApiResponse } from '../../models/Interfaces/IAuditorias';

// Define la clase AuditoriasUseCase para manejar la lógica de negocio de las auditorías
export class AuditoriasUseCase {
  // Método executeUpdateAuditoria para manejar la edición de una auditoría (PATCH)
  async executeUpdateAuditoria(id: number, data: Partial<{ action: string; resource_type: string; details: string; updated_at: string }>): Promise<IAuditoria_ApiResponse<IAuditoria>> {
    console.log('AuditoriasUseCase: Ejecutando executeUpdateAuditoria con ID:', id, 'y datos:', data);
    
    // Validaciones adicionales en el frontend
    const cleanedData: Partial<{ action: string; resource_type: string; details: string; updated_at: string }> = {};
    if (data.action !== undefined) {
      cleanedData.action = data.action.trim();
      if (!cleanedData.action) {
        console.error('AuditoriasUseCase: Error de validación - action no puede estar vacío si se proporciona');
        return {
          success: false,
          message: 'Errores de validación',
          data: {} as IAuditoria,
          errors: { action: 'La acción no puede estar vacía' },
          status: 422,
        };
      }
    }
    if (data.resource_type !== undefined) {
      cleanedData.resource_type = data.resource_type.trim();
    }
    if (data.details !== undefined) {
      cleanedData.details = data.details;
    }
    if (data.updated_at !== undefined) {
      cleanedData.updated_at = data.updated_at;
    }

    try {
      const response = await updateAuditoria(id, cleanedData);
      console.log('AuditoriasUseCase: Respuesta de updateAuditoria:', response);
      return response;
    } catch (error) {
      console.error('AuditoriasUseCase: Error en executeUpdateAuditoria:', error);
      throw error;
    }
  }
}