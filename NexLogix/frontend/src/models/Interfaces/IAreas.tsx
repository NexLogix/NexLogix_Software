// Definimos las interfaces para las áreas y las respuestas de la API

// Interface de Areas
export interface IArea {
    idArea: number;
    nombreArea: string;
    descripcionArea: string;
}

// Interfae repouesta de las apis
export interface IArea_ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: Record<string, string>;
    status?: number;
}