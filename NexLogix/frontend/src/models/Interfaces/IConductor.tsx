import { IUsuario } from "./IGestionUsuarios";

// Interfaz principal para Conductor que coincide exactamente con el backend
export interface IConductor {
  idConductor: number;
  licencia: string;
  tipoLicencia: string;
  vigenciaLicencia: string;
  estado: string;  // 'disponible', 'en ruta', etc.
  idUsuario: number;
  usuario: IUsuario;  // Relación con el usuario que contiene nombre, email, etc.
  vehiculoAsignado?: string;  // Campo opcional específico del conductor
}

// Respuesta de la API para operaciones de conductores
export interface IConductorApiResponse {
  success: boolean;
  title?: string;
  message?: string;
  data: IConductor[] | IConductor;
  status: number;
}