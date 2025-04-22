import { useState, useCallback } from 'react';
import { fetchAreas, deleteArea } from '../../services/Areas/AreasService';
import { AreasUseCase } from '../../UseCases/Areas/AreasUseCase';
import { IArea } from '../../models/Interfaces/IAreas';

interface AreasState {
  areas: IArea[];
  error: string;
  loading: boolean;
  searchId: string;
}

interface CreateAreaState {
  formData: { nombreArea: string; descripcionArea: string };
  errors: Record<string, string>;
  loading: boolean;
  successMessage: string;
  errorMessage: string;
}

// Controlador para listar y eliminar áreas
export const useAreasController = () => {
  const [state, setState] = useState<AreasState>({
    areas: [],
    error: '',
    loading: true,
    searchId: '',
  });

  const fetchAreasData = useCallback(async () => {
    try {
      console.log('useAreasController: Ejecutando fetchAreasData');
      const response = await fetchAreas();
      setState((prev) => ({
        ...prev,
        areas: response.success ? response.data : [],
        error: response.success ? '' : 'No se pudo cargar la lista de áreas',
        loading: false,
      }));
      console.log('useAreasController: Áreas cargadas:', response.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar las áreas';
      console.error('useAreasController: Error en fetchAreasData:', message);
      setState((prev) => ({
        ...prev,
        areas: [],
        error: message,
        loading: false,
      }));
      if (message.includes('Error 401')) {
        window.location.href = '/login';
      }
    }
  }, []);

  const searchAreaById = useCallback(async (idArea: number) => {
    try {
      console.log('useAreasController: Buscando área con ID:', idArea);
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await fetchAreas();
      if (response.success) {
        const area = response.data.find((a) => a.idArea === idArea);
        if (area) {
          setState((prev) => ({
            ...prev,
            areas: [area],
            loading: false,
          }));
          console.log('useAreasController: Área encontrada:', area);
        } else {
          setState((prev) => ({
            ...prev,
            areas: [],
            error: 'No se encontró el área',
            loading: false,
          }));
          console.log('useAreasController: Área no encontrada para ID:', idArea);
        }
      } else {
        setState((prev) => ({
          ...prev,
          areas: [],
          error: 'Error al buscar el área',
          loading: false,
        }));
        console.log('useAreasController: Error al buscar área:', response.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al buscar el área';
      console.error('useAreasController: Error en searchAreaById:', message);
      setState((prev) => ({
        ...prev,
        areas: [],
        error: message,
        loading: false,
      }));
    }
  }, []);

  const deleteAreaById = useCallback(async (idArea: number) => {
    try {
      console.log('useAreasController: Eliminando área con ID:', idArea);
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await deleteArea(idArea);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          areas: prev.areas.filter((area) => area.idArea !== idArea),
          loading: false,
          error: '',
        }));
        console.log('useAreasController: Área eliminada con éxito, ID:', idArea);
      } else {
        setState((prev) => ({
          ...prev,
          error: response.message,
          loading: false,
        }));
        console.log('useAreasController: Error al eliminar área:', response.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al eliminar el área';
      console.error('useAreasController: Error en deleteAreaById:', message);
      setState((prev) => ({
        ...prev,
        error: message,
        loading: false,
      }));
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchId: e.target.value }));
    console.log('useAreasController: Search ID actualizado:', e.target.value);
  };

  const handleSearch = () => {
    const idArea = parseInt(state.searchId, 10);
    if (!isNaN(idArea)) {
      searchAreaById(idArea);
    } else {
      setState((prev) => ({ ...prev, error: 'Ingrese un ID válido' }));
      console.log('useAreasController: Error - ID inválido:', state.searchId);
    }
  };

  const resetSearch = () => {
    setState((prev) => ({ ...prev, searchId: '', error: '' }));
    fetchAreasData();
    console.log('useAreasController: Búsqueda reseteada');
  };

  return { state, fetchAreasData, handleSearchChange, handleSearch, resetSearch, deleteAreaById };
};

// Controlador para crear y editar áreas
export const useCreateAreaController = () => {
  const [state, setState] = useState<CreateAreaState>({
    formData: {
      nombreArea: '',
      descripcionArea: '',
    },
    errors: {},
    loading: false,
    successMessage: '',
    errorMessage: '',
  });

  const areasUseCase = new AreasUseCase();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: value,
      },
      errors: {
        ...prev.errors,
        [name]: '',
      },
    }));
    console.log('useCreateAreaController: Campo actualizado:', name, '=', value);
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));
    console.log('useCreateAreaController: Enviando formulario de creación:', state.formData);

    try {
      const data = {
        nombreArea: state.formData.nombreArea,
        descripcionArea: state.formData.descripcionArea || undefined,
      };
      const response = await areasUseCase.executeCreateArea(data);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: response.message,
          errorMessage: '',
          formData: { nombreArea: '', descripcionArea: '' },
          errors: {},
        }));
        console.log('useCreateAreaController: Área creada con éxito:', response.data);
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: '',
          errorMessage: response.message,
          errors: response.errors || {},
        }));
        console.log('useCreateAreaController: Error al crear área:', response.message, response.errors);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al crear el área';
      setState((prev) => ({
        ...prev,
        loading: false,
        successMessage: '',
        errorMessage: message,
        errors: {},
      }));
      console.error('useCreateAreaController: Error en handleCreateSubmit:', message);
    }
  };

  const handleUpdateSubmit = async (id: number, isPartial: boolean = false) => {
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));
    console.log('useCreateAreaController: Enviando formulario de edición:', state.formData, 'ID:', id, 'Parcial:', isPartial);

    try {
      const data = {
        nombreArea: state.formData.nombreArea,
        descripcionArea: state.formData.descripcionArea,
      };
      const response = isPartial
        ? await areasUseCase.executeUpdatePartialArea(id, data)
        : await areasUseCase.executeUpdateArea(id, data);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: response.message,
          errorMessage: '',
          errors: {},
        }));
        console.log('useCreateAreaController: Área actualizada con éxito:', response.data);
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: '',
          errorMessage: response.message,
          errors: response.errors || {},
        }));
        console.log('useCreateAreaController: Error al actualizar área:', response.message, response.errors);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al actualizar el área';
      setState((prev) => ({
        ...prev,
        loading: false,
        successMessage: '',
        errorMessage: message,
        errors: {},
      }));
      console.error('useCreateAreaController: Error en handleUpdateSubmit:', message);
    }
  };

  return { state, handleInputChange, handleCreateSubmit, handleUpdateSubmit };
};