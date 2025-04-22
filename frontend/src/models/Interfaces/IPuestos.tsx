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
  
  export interface IPuesto_ApiResponse<T> {
    success: boolean;
    message: string;
    data: T;
    errors?: Record<string, string>;
    status?: number;
  }