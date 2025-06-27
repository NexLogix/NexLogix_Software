import { 
    IApiResponse, 
    IUsuario, 
    ICreateUsuarioDTO, 
    IUpdateUsuarioDTO,
    IRol,
    IEstado,
    IPuesto 
} from '../../models/Interfaces/IGestionUsuarios';
import { UsuariosService, CatalogosService } from '../../services/Users/GestionUsuariosServices';

export class GestionUsuariosUseCase {
    // Métodos principales para usuarios
    async getAllUsuarios(): Promise<IApiResponse<IUsuario[]>> {
        return UsuariosService.getAll();
    }

    async getUsuarioById(value: string): Promise<IApiResponse<IUsuario>> {
        return UsuariosService.getById(value);
    }

    async createUsuario(usuario: ICreateUsuarioDTO): Promise<IApiResponse<IUsuario>> {
        return UsuariosService.create(usuario);
    }

    async updateUsuario(id: number, usuario: IUpdateUsuarioDTO): Promise<IApiResponse<IUsuario>> {
        return UsuariosService.update(id, usuario);
    }

    async deleteUsuario(id: number): Promise<IApiResponse<null>> {
        return UsuariosService.delete(id);
    }

    // Métodos para catálogos
    async getRoles(): Promise<IApiResponse<IRol[]>> {
        return CatalogosService.getRoles();
    }

    async getPuestos(): Promise<IApiResponse<IPuesto[]>> {
        return CatalogosService.getPuestos();
    }

    async getEstados(): Promise<IApiResponse<IEstado[]>> {
        return CatalogosService.getEstados();
    }
}

// Exportamos una instancia única para usar en toda la aplicación
export const gestionUsuariosUseCase = new GestionUsuariosUseCase();