import { useState, useCallback } from 'react';
import { fetchPuestos, fetchPuestoById, deletePuesto, fetchAreas } from '../../services/Puestos/PuestosService';
import { PuestosUseCase } from '../../UseCases/Puestos/PuestosUseCase';
import { IPuesto, IArea } from '../../models/Interfaces/IPuestos';

interface PuestosState {
  puestos: IPuesto[];
  areas: IArea[];
  error: string;
  loading: boolean;
  searchId: string;
}

interface CreatePuestoState {
  formData: { nombrePuesto: string; descripcionPuesto: string; idArea: number };
  errors: Record<string, string>;
  loading: boolean;
  successMessage: string;
  errorMessage: string;
}

// Controlador para listar y eliminar puestos
export const usePuestosController = () => {
  const [state, setState] = useState<PuestosState>({
    puestos: [],
    areas: [],
    error: '',
    loading: true,
    searchId: '',
  });

  const fetchPuestosData = useCallback(async () => {
    try {
      console.log('usePuestosController: Ejecutando fetchPuestosData');
      const response = await fetchPuestos();
      setState((prev) => ({
        ...prev,
        puestos: response.success ? response.data : [],
        error: response.success ? '' : 'No se pudo cargar la lista de puestos',
        loading: false,
      }));
      console.log('usePuestosController: Puestos cargados:', response.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar los puestos';
      console.error('usePuestosController: Error en fetchPuestosData:', message);
      setState((prev) => ({
        ...prev,
        puestos: [],
        error: message,
        loading: false,
      }));
      if (message.includes('Error 401')) {
        window.location.href = '/login';
      }
    }
  }, []);

  const fetchAreasData = useCallback(async () => {
    try {
      console.log('usePuestosController: Ejecutando fetchAreasData');
      const response = await fetchAreas();
      setState((prev) => ({
        ...prev,
        areas: response.success ? response.data : [],
        error: response.success ? prev.error : 'No se pudo cargar la lista de áreas',
      }));
      console.log('usePuestosController: Áreas cargadas:', response.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar las áreas';
      console.error('usePuestosController: Error en fetchAreasData:', message);
      setState((prev) => ({
        ...prev,
        areas: [],
        error: message,
      }));
    }
  }, []);

  const searchPuestoById = useCallback(async (idPuestos: number) => {
    try {
      console.log('usePuestosController: Buscando puesto con ID:', idPuestos);
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await fetchPuestoById(idPuestos);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          puestos: [response.data],
          loading: false,
        }));
        console.log('usePuestosController: Puesto encontrado:', response.data);
      } else {
        setState((prev) => ({
          ...prev,
          puestos: [],
          error: 'No se encontró el puesto',
          loading: false,
        }));
        console.log('usePuestosController: Puesto no encontrado para ID:', idPuestos);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al buscar el puesto';
      console.error('usePuestosController: Error en searchPuestoById:', message);
      setState((prev) => ({
        ...prev,
        puestos: [],
        error: message,
        loading: false,
      }));
    }
  }, []);

  const deletePuestoById = useCallback(async (idPuestos: number) => {
    try {
      console.log('usePuestosController: Eliminando puesto con ID:', idPuestos);
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await deletePuesto(idPuestos);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          puestos: prev.puestos.filter((puesto) => puesto.idPuestos !== idPuestos),
          loading: false,
          error: '',
        }));
        console.log('usePuestosController: Puesto eliminado con éxito, ID:', idPuestos);
      } else {
        setState((prev) => ({
          ...prev,
          error: response.message,
          loading: false,
        }));
        console.log('usePuestosController: Error al eliminar puesto:', response.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al eliminar el puesto';
      console.error('usePuestosController: Error en deletePuestoById:', message);
      setState((prev) => ({
        ...prev,
        error: message,
        loading: false,
      }));
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchId: e.target.value }));
    console.log('usePuestosController: Search ID actualizado:', e.target.value);
  };

  const handleSearch = () => {
    const idPuestos = parseInt(state.searchId, 10);
    if (!isNaN(idPuestos)) {
      searchPuestoById(idPuestos);
    } else {
      setState((prev) => ({ ...prev, error: 'Ingrese un ID válido' }));
      console.log('usePuestosController: Error - ID inválido:', state.searchId);
    }
  };

  const resetSearch = () => {
    setState((prev) => ({ ...prev, searchId: '', error: '' }));
    fetchPuestosData();
    console.log('usePuestosController: Búsqueda reseteada');
  };

  return { state, fetchPuestosData, fetchAreasData, handleSearchChange, handleSearch, resetSearch, deletePuestoById };
};

// Controlador para crear y editar puestos
export const useCreatePuestoController = () => {
  const [state, setState] = useState<CreatePuestoState>({
    formData: {
      nombrePuesto: '',
      descripcionPuesto: '',
      idArea: 0,
    },
    errors: {},
    loading: false,
    successMessage: '',
    errorMessage: '',
  });

  const puestosUseCase = new PuestosUseCase();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: name === 'idArea' ? parseInt(value, 10) : value,
      },
      errors: {
        ...prev.errors,
        [name]: '',
      },
    }));
    console.log('useCreatePuestoController: Campo actualizado:', name, '=', value);
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));
    console.log('useCreatePuestoController: Enviando formulario de creación:', state.formData);

    try {
      const data = {
        nombrePuesto: state.formData.nombrePuesto,
        descripcionPuesto: state.formData.descripcionPuesto || undefined,
        idArea: state.formData.idArea,
      };
      const response = await puestosUseCase.executeCreatePuesto(data);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: response.message,
          errorMessage: '',
          formData: { nombrePuesto: '', descripcionPuesto: '', idArea: 0 },
          errors: {},
        }));
        console.log('useCreatePuestoController: Puesto creado con éxito:', response.data);
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: '',
          errorMessage: response.message,
          errors: response.errors || {},
        }));
        console.log('useCreatePuestoController: Error al crear puesto:', response.message, response.errors);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al crear el puesto';
      setState((prev) => ({
        ...prev,
        loading: false,
        successMessage: '',
        errorMessage: message,
        errors: {},
      }));
      console.error('useCreatePuestoController: Error en handleCreateSubmit:', message);
    }
  };

  const handleUpdateSubmit = async (id: number, isPartial: boolean = false) => {
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));
    console.log('useCreatePuestoController: Enviando formulario de edición:', state.formData, 'ID:', id, 'Parcial:', isPartial);

    try {
      const data = {
        nombrePuesto: state.formData.nombrePuesto,
        descripcionPuesto: state.formData.descripcionPuesto || undefined,
        idArea: state.formData.idArea,
      };
      const response = isPartial
        ? await puestosUseCase.executeUpdatePartialPuesto(id, data)
        : await puestosUseCase.executeUpdatePuesto(id, data);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: response.message,
          errorMessage: '',
          errors: {},
        }));
        console.log('useCreatePuestoController: Puesto actualizado con éxito:', response.data);
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: '',
          errorMessage: response.message,
          errors: response.errors || {},
        }));
        console.log('useCreatePuestoController: Error al actualizar puesto:', response.message, response.errors);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al actualizar el puesto';
      setState((prev) => ({
        ...prev,
        loading: false,
        successMessage: '',
        errorMessage: message,
        errors: {},
      }));
      console.error('useCreatePuestoController: Error en handleUpdateSubmit:', message);
    }
  };

  return { state, handleInputChange, handleCreateSubmit, handleUpdateSubmit };
};