// Importa las funciones del servicio para crear, editar y actualizar parcialmente puestos
import { createPuesto, updatePartialPuesto } from '../../services/Puestos/PuestosService';
// Importa las interfaces necesarias para tipar los datos de los puestos
import { IPuesto, IPuesto_ApiResponse } from '../../models/Interfaces/IPuestos';

// Define la clase PuestosUseCase para manejar la lógica de negocio de los puestos
export class PuestosUseCase {
  // Método executeCreatePuesto para manejar la creación de un puesto (POST)
  async executeCreatePuesto(data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> {
    // Log para depuración: muestra los datos recibidos
    console.log('PuestosUseCase: Ejecutando executeCreatePuesto con datos:', data);
    
    // Validaciones adicionales en el frontend
    if (!data.nombrePuesto.trim()) { // Verifica que nombrePuesto no esté vacío
      console.error('PuestosUseCase: Error de validación - nombrePuesto es requerido');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as IPuesto,
        errors: { nombrePuesto: 'El nombre del puesto es requerido' },
        status: 422,
      };
    }
    if (data.idArea <= 0) { // Verifica que idArea sea un número positivo
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
      // Llama al servicio para crear el puesto
      const response = await createPuesto(data);
      // Log para depuración: muestra la respuesta recibida
      console.log('PuestosUseCase: Respuesta de createPuesto:', response);
      return response; // Devuelve la respuesta del servicio
    } catch (error) {
      // Log para depuración: muestra el error
      console.error('PuestosUseCase: Error en executeCreatePuesto:', error);
      throw error; // Relanza el error para que lo maneje el controlador
    }
  }

  // Método executeUpdatePuesto para manejar la edición completa de un puesto (PUT)
  async executeUpdatePuesto(id: number, data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> {
    // Log para depuración: muestra el ID y los datos recibidos
    console.log('PuestosUseCase: Ejecutando executeUpdatePuesto con ID:', id, 'y datos:', data);
    
    // Validaciones adicionales en el frontend
    if (!data.nombrePuesto.trim()) { // Verifica que nombrePuesto no esté vacío
      console.error('PuestosUseCase: Error de validación - nombrePuesto es requerido');
      return {
        success: false,
        message: 'Errores de validación',
        data: {} as IPuesto,
        errors: { nombrePuesto: 'El nombre del puesto es requerido' },
        status: 422,
      };
    }
    if (data.idArea <= 0) { // Verifica que idArea sea un número positivo
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
      // Llama al servicio para editar el puesto
      const response = await this.executeUpdatePartialPuesto(id, data);
      // Log para depuración: muestra la respuesta recibida
      console.log('PuestosUseCase: Respuesta de updatePuesto:', response);
      return response; // Devuelve la respuesta del servicio
    } catch (error) {
      // Log para depuración: muestra el error
      console.error('PuestosUseCase: Error en executeUpdatePuesto:', error);
      throw error; // Relanza el error para que lo maneje el controlador
    }
  }

  // Método executeUpdatePartialPuesto para manejar la edición parcial de un puesto (PATCH)
  async executeUpdatePartialPuesto(id: number, data: Partial<{ nombrePuesto: string; descripcionPuesto: string; idArea: number }>): Promise<IPuesto_ApiResponse<IPuesto>> {
    // Log para depuración: muestra el ID y los datos recibidos
    console.log('PuestosUseCase: Ejecutando executeUpdatePartialPuesto con ID:', id, 'y datos:', data);
    
    // Validaciones adicionales (opcional, ya que PATCH permite campos opcionales)
    const cleanedData: Partial<{ nombrePuesto: string; descripcionPuesto: string; idArea: number }> = {};
    if (data.nombrePuesto !== undefined) { // Si se proporciona nombrePuesto
      cleanedData.nombrePuesto = data.nombrePuesto.trim();
      if (!cleanedData.nombrePuesto) { // Verifica que no esté vacío
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
    if (data.descripcionPuesto !== undefined) { // Si se proporciona descripcionPuesto
      cleanedData.descripcionPuesto = data.descripcionPuesto.trim();
    }
    if (data.idArea !== undefined) { // Si se proporciona idArea
      cleanedData.idArea = data.idArea;
      if (cleanedData.idArea <= 0) { // Verifica que sea un número positivo
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
      // Llama al servicio para editar parcialmente el puesto
      const response = await updatePartialPuesto(id, data);
      // Log para depuración: muestra la respuesta recibida
      console.log('PuestosUseCase: Respuesta de updatePartialPuesto:', response);
      return response; // Devuelve la respuesta del servicio
    } catch (error) {
      // Log para depuración: muestra el error
      console.error('PuestosUseCase: Error en executeUpdatePartialPuesto:', error);
      throw error; // Relanza el error para que lo maneje el controlador
    }
  }
}