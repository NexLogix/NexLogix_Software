export interface IRol {
  idRole: number;
  nombreRole: string;
  descripcionRole: string;
  fechaAsignacionRole: string;
}

export interface IRol_ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  status?: number;
  errors?: Record<string, string>;
}