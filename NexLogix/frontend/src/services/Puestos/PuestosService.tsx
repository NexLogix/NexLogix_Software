import axios, { AxiosResponse } from 'axios'; // Importa axios para realizar peticiones HTTP y el tipo AxiosResponse para manejar las respuestas
import { IPuesto, IPuesto_ApiResponse, IArea } from '../../models/Interfaces/IPuestos'; // Importa interfaces para definir los tipos de datos de Puesto, respuesta de API y Área

const BASE_URL = 'http://127.0.0.1:8000/api'; // Define la URL base para todas las peticiones a la API, apuntando al servidor backend local

// GET: Obtener todas las áreas (para el select)
export const fetchAreas = async (): Promise<IPuesto_ApiResponse<IArea[]>> => { // Declara una función asíncrona para obtener todas las áreas, devuelve una promesa con la respuesta de la API que contiene un arreglo de IArea
  const token = localStorage.getItem('token'); // Obtiene el token de autenticación desde localStorage
  
  if (!token) { // Verifica si no existe un token
    console.error('fetchAreas: No se encontró token en localStorage'); // Registra un error en la consola si no se encuentra el token
    throw new Error('No autenticado'); // Lanza un error por falta de autenticación
  }
  try { // Inicia un bloque try para manejar posibles errores
    console.log('fetchAreas: Enviando solicitud a', `${BASE_URL}/gestion_areas`); // Registra la URL de la solicitud para depuración
    const response: AxiosResponse<IPuesto_ApiResponse<IArea[]>> = await axios.get(`${BASE_URL}/gestion_areas`, { // Realiza una petición GET para obtener las áreas, esperando la respuesta
      headers: { Authorization: `Bearer ${token}` }, // Incluye el token Bearer en los encabezados para autenticación
    });
    console.log('fetchAreas: Respuesta recibida:', JSON.stringify(response.data, null, 2)); // Registra los datos de la respuesta en formato JSON con indentación
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) { // Captura cualquier error que ocurra durante la petición
    if (axios.isAxiosError(error)) { // Verifica si el error es específico de axios
      const status = error.response?.status ?? 500; // Extrae el código de estado HTTP, usa 500 por defecto si no está disponible
      const message = error.response?.data?.message ?? 'Error al cargar las áreas'; // Extrae el mensaje de error, usa un mensaje genérico si no está disponible
      const errors = error.response?.data?.errors ?? {}; // Extrae detalles de errores adicionales, usa un objeto vacío por defecto
      const errorMessage = Object.values(errors).length > 0 // Verifica si hay detalles de errores específicos
        ? `${message}: ${Object.values(errors).join(', ')}` // Combina el mensaje con los detalles de errores si existen
        : message; // Usa el mensaje genérico si no hay detalles
      console.error(`fetchAreas: Error ${status}: ${errorMessage}`, error.response?.data); // Registra el error con el código de estado y el mensaje
      if (status === 401) { // Verifica si el error es por acceso no autorizado (401)
        window.location.href = '/login'; // Redirige a la página de inicio de sesión
      }
      throw new Error(`Error ${status}: ${errorMessage}`); // Lanza un nuevo error con el código de estado y el mensaje
    }
    console.error('fetchAreas: Error desconocido:', error); // Registra errores no relacionados con axios como desconocidos
    throw new Error('Error desconocido al cargar las áreas'); // Lanza un error genérico para problemas desconocidos
  }
};

// GET: Obtener todos los puestos
export const fetchPuestos = async (): Promise<IPuesto_ApiResponse<IPuesto[]>> => { // Declara una función asíncrona para obtener todos los puestos, devuelve una promesa con la respuesta de la API que contiene un arreglo de IPuesto
  const token = localStorage.getItem('token'); // Obtiene el token de autenticación desde localStorage
  if (!token) { // Verifica si no existe un token
    console.error('fetchPuestos: No se encontró token en localStorage'); // Registra un error en la consola si no se encuentra el token
    throw new Error('No autenticado'); // Lanza un error por falta de autenticación
  }
  try { // Inicia un bloque try para manejar posibles errores
    console.log('fetchPuestos: Enviando solicitud a', `${BASE_URL}/gestion_puestos`); // Registra la URL de la solicitud para depuración
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto[]>> = await axios.get(`${BASE_URL}/gestion_puestos`, { // Realiza una petición GET para obtener los puestos, esperando la respuesta
      headers: { Authorization: `Bearer ${token}` }, // Incluye el token Bearer en los encabezados para autenticación
    });
    console.log('fetchPuestos: Respuesta recibida:', JSON.stringify(response.data, null, 2)); // Registra los datos de la respuesta en formato JSON con indentación
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) { // Captura cualquier error que ocurra durante la petición
    if (axios.isAxiosError(error)) { // Verifica si el error es específico de axios
      const status = error.response?.status ?? 500; // Extrae el código de estado HTTP, usa 500 por defecto si no está disponible
      const message = error.response?.data?.message ?? 'Error al cargar los puestos'; // Extrae el mensaje de error, usa un mensaje genérico si no está disponible
      const errors = error.response?.data?.errors ?? {}; // Extrae detalles de errores adicionales, usa un objeto vacío por defecto
      const errorMessage = Object.values(errors).length > 0 // Verifica si hay detalles de errores específicos
        ? `${message}: ${Object.values(errors).join(', ')}` // Combina el mensaje con los detalles de errores si existen
        : message; // Usa el mensaje genérico si no hay detalles
      console.error(`fetchPuestos: Error ${status}: ${errorMessage}`, error.response?.data); // Registra el error con el código de estado y el mensaje
      if (status === 401) { // Verifica si el error es por acceso no autorizado (401)
        window.location.href = '/login'; // Redirige a la página de inicio de sesión
      }
      throw new Error(`Error ${status}: ${errorMessage}`); // Lanza un nuevo error con el código de estado y el mensaje
    }
    console.error('fetchPuestos: Error desconocido:', error); // Registra errores no relacionados con axios como desconocidos
    throw new Error('Error desconocido al cargar los puestos'); // Lanza un error genérico para problemas desconocidos
  }
};

// GET: Obtener un puesto por ID
export const fetchPuestoById = async (id: number): Promise<IPuesto_ApiResponse<IPuesto>> => { // Declara una función asíncrona para obtener un puesto por su ID, devuelve una promesa con la respuesta de la API que contiene un IPuesto
  const token = localStorage.getItem('token'); // Obtiene el token de autenticación desde localStorage
  if (!token) { // Verifica si no existe un token
    console.error('fetchPuestoById: No se encontró token en localStorage'); // Registra un error en la consola si no se encuentra el token
    throw new Error('No autenticado'); // Lanza un error por falta de autenticación
  }
  try { // Inicia un bloque try para manejar posibles errores
    console.log('fetchPuestoById: Enviando solicitud a', `${BASE_URL}/gestion_puestos/buscar_puesto/${id}`); // Registra la URL de la solicitud para depuración
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.get(`${BASE_URL}/gestion_puestos/buscar_puesto/${id}`, { // Realiza una petición GET para obtener un puesto por ID, esperando la respuesta
      headers: { Authorization: `Bearer ${token}` }, // Incluye el token Bearer en los encabezados para autenticación
    });
    console.log('fetchPuestoById: Respuesta recibida:', JSON.stringify(response.data, null, 2)); // Registra los datos de la respuesta en formato JSON con indentación
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) { // Captura cualquier error que ocurra durante la petición
    if (axios.isAxiosError(error)) { // Verifica si el error es específico de axios
      const status = error.response?.status ?? 500; // Extrae el código de estado HTTP, usa 500 por defecto si no está disponible
      const message = error.response?.data?.message ?? 'Error al cargar el puesto'; // Extrae el mensaje de error, usa un mensaje genérico si no está disponible
      const errors = error.response?.data?.errors ?? {}; // Extrae detalles de errores adicionales, usa un objeto vacío por defecto
      const errorMessage = Object.values(errors).length > 0 // Verifica si hay detalles de errores específicos
        ? `${message}: ${Object.values(errors).join(', ')}` // Combina el mensaje con los detalles de errores si existen
        : message; // Usa el mensaje genérico si no hay detalles
      console.error(`fetchPuestoById: Error ${status}: ${errorMessage}`, error.response?.data); // Registra el error con el código de estado y el mensaje
      if (status === 401) { // Verifica si el error es por acceso no autorizado (401)
        window.location.href = '/login'; // Redirige a la página de inicio de sesión
      }
      throw new Error(`Error ${status}: ${errorMessage}`); // Lanza un nuevo error con el código de estado y el mensaje
    }
    console.error('fetchPuestoById: Error desconocido:', error); // Registra errores no relacionados con axios como desconocidos
    throw new Error('Error desconocido al cargar el puesto'); // Lanza un error genérico para problemas desconocidos
  }
};

// POST: Crear un puesto
export const createPuesto = async (data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> => { // Declara una función asíncrona para crear un nuevo puesto, acepta datos y devuelve una promesa con la respuesta de la API que contiene un IPuesto
  const token = localStorage.getItem('token'); // Obtiene el token de autenticación desde localStorage
  if (!token) { // Verifica si no existe un token
    console.error('createPuesto: No se encontró token en localStorage'); // Registra un error en la consola si no se encuentra el token
    throw new Error('No autenticado'); // Lanza un error por falta de autenticación
  }
  try { // Inicia un bloque try para manejar posibles errores
    console.log('createPuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos/crear_puesto`, 'con datos:', data); // Registra la URL de la solicitud y los datos enviados para depuración
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.post(`${BASE_URL}/gestion_puestos/crear_puesto`, data, { // Realiza una petición POST para crear un puesto, esperando la respuesta
      headers: { // Define los encabezados de la petición
        Authorization: `Bearer ${token}`, // Incluye el token Bearer para autenticación
        'Content-Type': 'application/json', // Especifica que el contenido es JSON
      },
    });
    console.log('createPuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2)); // Registra los datos de la respuesta en formato JSON con indentación
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) { // Captura cualquier error que ocurra durante la petición
    if (axios.isAxiosError(error)) { // Verifica si el error es específico de axios
      const status = error.response?.status ?? 500; // Extrae el código de estado HTTP, usa 500 por defecto si no está disponible
      const message = error.response?.data?.message ?? 'Error al crear el puesto'; // Extrae el mensaje de error, usa un mensaje genérico si no está disponible
      const errors = error.response?.data?.errors ?? {}; // Extrae detalles de errores adicionales, usa un objeto vacío por defecto
      const errorMessage = Object.values(errors).length > 0 // Verifica si hay detalles de errores específicos
        ? `${message}: ${Object.values(errors).join(', ')}` // Combina el mensaje con los detalles de errores si existen
        : message; // Usa el mensaje genérico si no hay detalles
      console.error(`createPuesto: Error ${status}: ${errorMessage}`, error.response?.data); // Registra el error con el código de estado y el mensaje
      throw new Error(`Error ${status}: ${errorMessage}`); // Lanza un nuevo error con el código de estado y el mensaje
    }
    console.error('createPuesto: Error desconocido:', error); // Registra errores no relacionados con axios como desconocidos
    throw new Error('Error desconocido al crear el puesto'); // Lanza un error genérico para problemas desconocidos
  }
};

// PUT: Editar un puesto completamente
export const updatePuesto = async (id: number, data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> => { // Declara una función asíncrona para actualizar completamente un puesto, acepta ID y datos, devuelve una promesa con la respuesta de la API que contiene un IPuesto
  const token = localStorage.getItem('token'); // Obtiene el token de autenticación desde localStorage
  if (!token) { // Verifica si no existe un token
    console.error('updatePuesto: No se encontró token en localStorage'); // Registra un error en la consola si no se encuentra el token
    throw new Error('No autenticado'); // Lanza un error por falta de autenticación
  }
  try { // Inicia un bloque try para manejar posibles errores
    console.log('updatePuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos/editar_puesto/${id}`, 'con datos:', data); // Registra la URL de la solicitud y los datos enviados para depuración
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.put(`${BASE_URL}/gestion_puestos/editar_puesto/${id}`, data, { // Realiza una petición PUT para actualizar un puesto, esperando la respuesta
      headers: { // Define los encabezados de la petición
        Authorization: `Bearer ${token}`, // Incluye el token Bearer para autenticación
        'Content-Type': 'application/json', // Especifica que el contenido es JSON
      },
    });
    console.log('updatePuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2)); // Registra los datos de la respuesta en formato JSON con indentación
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) { // Captura cualquier error que ocurra durante la petición
    if (axios.isAxiosError(error)) { // Verifica si el error es específico de axios
      const status = error.response?.status ?? 500; // Extrae el código de estado HTTP, usa 500 por defecto si no está disponible
      const message = error.response?.data?.message ?? 'Error al editar el puesto'; // Extrae el mensaje de error, usa un mensaje genérico si no está disponible
      const errors = error.response?.data?.errors ?? {}; // Extrae detalles de errores adicionales, usa un objeto vacío por defecto
      const errorMessage = Object.values(errors).length > 0 // Verifica si hay detalles de errores específicos
        ? `${message}: ${Object.values(errors).join(', ')}` // Combina el mensaje con los detalles de errores si existen
        : message; // Usa el mensaje genérico si no hay detalles
      console.error(`updatePuesto: Error ${status}: ${errorMessage}`, error.response?.data); // Registra el error con el código de estado y el mensaje
      throw new Error(`Error ${status}: ${errorMessage}`); // Lanza un nuevo error con el código de estado y el mensaje
    }
    console.error('updatePuesto: Error desconocido:', error); // Registra errores no relacionados con axios como desconocidos
    throw new Error('Error desconocido al editar el puesto'); // Lanza un error genérico para problemas desconocidos
  }
};

// PATCH: Editar parcialmente un puesto
export const updatePartialPuesto = async (id: number, data: Partial<{ nombrePuesto: string; descripcionPuesto: string; idArea: number }>): Promise<IPuesto_ApiResponse<IPuesto>> => { // Declara una función asíncrona para actualizar parcialmente un puesto, acepta ID y datos parciales, devuelve una promesa con la respuesta de la API que contiene un IPuesto
  const token = localStorage.getItem('token'); // Obtiene el token de autenticación desde localStorage
  if (!token) { // Verifica si no existe un token
    console.error('updatePartialPuesto: No se encontró token en localStorage'); // Registra un error en la consola si no se encuentra el token
    throw new Error('No autenticado'); // Lanza un error por falta de autenticación
  }
  try { // Inicia un bloque try para manejar posibles errores
    console.log('updatePartialPuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos/actualizar_campos_especificos_puesto/${id}`, 'con datos:', data); // Registra la URL de la solicitud y los datos enviados para depuración
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.patch(`${BASE_URL}/gestion_puestos/actualizar_campos_especificos_puesto/${id}`, data, { // Realiza una petición PATCH para actualizar parcialmente un puesto, esperando la respuesta
      headers: { // Define los encabezados de la petición
        Authorization: `Bearer ${token}`, // Incluye el token Bearer para autenticación
        'Content-Type': 'application/json', // Especifica que el contenido es JSON
      },
    });
    console.log('updatePartialPuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2)); // Registra los datos de la respuesta en formato JSON con indentación
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) { // Captura cualquier error que ocurra durante la petición
    if (axios.isAxiosError(error)) { // Verifica si el error es específico de axios
      const status = error.response?.status ?? 500; // Extrae el código de estado HTTP, usa 500 por defecto si no está disponible
      const message = error.response?.data?.message ?? 'Error al actualizar el puesto'; // Extrae el mensaje de error, usa un mensaje genérico si no está disponible
      const errors = error.response?.data?.errors ?? {}; // Extrae detalles de errores adicionales, usa un objeto vacío por defecto
      const errorMessage = Object.values(errors).length > 0 // Verifica si hay detalles de errores específicos
        ? `${message}: ${Object.values(errors).join(', ')}` // Combina el mensaje con los detalles de errores si existen
        : message; // Usa el mensaje genérico si no hay detalles
      console.error(`updatePartialPuesto: Error ${status}: ${errorMessage}`, error.response?.data); // Registra el error con el código de estado y el mensaje
      throw new Error(`Error ${status}: ${errorMessage}`); // Lanza un nuevo error con el código de estado y el mensaje
    }
    console.error('updatePartialPuesto: Error desconocido:', error); // Registra errores no relacionados con axios como desconocidos
    throw new Error('Error desconocido al actualizar el puesto'); // Lanza un error genérico para problemas desconocidos
  }
};

// DELETE: Eliminar un puesto
export const deletePuesto = async (id: number): Promise<IPuesto_ApiResponse<null>> => { // Declara una función asíncrona para eliminar un puesto por su ID, devuelve una promesa con la respuesta de la API que contiene null
  const token = localStorage.getItem('token'); // Obtiene el token de autenticación desde localStorage
  if (!token) { // Verifica si no existe un token
    console.error('deletePuesto: No se encontró token en localStorage'); // Registra un error en la consola si no se encuentra el token
    throw new Error('No autenticado'); // Lanza un error por falta de autenticación
  }
  try { // Inicia un bloque try para manejar posibles errores
    console.log('deletePuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos/eliminar_puesto/${id}`); // Registra la URL de la solicitud para depuración
    const response: AxiosResponse<IPuesto_ApiResponse<null>> = await axios.delete(`${BASE_URL}/gestion_puestos/eliminar_puesto/${id}`, { // Realiza una petición DELETE para eliminar un puesto, esperando la respuesta
      headers: { Authorization: `Bearer ${token}` }, // Incluye el token Bearer en los encabezados para autenticación
    });
    console.log('deletePuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2)); // Registra los datos de la respuesta en formato JSON con indentación
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) { // Captura cualquier error que ocurra durante la petición
    if (axios.isAxiosError(error)) { // Verifica si el error es específico de axios
      const status = error.response?.status ?? 500; // Extrae el código de estado HTTP, usa 500 por defecto si no está disponible
      const message = error.response?.data?.message ?? 'Error al eliminar el puesto'; // Extrae el mensaje de error, usa un mensaje genérico si no está disponible
      const errors = error.response?.data?.errors ?? {}; // Extrae detalles de errores adicionales, usa un objeto vacío por defecto
      const errorMessage = Object.values(errors).length > 0 // Verifica si hay detalles de errores específicos
        ? `${message}: ${Object.values(errors).join(', ')}` // Combina el mensaje con los detalles de errores si existen
        : message; // Usa el mensaje genérico si no hay detalles
      console.error(`deletePuesto: Error ${status}: ${errorMessage}`, error.response?.data); // Registra el error con el código de estado y el mensaje
      throw new Error(`Error ${status}: ${errorMessage}`); // Lanza un nuevo error con el código de estado y el mensaje
    }
    console.error('deletePuesto: Error desconocido:', error); // Registra errores no relacionados con axios como desconocidos
    throw new Error('Error desconocido al eliminar el puesto'); // Lanza un error genérico para problemas desconocidos
  }
};