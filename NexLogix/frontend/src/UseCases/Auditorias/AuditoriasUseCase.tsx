// Importa la función del servicio para actualizar parcialmente auditorías
import { updatePartialAuditoria } from '../../services/Auditorias/AuditoriasService';
// Importa las interfaces necesarias para tipar los datos de las auditorías
import { IAuditoria, IAuditoriaApiResponse } from '../../models/Interfaces/IAuditorias';

// Define la clase AuditoriasUseCase para manejar la lógica de negocio de las auditorías
export class AuditoriasUseCase {
  // Método executeUpdatePartialAuditoria para manejar la edición parcial de una auditoría (PATCH)
  async executeUpdatePartialAuditoria(id: number, data: Partial<IAuditoria>): Promise<IAuditoriaApiResponse<IAuditoria>> {
    // Validación: asegura que 'action' no esté vacío si se proporciona
    if (data.action && !data.action.trim()) {
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as IAuditoria,
        errors: { action: 'La acción no puede estar vacía' },
        status: 422,
      };
    }
    // Validación: asegura que 'resource_type' no esté vacío si se proporciona
    if (data.resource_type && !data.resource_type.trim()) {
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as IAuditoria,
        errors: { resource_type: 'El tipo de recurso no puede estar vacío' },
        status: 422,
      };
    }

    // Llama directamente al servicio para actualizar parcialmente la auditoría
    // No se usa try/catch aquí porque el controlador ya maneja los errores
    return await updatePartialAuditoria(id, data);
  }
}