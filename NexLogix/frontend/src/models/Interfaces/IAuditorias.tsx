// Define la interfaz IAuditoria para tipar los datos de las auditorías
export interface IAuditoria {
  id: number; // ID único de la auditoría
  user_id: number; // ID del usuario que realizó la acción
  action: string; // Tipo de acción realizada (CREATE, DELETE, PATCH, etc.)
  resource_type: string; // Tipo de recurso afectado
  details: string; // Detalles de la acción (siempre string en el frontend)
  created_at: string; // Fecha de creación de la auditoría
  updated_at: string; // Fecha de última actualización de la auditoría
}

// Define la interfaz IAuditoria_ApiResponse para tipar las respuestas de la API
export interface IAuditoria_ApiResponse<T> {
  success: boolean; // Indica si la operación fue exitosa
  message: string; // Mensaje de la respuesta (éxito o error)
  data: T; // Datos devueltos por la API (puede ser una auditoría, lista de auditorías, etc.)
  errors?: Record<string, string>; // Errores de validación (opcional)
  status?: number; // Código de estado HTTP (opcional)
}