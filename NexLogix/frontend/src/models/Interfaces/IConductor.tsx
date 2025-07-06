import { IUsuario } from "./IGestionUsuarios";

export interface IConductor {
  idConductor: number;
  licencia: string;
  tipoLicencia: string;
  vigenciaLicencia: string;
  estado: string;
  idUsuario: number;
  usuario: IUsuario;
}

// Opcional: interfaz para la respuesta de la API
export interface IConductorApiResponse {
  success: boolean;
  title?: string;
  message?: string;
  data: IConductor[] | IConductor;
  status?: number;
}