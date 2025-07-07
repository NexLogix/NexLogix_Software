// Interfaces para las relaciones
export interface IArea {
    idArea: number;
    nombreArea: string;
    descripcionArea: string;
}

export interface IPuesto {
    idPuestos: number;
    nombrePuesto: string;
    fechaAsignacionPuesto: string;
    descripcionPuesto: string;
    idArea: number;
    areas: IArea;
}

export interface IRol {
    idRole: number;
    nombreRole: string;
    descripcionRole: string;
}

export interface IEstado {
    idEstado: number;
    nombreEstado: string;
    descripcionEstado: string;
}

// Interfaz principal para Usuario que coincide exactamente con el backend
export interface IUsuario {
    idUsuario: number;
    documento: string;
    nombre: string;
    email: string;
    telefono: string;
    idRole: number;
    idPuesto: number;
    idEstado: number;
    rol?: IRol;
    puesto?: IPuesto;
    estado?: IEstado;
}

// Respuesta de la API para operaciones de usuarios
export interface IUsuarioApiResponse {
    success: boolean;
    title?: string;
    message?: string;
    data: IUsuario[] | IUsuario;
    status: number;
}