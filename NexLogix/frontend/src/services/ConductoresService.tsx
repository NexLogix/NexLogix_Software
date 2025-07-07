import axios from "axios";
import { IConductor, IConductorApiResponse } from "../models/Interfaces/IConductor";
import { IUsuario } from "../models/Interfaces/IGestionUsuarios";

const BASE_URL = "http://127.0.0.1:8000/api";

// Interfaces para las respuestas de la API
export interface IUsuarioAPI {
  idusuarios: number;
  documentoIdentidad: string;
  nombreCompleto: string;
  email: string;
  numContacto: string;
  direccionResidencia: string;
  fechaCreacion: string;
  idRole: number;
  idestado: number;
  idPuestos: number;
}

export interface IUsuariosApiResponse {
  success: boolean;
  message: string;
  data: IUsuarioAPI[];
  status: number;
}

// --- Conductores ---
export const getConductores = async (): Promise<IConductor[]> => {
  try {
    // Obtener conductores
    const resConductores = await axios.get<IConductorApiResponse>(`${BASE_URL}/gestion_conductores`);
    console.log("Respuesta conductores:", resConductores.data);
    
    if (!resConductores.data.success) {
      throw new Error(resConductores.data.message || 'Error al obtener conductores');
    }

    // Obtener usuarios
    const resUsuarios = await axios.get<IUsuariosApiResponse>(`${BASE_URL}/gestion_usuarios`);
    console.log("Respuesta usuarios:", resUsuarios.data);

    if (!resUsuarios.data.success) {
      throw new Error('Error al obtener información de usuarios');
    }

    const usuarios = resUsuarios.data.data.map((u: IUsuarioAPI) => ({
      idUsuario: u.idusuarios,
      documento: u.documentoIdentidad,
      nombre: u.nombreCompleto,
      email: u.email,
      telefono: u.numContacto,
      estado: { 
        idEstado: u.idestado,
        nombreEstado: "Activo",
        descripcionEstado: "Usuario activo" 
      },
      idRole: u.idRole,
      idPuesto: u.idPuestos,
      idEstado: u.idestado
    }));

    const conductoresData = Array.isArray(resConductores.data.data) ? 
      resConductores.data.data : 
      [resConductores.data.data];

    console.log("Usuarios mapeados:", usuarios);
    console.log("Conductores a procesar:", conductoresData);

    // Combinar la información de conductores con sus usuarios
    const conductoresCompletos = conductoresData.map(conductor => {
      const conductorIdUsuario = Number(conductor.idUsuario);
      const usuarioCorrespondiente = usuarios.find((u: IUsuario) => u.idUsuario === conductorIdUsuario);

      if (!usuarioCorrespondiente) {
        console.warn(`No se encontró usuario para el conductor ID ${conductor.idConductor} (buscando usuario ID ${conductorIdUsuario})`);
      } else {
        console.log(`✓ Coincidencia encontrada para conductor ${conductor.idConductor} con usuario ${usuarioCorrespondiente.idUsuario}`);
      }

      let usuarioFinal: IUsuario;
      if (conductor.usuario) {
        // Si el conductor ya tiene datos de usuario, mapearlos al formato correcto
        const usuarioAPI = conductor.usuario as unknown as IUsuarioAPI;
        usuarioFinal = {
          idUsuario: usuarioAPI.idusuarios,
          documento: usuarioAPI.documentoIdentidad,
          nombre: usuarioAPI.nombreCompleto,
          email: usuarioAPI.email,
          telefono: usuarioAPI.numContacto,
          estado: { 
            idEstado: usuarioAPI.idestado,
            nombreEstado: "Activo",
            descripcionEstado: "Usuario activo" 
          },
          idRole: usuarioAPI.idRole,
          idPuesto: usuarioAPI.idPuestos,
          idEstado: usuarioAPI.idestado
        };
      } else {
        usuarioFinal = usuarioCorrespondiente || {
          idUsuario: conductorIdUsuario,
          documento: "No disponible",
          nombre: "Usuario no encontrado",
          email: "N/A",
          telefono: "N/A",
          estado: { idEstado: 0, nombreEstado: "Desconocido", descripcionEstado: "" },
          idRole: 3,
          idPuesto: 0,
          idEstado: 0
        };
      }

      return {
        ...conductor,
        usuario: usuarioFinal
      };
    });

    return conductoresCompletos;
  } catch (error) {
    console.error("Error al obtener conductores:", error);
    throw error;
  }
};

export const createConductor = async (data: Partial<IConductor>): Promise<IConductor> => {
  try {
    console.log("Datos a enviar al crear conductor:", {
      ...data,
      usuario: data.usuario ? {
        ...data.usuario,
        estado: undefined
      } : undefined
    });

    const conductorData = {
      ...data,
      idUsuario: data.usuario?.idUsuario || data.idUsuario,
      usuario: undefined
    };

    console.log("Datos formateados para la API:", conductorData);

    const res = await axios.post<IConductorApiResponse>(`${BASE_URL}/gestion_conductores`, conductorData);
    console.log("Respuesta completa del servidor:", res.data);
    
    if (!res.data.success) {
      throw new Error(res.data.message || 'Error al crear conductor');
    }
    
    return res.data.data as IConductor;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      // Propagar el mensaje de error del backend
      throw new Error(error.response.data.message || error.message);
    }
    throw error;
  }
};

export const updateConductor = async (id: number, data: Partial<IConductor>): Promise<IConductor> => {
  try {
    // Preparar los datos para la API
    const conductorData = {
      ...data,
      idUsuario: data.usuario?.idUsuario || data.idUsuario,
      // No enviamos el objeto usuario completo
      usuario: undefined
    };

    console.log("Datos a actualizar:", conductorData);

    const res = await axios.patch<IConductorApiResponse>(
      `${BASE_URL}/gestion_conductores/${id}`, 
      conductorData
    );

    console.log("Respuesta de actualización:", res.data);

    if (!res.data.success) {
      throw new Error(res.data.message || 'Error al actualizar conductor');
    }

    if (!res.data.data) {
      throw new Error('No se recibieron datos del conductor actualizado');
    }

    return Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error("Error detallado al actualizar conductor:", {
        message: error.message,
        response: error.response.data
      });
    } else {
      console.error("Error al actualizar conductor:", error);
    }
    throw error;
  }
};

export const deleteConductor = async (id: number): Promise<boolean> => {
  try {
    console.log(`Intentando eliminar conductor con ID: ${id}`);
    const res = await axios.delete<IConductorApiResponse>(`${BASE_URL}/gestion_conductores/${id}`);
    console.log("Respuesta del servidor al eliminar:", res.data);
    
    if (!res.data.success) {
      throw new Error(res.data.message || 'Error al eliminar conductor');
    }
    
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Error detallado al eliminar conductor:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      
      // Si el conductor no existe, consideramos que ya está eliminado
      if (error.response?.status === 404) {
        console.log("El conductor no existe o ya fue eliminado");
        return true;
      }
      
      throw new Error(error.response?.data?.message || error.message);
    }
    console.error("Error al eliminar conductor:", error);
    throw error;
  }
};

// --- Usuarios ---
export const getUsuarios = async (): Promise<IUsuariosApiResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/gestion_usuarios`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
};

export const createUsuario = async (data: Partial<IUsuario>) => {
  try {
    const res = await axios.post(`${BASE_URL}/gestion_usuarios`, data);
    console.log("Usuario creado:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
};