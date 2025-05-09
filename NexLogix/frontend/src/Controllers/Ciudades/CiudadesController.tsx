import { useState, useCallback } from 'react';
import { fetchCiudades, fetchCiudadById, deleteCiudad } from '../../services/Ciudades/CiudadesService';
import { CiudadesUseCase } from '../../UseCases/Ciudades/CiudadesUseCase';
import { ICiudad } from '../../models/Interfaces/ICiudades';

interface CiudadesState {
  ciudades: ICiudad[];
  error: string;
  loading: boolean;
  searchId: string;
}

interface CreateCiudadState {
  formData: { nombreCiudad: string; costoPor_Ciudad: number };
  errors: Record<string, string>;
  loading: boolean;
  successMessage: string;
  errorMessage: string;
}

// Controlador para listar y eliminar ciudades
export const useCiudadesController = () => {
  const [state, setState] = useState<CiudadesState>({
    ciudades: [],
    error: '',
    loading: true,
    searchId: '',
  });

  const fetchCiudadesData = useCallback(async () => {
    try {
      console.log('useCiudadesController: Ejecutando fetchCiudadesData');
      const response = await fetchCiudades();
      setState((prev) => ({
        ...prev,
        ciudades: response.success ? response.data : [],
        error: response.success ? '' : 'No se pudo cargar la lista de ciudades',
        loading: false,
      }));
      console.log('useCiudadesController: Ciudades cargadas:', response.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar las ciudades';
      console.error('useCiudadesController: Error en fetchCiudadesData:', message);
      setState((prev) => ({
        ...prev,
        ciudades: [],
        error: message,
        loading: false,
      }));
      if (message.includes('Error 401')) {
        window.location.href = '/login';
      }
    }
  }, []);

  const searchCiudadById = useCallback(async (idCiudad: number) => {
    try {
      console.log('useCiudadesController: Buscando ciudad con ID:', idCiudad);
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await fetchCiudadById(idCiudad);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          ciudades: [response.data],
          loading: false,
        }));
        console.log('useCiudadesController: Ciudad encontrada:', response.data);
      } else {
        setState((prev) => ({
          ...prev,
          ciudades: [],
          error: 'No se encontró la ciudad',
          loading: false,
        }));
        console.log('useCiudadesController: Ciudad no encontrada para ID:', idCiudad);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al buscar la ciudad';
      console.error('useCiudadesController: Error en searchCiudadById:', message);
      setState((prev) => ({
        ...prev,
        ciudades: [],
        error: message,
        loading: false,
      }));
    }
  }, []);

  const deleteCiudadById = useCallback(async (idCiudad: number) => {
    try {
      console.log('useCiudadesController: Eliminando ciudad con ID:', idCiudad);
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await deleteCiudad(idCiudad);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          ciudades: prev.ciudades.filter((ciudad) => ciudad.idCiudad !== idCiudad),
          loading: false,
          error: '',
        }));
        console.log('useCiudadesController: Ciudad eliminada con éxito, ID:', idCiudad);
      } else {
        setState((prev) => ({
          ...prev,
          error: response.message,
          loading: false,
        }));
        console.log('useCiudadesController: Error al eliminar ciudad:', response.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al eliminar la ciudad';
      console.error('useCiudadesController: Error en deleteCiudadById:', message);
      setState((prev) => ({
        ...prev,
        error: message,
        loading: false,
      }));
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchId: e.target.value }));
    console.log('useCiudadesController: Search ID actualizado:', e.target.value);
  };

  const handleSearch = () => {
    const idCiudad = parseInt(state.searchId, 10);
    if (!isNaN(idCiudad)) {
      searchCiudadById(idCiudad);
    } else {
      setState((prev) => ({ ...prev, error: 'Ingrese un ID válido' }));
      console.log('useCiudadesController: Error - ID inválido:', state.searchId);
    }
  };

  const resetSearch = () => {
    setState((prev) => ({ ...prev, searchId: '', error: '' }));
    fetchCiudadesData();
    console.log('useCiudadesController: Búsqueda reseteada');
  };

  return { state, fetchCiudadesData, handleSearchChange, handleSearch, resetSearch, deleteCiudadById };
};

// Controlador para crear y editar ciudades
export const useCreateCiudadController = () => {
  const [state, setState] = useState<CreateCiudadState>({
    formData: {
      nombreCiudad: '',
      costoPor_Ciudad: 0,
    },
    errors: {},
    loading: false,
    successMessage: '',
    errorMessage: '',
  });

  const ciudadesUseCase = new CiudadesUseCase();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: name === 'costoPor_Ciudad' ? parseFloat(value) : value,
      },
      errors: {
        ...prev.errors,
        [name]: '',
      },
    }));
    console.log('useCreateCiudadController: Campo actualizado:', name, '=', value);
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));
    console.log('useCreateCiudadController: Enviando formulario de creación:', state.formData);

    try {
      const data = {
        nombreCiudad: state.formData.nombreCiudad,
        costoPor_Ciudad: state.formData.costoPor_Ciudad,
      };
      const response = await ciudadesUseCase.executeCreateCiudad(data);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: response.message,
          errorMessage: '',
          formData: { nombreCiudad: '', costoPor_Ciudad: 0 },
          errors: {},
        }));
        console.log('useCreateCiudadController: Ciudad creada con éxito:', response.data);
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: '',
          errorMessage: response.message,
          errors: response.errors || {},
        }));
        console.log('useCreateCiudadController: Error al crear ciudad:', response.message, response.errors);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al crear la ciudad';
      setState((prev) => ({
        ...prev,
        loading: false,
        successMessage: '',
        errorMessage: message,
        errors: {},
      }));
      console.error('useCreateCiudadController: Error en handleCreateSubmit:', message);
    }
  };

  const handleUpdateSubmit = async (id: number, isPartial: boolean = false) => {
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));
    console.log('useCreateCiudadController: Enviando formulario de edición:', state.formData, 'ID:', id, 'Parcial:', isPartial);

    try {
      const data = {
        nombreCiudad: state.formData.nombreCiudad,
        costoPor_Ciudad: state.formData.costoPor_Ciudad,
      };
      const response = isPartial
        ? await ciudadesUseCase.executeUpdatePartialCiudad(id, data)
        : await ciudadesUseCase.executeUpdateCiudad(id, data);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: response.message,
          errorMessage: '',
          errors: {},
        }));
        console.log('useCreateCiudadController: Ciudad actualizada con éxito:', response.data);
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: '',
          errorMessage: response.message,
          errors: response.errors || {},
        }));
        console.log('useCreateCiudadController: Error al actualizar ciudad:', response.message, response.errors);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al actualizar la ciudad';
      setState((prev) => ({
        ...prev,
        loading: false,
        successMessage: '',
        errorMessage: message,
        errors: {},
      }));
      console.error('useCreateCiudadController: Error en handleUpdateSubmit:', message);
    }
  };

  return { state, handleInputChange, handleCreateSubmit, handleUpdateSubmit };
};