// Importa axios y AxiosResponse para realizar y tipar solicitudes HTTP
import axios, { AxiosResponse } from 'axios';
// Importa las interfaces necesarias para tipar los datos de puestos y áreas
import { IPuesto, IPuesto_ApiResponse, IArea } from '../../models/Interfaces/IPuestos';

// Define la URL base para las solicitudes a la API
const BASE_URL = 'http://127.0.0.1:8000/api';

// Define la función fetchAreas para obtener todas las áreas desde la API
export const fetchAreas = async (): Promise<IPuesto_ApiResponse<IArea[]>> => {
  // Obtiene el token de autenticación desde localStorage
  const token = localStorage.getItem('token');
  // Verifica si el token existe, lanza un error si no está presente
  if (!token) {
    console.error('fetchAreas: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    // Log para depuración: muestra la URL a la que se enviará la solicitud
    console.log('fetchAreas: Enviando solicitud a', `${BASE_URL}/gestion_areas`);
    // Realiza una solicitud GET para obtener las áreas
    const response: AxiosResponse<IPuesto_ApiResponse<IArea[]>> = await axios.get(`${BASE_URL}/gestion_areas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Log para depuración: muestra la respuesta recibida
    console.log('fetchAreas: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Maneja errores específicos de Axios
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500; // Obtiene el código de estado o usa 500 por defecto
      const message = error.response?.data?.message ?? 'Error al cargar las áreas'; // Mensaje de error
      const errors = error.response?.data?.errors ?? {}; // Errores de validación
      // Construye un mensaje de error detallado si hay errores de validación
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`fetchAreas: Error ${status}: ${errorMessage}`, error.response?.data);
      // Redirige al login si el error es 401 (no autorizado)
      if (status === 401) {
        window.location.href = '/login';
      }
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    // Maneja errores desconocidos
    console.error('fetchAreas: Error desconocido:', error);
    throw new Error('Error desconocido al cargar las áreas');
  }
};

// GET: Obtener todos los puestos
export const fetchPuestos = async (): Promise<IPuesto_ApiResponse<IPuesto[]>> => {
  // Obtiene el token de autenticación desde localStorage
  const token = localStorage.getItem('token');
  // Verifica si el token existe, lanza un error si no está presente
  if (!token) {
    console.error('fetchPuestos: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    // Log para depuración: muestra la URL a la que se enviará la solicitud
    console.log('fetchPuestos: Enviando solicitud a', `${BASE_URL}/gestion_puestos`);
    // Realiza una solicitud GET para obtener los puestos
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto[]>> = await axios.get(`${BASE_URL}/gestion_puestos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Log para depuración: muestra la respuesta recibida
    console.log('fetchPuestos: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Maneja errores específicos de Axios
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500; // Obtiene el código de estado o usa 500 por defecto
      const message = error.response?.data?.message ?? 'Error al cargar los puestos'; // Mensaje de error
      const errors = error.response?.data?.errors ?? {}; // Errores de validación
      // Construye un mensaje de error detallado si hay errores de validación
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`fetchPuestos: Error ${status}: ${errorMessage}`, error.response?.data);
      // Redirige al login si el error es 401 (no autorizado)
      if (status === 401) {
        window.location.href = '/login';
      }
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    // Maneja errores desconocidos
    console.error('fetchPuestos: Error desconocido:', error);
    throw new Error('Error desconocido al cargar los puestos');
  }
};

// GET: Obtener un puesto por ID
export const fetchPuestoById = async (id: number): Promise<IPuesto_ApiResponse<IPuesto>> => {
    // Obtiene el token de autenticación desde localStorage
    const token = localStorage.getItem('token');

    // Verifica si el token existe, lanza un error si no está presente
    if (!token) {
      console.error('fetchPuestoById: No se encontró token en localStorage');
      throw new Error('No autenticado');
    }

    try {
        // Log para depuración: muestra la URL a la que se enviará la solicitud
        console.log('fetchPuestoById: Enviando solicitud a', `${BASE_URL}/gestion_puestos/${id}`);
        // Realiza una solicitud GET para obtener el puesto por ID
        const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.get(`${BASE_URL}/gestion_puestos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Log para depuración: muestra la respuesta recibida
        console.log('fetchPuestoById: Respuesta recibida:', JSON.stringify(response.data, null, 2));
        return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
        // Maneja errores específicos de Axios
        if (axios.isAxiosError(error)) {
          const status = error.response?.status ?? 500; // Obtiene el código de estado o usa 500 por defecto
          const message = error.response?.data?.message ?? 'Error al cargar el puesto'; // Mensaje de error
          const errors = error.response?.data?.errors ?? {}; // Errores de validación
          // Construye un mensaje de error detallado si hay errores de validación
          const errorMessage = Object.values(errors).length > 0 
            ? `${message}: ${Object.values(errors).join(', ')}`
            : message;
          console.error(`fetchPuestoById: Error ${status}: ${errorMessage}`, error.response?.data);

          // Redirige al login si el error es 401 (no autorizado)
          if (status === 401) {
            window.location.href = '/login';
          }
          throw new Error(`Error ${status}: ${errorMessage}`);
        }
        // Maneja errores desconocidos
        console.error('fetchPuestoById: Error desconocido:', error);
        throw new Error('Error desconocido al cargar el puesto');
    }
};

// POST: Crear un puesto
export const createPuesto = async (data: { nombrePuesto: string; descripcionPuesto?: string; idArea: number }): Promise<IPuesto_ApiResponse<IPuesto>> => {
  // Obtiene el token de autenticación desde localStorage
  const token = localStorage.getItem('token');
  // Verifica si el token existe, lanza un error si no está presente
  if (!token) {
    console.error('createPuesto: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    // Log para depuración: muestra la URL y los datos enviados
    console.log('createPuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos`, 'con datos:', data);
    // Realiza una solicitud POST para crear un puesto
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.post(`${BASE_URL}/gestion_puestos`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // Log para depuración: muestra la respuesta recibida
    console.log('createPuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Maneja errores específicos de Axios
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500; // Obtiene el código de estado o usa 500 por defecto
      const message = error.response?.data?.message ?? 'Error al crear el puesto'; // Mensaje de error
      const errors = error.response?.data?.errors ?? {}; // Errores de validación
      // Construye un mensaje de error detallado si hay errores de validación
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`createPuesto: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    // Maneja errores desconocidos
    console.error('createPuesto: Error desconocido:', error);
    throw new Error('Error desconocido al crear el puesto');
  }
};

// PATCH: Editar parcialmente un puesto
export const updatePartialPuesto = async (id: number, data: Partial<{ nombrePuesto: string; descripcionPuesto: string; idArea: number }>): Promise<IPuesto_ApiResponse<IPuesto>> => {
  // Obtiene el token de autenticación desde localStorage
  const token = localStorage.getItem('token');
  // Verifica si el token existe, lanza un error si no está presente
  if (!token) {
    console.error('updatePartialPuesto: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    // Log para depuración: muestra la URL y los datos enviados
    console.log('updatePartialPuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos/${id}`, 'con datos:', data);
    // Realiza una solicitud PATCH para editar parcialmente un puesto
    const response: AxiosResponse<IPuesto_ApiResponse<IPuesto>> = await axios.patch(`${BASE_URL}/gestion_puestos/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // Log para depuración: muestra la respuesta recibida
    console.log('updatePartialPuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Maneja errores específicos de Axios
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500; // Obtiene el código de estado o usa 500 por defecto
      const message = error.response?.data?.message ?? 'Error al actualizar el puesto'; // Mensaje de error
      const errors = error.response?.data?.errors ?? {}; // Errores de validación
      // Construye un mensaje de error detallado si hay errores de validación
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`updatePartialPuesto: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    // Maneja errores desconocidos
    console.error('updatePartialPuesto: Error desconocido:', error);
    throw new Error('Error desconocido al actualizar el puesto');
  }
};

// DELETE: Eliminar un puesto
export const deletePuesto = async (id: number): Promise<IPuesto_ApiResponse<null>> => {
  // Obtiene el token de autenticación desde localStorage
  const token = localStorage.getItem('token');
  // Verifica si el token existe, lanza un error si no está presente
  if (!token) {
    console.error('deletePuesto: No se encontró token en localStorage');
    throw new Error('No autenticado');
  }
  try {
    // Log para depuración: muestra la URL a la que se enviará la solicitud
    console.log('deletePuesto: Enviando solicitud a', `${BASE_URL}/gestion_puestos/${id}`);
    // Realiza una solicitud DELETE para eliminar un puesto
    const response: AxiosResponse<IPuesto_ApiResponse<null>> = await axios.delete(`${BASE_URL}/gestion_puestos/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // Log para depuración: muestra la respuesta recibida
    console.log('deletePuesto: Respuesta recibida:', JSON.stringify(response.data, null, 2));
    return response.data; // Devuelve los datos de la respuesta
  } catch (error) {
    // Maneja errores específicos de Axios
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 500; // Obtiene el código de estado o usa 500 por defecto
      const message = error.response?.data?.message ?? 'Error al eliminar el puesto'; // Mensaje de error
      const errors = error.response?.data?.errors ?? {}; // Errores de validación
      // Construye un mensaje de error detallado si hay errores de validación
      const errorMessage = Object.values(errors).length > 0 
        ? `${message}: ${Object.values(errors).join(', ')}`
        : message;
      console.error(`deletePuesto: Error ${status}: ${errorMessage}`, error.response?.data);
      throw new Error(`Error ${status}: ${errorMessage}`);
    }
    // Maneja errores desconocidos
    console.error('deletePuesto: Error desconocido:', error);
    throw new Error('Error desconocido al eliminar el puesto');
  }
};