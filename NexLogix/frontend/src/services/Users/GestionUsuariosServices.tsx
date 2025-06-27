import axios from 'axios';
import { 
    IApiResponse, 
    IUsuario, 
    ICreateUsuarioDTO, 
    IUpdateUsuarioDTO,
    IRol,
    IEstado,
    IPuesto 
} from '../../models/Interfaces/IGestionUsuarios';

const BASE_URL = 'http://127.0.0.1:8000/api';

// Servicio para Usuarios
export const UsuariosService = {
    getAll: (): Promise<IApiResponse<IUsuario[]>> => {
        return axios.get(`${BASE_URL}/gestion_usuarios`)
            .then(response => response.data);
    },

    getById: (value: string): Promise<IApiResponse<IUsuario>> => {
        return axios.get(`${BASE_URL}/gestion_usuarios/${value}`)
            .then(response => response.data)
            .catch(error => {
                // Manejo específico para usuario no encontrado
                if (error.response?.status === 404) {
                    return {
                        success: false,
                        message: 'Usuario no encontrado',
                        data: null
                    };
                }
                // Otros errores del servidor
                return {
                    success: false,
                    message: error.response?.data?.message || 'Error al buscar usuario',
                    data: null
                };
            });
    },

    create: (usuario: ICreateUsuarioDTO): Promise<IApiResponse<IUsuario>> => {
        return axios.post(`${BASE_URL}/gestion_usuarios`, usuario)
            .then(response => response.data);
    },

    update: (id: number, usuario: IUpdateUsuarioDTO): Promise<IApiResponse<IUsuario>> => {
        return axios.patch(`${BASE_URL}/gestion_usuarios/${id}`, usuario)
            .then(response => response.data);
    },

    delete: (id: number): Promise<IApiResponse<null>> => {
        return axios.delete(`${BASE_URL}/gestion_usuarios/${id}`)
            .then(response => response.data);
    }
};

// Servicios para Catálogos
export const CatalogosService = {
    getRoles: (): Promise<IApiResponse<IRol[]>> => {
        return axios.get(`${BASE_URL}/gestion_roles`)
            .then(response => response.data);
    },

    getPuestos: (): Promise<IApiResponse<IPuesto[]>> => {
        return axios.get(`${BASE_URL}/gestion_puestos`)
            .then(response => response.data);
    },

    getEstados: (): Promise<IApiResponse<IEstado[]>> => {
        return axios.get(`${BASE_URL}/gestion_estados`)
            .then(response => response.data);
    }
};