// Interface de cuidades
export interface ICiudad {
    idCiudad: number;
    nombreCiudad: string;
    costoPor_Ciudad: number;
  }
// Interface, respuesta en Api
  export interface ICiudad_ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: Record<string, string>;
    status?: number;
  }