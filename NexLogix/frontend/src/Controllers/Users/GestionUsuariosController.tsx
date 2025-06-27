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

        try {
            const [rolesResponse, puestosResponse, estadosResponse] = await Promise.all([
                gestionUsuariosUseCase.getRoles(),
                gestionUsuariosUseCase.getPuestos(),
                gestionUsuariosUseCase.getEstados()
            ]);

            if (rolesResponse.success) {
                console.log('Roles cargados:', rolesResponse.data);
                setRoles(rolesResponse.data);
            }
            if (puestosResponse.success) {
                console.log('Puestos cargados:', puestosResponse.data);
                setPuestos(puestosResponse.data);
            }
            if (estadosResponse.success) {
                console.log('Estados cargados:', estadosResponse.data);
                setEstados(estadosResponse.data);
            }
        } catch (error) {
            console.error('Error al cargar catálogos:', error);
            setErrorMessage('Error al cargar los catálogos');
        } finally {
            setIsLoading(false);
        }
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
        const inicializarDatos = async () => {
            await cargarCatalogos(); // Cargamos primero los catálogos
            await cargarUsuarios();  // Luego cargamos los usuarios
        };
        inicializarDatos();
    }, []);

    // Asegurarnos que los catálogos estén cargados antes de mostrar modales
    const prepararCrearUsuario = async () => {
        if (roles.length === 0 || puestos.length === 0 || estados.length === 0) {
            await cargarCatalogos();
        }
    };

    return {
        // Estados
        usuarios,
        roles,
        puestos,
        estados,
        isLoading,
        errorMessage,
        setErrorMessage, // Añadimos el setter aquí

        // Métodos
        cargarUsuarios,
        buscarUsuario,
        crearUsuario,
        actualizarUsuario,
        eliminarUsuario,
        cargarCatalogos,
        prepararCrearUsuario
    };
};