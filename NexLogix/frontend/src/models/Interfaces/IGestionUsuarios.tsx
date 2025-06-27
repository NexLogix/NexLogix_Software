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
    fechaAsignacionRole: string;
}

export interface IEstado {
    idestado: number;
    estado: string;
}

// Interfaz principal para Usuario que coincide exactamente con el backend
export interface IUsuario {
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
    estado: IEstado;
    roles: IRol;
    puestos: IPuesto;
}

// DTO para crear usuario (exactamente lo que pide el backend)
export interface ICreateUsuarioDTO {
    documentoIdentidad: string;
    nombreCompleto: string;
    email: string;
    numContacto: string;
    direccionResidencia: string;
    contrasena: string;
    idestado: number;
    idRole: number;
    idPuestos: number;
}

// DTO para actualizar usuario (todos los campos opcionales excepto IDs)
export interface IUpdateUsuarioDTO {
    documentoIdentidad?: string;
    nombreCompleto?: string;
    email?: string;
    numContacto?: string;
    direccionResidencia?: string;
    idestado: number;
    idRole: number;
    idPuestos: number;
}

// Interfaz para las respuestas del API
export interface IApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
}