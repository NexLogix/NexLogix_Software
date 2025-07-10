import { IConductor } from './IConductor';

export interface IRuta {
    idRuta: number;
    nombreRuta: string;
    horaInicioRuta: string;
    horaFinalizacionRuta: string;
    descripcion: string;
    estadoRuta: 'EN_BODEGA' | 'EN_RUTA' | 'EN_RECOGIDA' | 'EN_ENTREGA' | 'EN_DEVOLUCIONES';
    novedades: string;
    fechaCreacionRuta: string;
    asignacion__vehiculos__por__rutas: IAsignacionVehiculoRuta[];
    asignacion__rutas__por__ciudades: IAsignacionRutaCiudad[];
}

export interface IAsignacionVehiculoRuta {
    idAsignacionVehiculoRuta: number;
    fechaAsignacionInicio: string;
    fechaAsignacionFinalizacion: string | null;
    idVehiculo: number;
    idRuta: number;
    vehiculo_asignado: IVehiculo;
    conductor?: IConductor;
}

export interface IAsignacionRutaCiudad {
    idasignacion_rutas_por_ciudades: number;
    idRuta: number;
    idCiudad: number;
    ciudad: ICiudad;
}

export interface IVehiculo {
    idVehiculo: number;
    placa: string;
    marcaVehiculo: string;
    tipoVehiculo: string;
    capacidad: string;
    estadoVehiculo: string;
    ultimoMantenimiento: string;
}

export interface ICiudad {
    idCiudad: number;
    nombreCiudad: string;
    costoPor_Ciudad: string;
}

// Interfaces para las respuestas de la API
export interface IRutaResponse {
    success: boolean;
    message: string;
    data: IRuta[];
    status: number;
}

export interface ISingleRutaResponse {
    success: boolean;
    message: string;
    data: IRuta;
    status: number;
}

// Interface para crear una nueva ruta
export interface ICreateRutaRequest {
    nombreRuta: string;
    horaInicioRuta: string;
    horaFinalizacionRuta: string;
    descripcion: string;
    estadoRuta?: 'EN_BODEGA' | 'EN_RUTA' | 'EN_RECOGIDA' | 'EN_ENTREGA' | 'EN_DEVOLUCIONES';
    novedades?: string;
}

export interface IBasicResponse {
    success: boolean;
    message: string;
    status: number;
}

export interface IVehiculosResponse {
    success: boolean;
    message: string;
    data: IVehiculo[];
    status: number;
}

export interface ICiudadesResponse {
    success: boolean;
    message: string;
    data: ICiudad[];
    status: number;
}

export interface IAsignacionVehiculoResponse {
    success: boolean;
    message: string;
    data: IAsignacionVehiculoRuta;
    status: number;
}

export interface IAsignacionCiudadResponse {
    success: boolean;
    message: string;
    data: IAsignacionRutaCiudad;
    status: number;
}

export interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
        status?: number;
    };
    message?: string;
}

export interface IAxiosError {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
    status?: number;
  };
  message: string;
}
