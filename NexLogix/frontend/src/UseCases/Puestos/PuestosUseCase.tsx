import { createPuesto, updatePuesto, updatePartialPuesto } from '../../services/Puestos/PuestosService'; // Importa las funciones createPuesto, updatePuesto y updatePartialPuesto desde el servicio de Puestos
import { IPuesto, IPuesto_ApiResponse } from '../../models/Interfaces/IPuestos'; // Importa las interfaces IPuesto y IPuesto_ApiResponse para definir los tipos de datos de Puesto y la respuesta de la API

export class PuestosUseCase { // Define una clase PuestosUseCase para encapsular la lógica de negocio relacionada con la gestión de puestos
  // POST: Crear puesto
  async executeCreatePuesto(data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> { // Declara un método asíncrono para crear un puesto, acepta datos y devuelve una promesa con la respuesta de la API que contiene un IPuesto
    console.log('PuestosUseCase: Ejecutando executeCreatePuesto con datos:', data); // Registra los datos recibidos para depuración
    
    // Validaciones adicionales en el frontend
    if (!data.nombrePuesto.trim()) { // Verifica si el campo nombrePuesto está vacío después de eliminar espacios en blanco
      console.error('PuestosUseCase: Error de validación - nombrePuesto es requerido'); // Registra un error si nombrePuesto está vacío
      return { // Devuelve un objeto de respuesta con error de validación
        success: false, // Indica que la operación no fue exitosa
        message: 'Errores de validación', // Proporciona un mensaje genérico de error
        data: {} as IPuesto, // Incluye un objeto vacío tipado como IPuesto
        errors: { nombrePuesto: 'El nombre del puesto es requerido' }, // Especifica el error para nombrePuesto
        status: 422, // Establece el código de estado HTTP 422 (Unprocessable Entity)
      };
    }
    if (data.idArea <= 0) { // Verifica si idArea es un número no positivo
      console.error('PuestosUseCase: Error de validación - idArea debe ser un número positivo'); // Registra un error si idArea no es válido
      return { // Devuelve un objeto de respuesta con error de validación
        success: false, // Indica que la operación no fue exitosa
        message: 'Errores de validación', // Proporciona un mensaje genérico de error
        data: {} as IPuesto, // Incluye un objeto vacío tipado como IPuesto
        errors: { idArea: 'El ID del área debe ser un número positivo' }, // Especifica el error para idArea
        status: 422, // Establece el código de estado HTTP 422
      };
    }

    try { // Inicia un bloque try para manejar posibles errores
      const response = await createPuesto(data); // Llama a la función createPuesto del servicio, pasando los datos y esperando la respuesta
      console.log('PuestosUseCase: Respuesta de createPuesto:', response); // Registra la respuesta recibida para depuración
      return response; // Devuelve la respuesta del servicio
    } catch (error) { // Captura cualquier error que ocurra durante la ejecución
      console.error('PuestosUseCase: Error en executeCreatePuesto:', error); // Registra el error para depuración
      throw error; // Relanza el error para que sea manejado por el llamador
    }
  }

  // PUT: Editar puesto completamente
  async executeUpdatePuesto(id: number, data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> { // Declara un método asíncrono para actualizar completamente un puesto, acepta ID y datos, devuelve una promesa con la respuesta de la API que contiene un IPuesto
    console.log('PuestosUseCase: Ejecutando executeUpdatePuesto con ID:', id, 'y datos:', data); // Registra el ID y los datos recibidos para depuración
    
    // Validaciones adicionales
    if (!data.nombrePuesto.trim()) { // Verifica si el campo nombrePuesto está vacío después de eliminar espacios en blanco
      console.error('PuestosUseCase: Error de validación - nombrePuesto es requerido'); // Registra un error si nombrePuesto está vacío
      return { // Devuelve un objeto de respuesta con error de validación
        success: false, // Indica que la operación no fue exitosa
        message: 'Errores de validación', // Proporciona un mensaje genérico de error
        data: {} as IPuesto, // Incluye un objeto vacío tipado como IPuesto
        errors: { nombrePuesto: 'El nombre del puesto es requerido' }, // Especifica el error para nombrePuesto
        status: 422, // Establece el código de estado HTTP 422
      };
    }
    if (data.idArea <= 0) { // Verifica si idArea es un número no positivo
      console.error('PuestosUseCase: Error de validación - idArea debe ser un número positivo'); // Registra un error si idArea no es válido
      return { // Devuelve un objeto de respuesta con error de validación
        success: false, // Indica que la operación no fue exitosa
        message: 'Errores de validación', // Proporciona un mensaje genérico de error
        data: {} as IPuesto, // Incluye un objeto vacío tipado como IPuesto
        errors: { idArea: 'El ID del área debe ser un número positivo' }, // Especifica el error para idArea
        status: 422, // Establece el código de estado HTTP 422
      };
    }

    try { // Inicia un bloque try para manejar posibles errores
      const response = await updatePuesto(id, data); // Llama a la función updatePuesto del servicio, pasando el ID y los datos, y esperando la respuesta
      console.log('PuestosUseCase: Respuesta de updatePuesto:', response); // Registra la respuesta recibida para depuración
      return response; // Devuelve la respuesta del servicio
    } catch (error) { // Captura cualquier error que ocurra durante la ejecución
      console.error('PuestosUseCase: Error en executeUpdatePuesto:', error); // Registra el error para depuración
      throw error; // Relanza el error para que sea manejado por el llamador
    }
  }

  // PATCH: Editar parcialmente
  async executeUpdatePartialPuesto(id: number, data: Partial<{ nombrePuesto: string; descripcionPuesto: string; idArea: number }>): Promise<IPuesto_ApiResponse<IPuesto>> { // Declara un método asíncrono para actualizar parcialmente un puesto, acepta ID y datos parciales, devuelve una promesa con la respuesta de la API que contiene un IPuesto
    console.log('PuestosUseCase: Ejecutando executeUpdatePartialPuesto con ID:', id, 'y datos:', data); // Registra el ID y los datos recibidos para depuración
    
    // Validaciones adicionales (opcional, ya que PATCH permite campos opcionales)
    const cleanedData: Partial<{ nombrePuesto: string; descripcionPuesto: string; idArea: number }> = {}; // Crea un objeto vacío para almacenar los datos validados
    if (data.nombrePuesto !== undefined) { // Verifica si el campo nombrePuesto está presente en los datos
      cleanedData.nombrePuesto = data.nombrePuesto.trim(); // Asigna el valor de nombrePuesto limpio (sin espacios en blanco al inicio o final)
      if (!cleanedData.nombrePuesto) { // Verifica si nombrePuesto está vacío después de limpiar
        console.error('PuestosUseCase: Error de validación - nombrePuesto no puede estar vacío si se proporciona'); // Registra un error si nombrePuesto está vacío
        return { // Devuelve un objeto de respuesta con error de validación
          success: false, // Indica que la operación no fue exitosa
          message: 'Errores de validación', // Proporciona un mensaje genérico de error
          data: {} as IPuesto, // Incluye un objeto vacío tipado como IPuesto
          errors: { nombrePuesto: 'El nombre del puesto no puede estar vacío' }, // Especifica el error para nombrePuesto
          status: 422, // Establece el código de estado HTTP 422
        };
      }
    }
    if (data.descripcionPuesto !== undefined) { // Verifica si el campo descripcionPuesto está presente en los datos
      cleanedData.descripcionPuesto = data.descripcionPuesto.trim(); // Asigna el valor de descripcionPuesto limpio (sin espacios en blanco al inicio o final)
    }
    if (data.idArea !== undefined) { // Verifica si el campo idArea está presente en los datos
      cleanedData.idArea = data.idArea; // Asigna el valor de idArea
      if (cleanedData.idArea <= 0) { // Verifica si idArea es un número no positivo
        console.error('PuestosUseCase: Error de validación - idArea debe ser un número positivo si se proporciona'); // Registra un error si idArea no es válido
        return { // Devuelve un objeto de respuesta con error de validación
          success: false, // Indica que la operación no fue exitosa
          message: 'Errores de validación', // Proporciona un mensaje genérico de error
          data: {} as IPuesto, // Incluye un objeto vacío tipado como IPuesto
          errors: { idArea: 'El ID del área debe ser un número positivo' }, // Especifica el error para idArea
          status: 422, // Establece el código de estado HTTP 422
        };
      }
    }

    try { // Inicia un bloque try para manejar posibles errores
      const response = await updatePartialPuesto(id, cleanedData); // Llama a la función updatePartialPuesto del servicio, pasando el ID y los datos validados, y esperando la respuesta
      console.log('PuestosUseCase: Respuesta de updatePartialPuesto:', response); // Registra la respuesta recibida para depuración
      return response; // Devuelve la respuesta del servicio
    } catch (error) { // Captura cualquier error que ocurra durante la ejecución
      console.error('PuestosUseCase: Error en executeUpdatePartialPuesto:', error); // Registra el error para depuración
      throw error; // Relanza el error para que sea manejado por el llamador
    }
  }
}