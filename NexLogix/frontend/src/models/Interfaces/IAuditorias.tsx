export interface IAuditoria {
  id: number;
  user_id: number;
  action: string;
  resource_type: string;
  details: string | Record<string, string> | string[];
  created_at: string;
  updated_at: string;
}

export interface IAuditoriaApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: Record<string, string>;
  status?: number;
}