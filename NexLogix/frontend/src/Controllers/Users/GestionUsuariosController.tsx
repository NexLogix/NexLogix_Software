import { useState, useEffect } from 'react';
import {
    IUsuario,
    IRol,
    IEstado,
    IPuesto,
    ICreateUsuarioDTO,
    IUpdateUsuarioDTO
} from '../../models/Interfaces/IGestionUsuarios';
import { gestionUsuariosUseCase } from '../../UseCases/Users/GestionUsuariosUseCase';

export const useUsuariosController = () => {
    // Estados principales
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    // Estados para catálogos
    const [roles, setRoles] = useState<IRol[]>([]);
    const [puestos, setPuestos] = useState<IPuesto[]>([]);
    const [estados, setEstados] = useState<IEstado[]>([]);

    // Cargar usuarios
    const cargarUsuarios = async () => {
        setIsLoading(true);
        setErrorMessage('');

        const response = await gestionUsuariosUseCase.getAllUsuarios();

        if (response.success) {
            setUsuarios(response.data);
        } else {
            setErrorMessage(response.message);
        }

        setIsLoading(false);
    };

    // Cargar catálogos
    const cargarCatalogos = async () => {
        setIsLoading(true);
        setErrorMessage('');

        const [rolesResponse, puestosResponse, estadosResponse] = await Promise.all([
            gestionUsuariosUseCase.getRoles(),
            gestionUsuariosUseCase.getPuestos(),
            gestionUsuariosUseCase.getEstados()
        ]);

        if (rolesResponse.success) setRoles(rolesResponse.data);
        if (puestosResponse.success) setPuestos(puestosResponse.data);
        if (estadosResponse.success) setEstados(estadosResponse.data);

        setIsLoading(false);
    };

    // Buscar usuario
    const buscarUsuario = async (value: string) => {
        setIsLoading(true);
        setErrorMessage('');

        const response = await gestionUsuariosUseCase.getUsuarioById(value);

        if (response.success) {
            setUsuarios([response.data]);
        } else {
            setErrorMessage(response.message);
            setUsuarios([]);
        }

        setIsLoading(false);
    };

    // Crear usuario
    const crearUsuario = async (usuario: ICreateUsuarioDTO) => {
        setIsLoading(true);
        setErrorMessage('');

        const response = await gestionUsuariosUseCase.createUsuario(usuario);

        if (response.success) {
            await cargarUsuarios();
            return true;
        } else {
            setErrorMessage(response.message);
            return false;
        }
    };

    // Actualizar usuario
    const actualizarUsuario = async (id: number, usuario: IUpdateUsuarioDTO) => {
        setIsLoading(true);
        setErrorMessage('');

        const response = await gestionUsuariosUseCase.updateUsuario(id, usuario);

        if (response.success) {
            await cargarUsuarios();
            return true;
        } else {
            setErrorMessage(response.message);
            return false;
        }
    };

    // Eliminar usuario
    const eliminarUsuario = async (id: number) => {
        setIsLoading(true);
        setErrorMessage('');

        const response = await gestionUsuariosUseCase.deleteUsuario(id);

        if (response.success) {
            await cargarUsuarios();
            return true;
        } else {
            setErrorMessage(response.message);
            return false;
        }
    };

    // Cargar datos iniciales
    useEffect(() => {
        cargarUsuarios();
        cargarCatalogos();
    }, []);

    return {
        // Estados
        usuarios,
        roles,
        puestos,
        estados,
        isLoading,
        errorMessage,
        setErrorMessage, // <-- AGREGA ESTA LÍNEA

        // Métodos
        cargarUsuarios,
        buscarUsuario,
        crearUsuario,
        actualizarUsuario,
        eliminarUsuario
    };
};