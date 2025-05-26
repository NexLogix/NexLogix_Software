// Importa hooks de React para manejar estado, efectos secundarios y funciones memorizadas
import { useState, useCallback } from 'react';
// Importa funciones del servicio para interactuar con la API de auditorías
import { fetchAuditorias, fetchAuditoriaById, deleteAuditoria } from '../../services/Auditorias/AuditoriasService';
// Importa la clase AuditoriasUseCase para manejar la lógica de negocio
import { AuditoriasUseCase } from '../../UseCases/Auditorias/AuditoriasUseCase';
// Importa las interfaces necesarias para tipar los datos de auditorías
import { IAuditoria } from '../../models/Interfaces/IAuditorias';

// Define la interfaz AuditoriasState para tipar el estado del controlador de auditorías
interface AuditoriasState {
  auditorias: IAuditoria[]; // Lista de auditorías
  error: string; // Mensaje de error
  loading: boolean; // Indicador de carga
  searchId: string; // ID de búsqueda ingresado por el usuario
}

// Define la interfaz UpdateAuditoriaState para tipar el estado del controlador de edición
interface UpdateAuditoriaState {
  formData: Partial<{ action: string; resource_type: string; details: string; updated_at: string }>; // Datos del formulario
  errors: Record<string, string>; // Errores de validación
  loading: boolean; // Indicador de carga
  successMessage: string; // Mensaje de éxito
  errorMessage: string; // Mensaje de error
}

// Define el hook personalizado useAuditoriasController para manejar la lógica de listar y eliminar auditorías
export const useAuditoriasController = () => {
  const [state, setState] = useState<AuditoriasState>({
    auditorias: [],
    error: '',
    loading: true,
    searchId: '',
  });

  const fetchAuditoriasData = useCallback(async () => {
    try {
      console.log('useAuditoriasController: Ejecutando fetchAuditoriasData');
      const response = await fetchAuditorias();
      setState((prev) => ({
        ...prev,
        auditorias: response.success ? response.data : [],
        error: response.success ? '' : 'No se pudo cargar la lista de auditorías',
        loading: false,
      }));
      console.log('useAuditoriasController: Auditorías cargadas:', response.data);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar las auditorías';
      console.error('useAuditoriasController: Error en fetchAuditoriasData:', message);
      setState((prev) => ({
        ...prev,
        auditorias: [],
        error: message,
        loading: false,
      }));
      if (message.includes('Error 401')) {
        window.location.href = '/login';
      }
    }
  }, []);

  const fetchAuditoriaDataById = useCallback(async (id: number) => {
    try {
      console.log('useAuditoriasController: Buscando auditoría con ID:', id);
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await fetchAuditoriaById(id);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          auditorias: [response.data],
          loading: false,
        }));
        console.log('useAuditoriasController: Auditoría encontrada:', response.data);
      } else {
        setState((prev) => ({
          ...prev,
          auditorias: [],
          error: 'No se encontró la auditoría',
          loading: false,
        }));
        console.log('useAuditoriasController: Auditoría no encontrada para ID:', id);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al buscar la auditoría';
      console.error('useAuditoriasController: Error en fetchAuditoriaDataById:', message);
      setState((prev) => ({
        ...prev,
        auditorias: [],
        error: message,
        loading: false,
      }));
    }
  }, []);

  const deleteAuditoriaById = useCallback(async (id: number) => {
    try {
      console.log('useAuditoriasController: Eliminando auditoría con ID:', id);
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await deleteAuditoria(id);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          auditorias: prev.auditorias.filter((auditoria) => auditoria.id !== id),
          loading: false,
          error: '',
        }));
        console.log('useAuditoriasController: Auditoría eliminada con éxito, ID:', id);
      } else {
        setState((prev) => ({
          ...prev,
          error: response.message,
          loading: false,
        }));
        console.log('useAuditoriasController: Error al eliminar auditoría:', response.message);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al eliminar la auditoría';
      console.error('useAuditoriasController: Error en deleteAuditoriaById:', message);
      setState((prev) => ({
        ...prev,
        error: message,
        loading: false,
      }));
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchId: e.target.value }));
    console.log('useAuditoriasController: Search ID actualizado:', e.target.value);
  };

  const handleSearch = () => {
    const id = parseInt(state.searchId, 10);
    if (!isNaN(id)) {
      fetchAuditoriaDataById(id);
    } else {
      setState((prev) => ({ ...prev, error: 'Ingrese un ID válido' }));
      console.log('useAuditoriasController: Error - ID inválido:', state.searchId);
    }
  };

  const resetSearch = () => {
    setState((prev) => ({ ...prev, searchId: '', error: '' }));
    fetchAuditoriasData();
    console.log('useAuditoriasController: Búsqueda reseteada');
  };

  return { state, fetchAuditoriasData, handleSearchChange, handleSearch, resetSearch, deleteAuditoriaById };
};

// Define el hook personalizado useUpdateAuditoriaController para manejar la lógica de edición de auditorías
export const useUpdateAuditoriaController = () => {
  const [state, setState] = useState<UpdateAuditoriaState>({
    formData: {},
    errors: {},
    loading: false,
    successMessage: '',
    errorMessage: '',
  });

  const auditoriasUseCase = new AuditoriasUseCase();

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
    console.log('useUpdateAuditoriaController: Campo actualizado:', name, '=', value);
  };

  const handleUpdateSubmit = async (id: number) => {
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));
    console.log('useUpdateAuditoriaController: Enviando formulario de edición:', state.formData, 'ID:', id);

    try {
      const response = await auditoriasUseCase.executeUpdateAuditoria(id, state.formData);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: response.message,
          errorMessage: '',
          errors: {},
        }));
        console.log('useUpdateAuditoriaController: Auditoría actualizada con éxito:', response.data);
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: '',
          errorMessage: response.message,
          errors: response.errors || {},
        }));
        console.log('useUpdateAuditoriaController: Error al actualizar auditoría:', response.message, response.errors);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al actualizar la auditoría';
      setState((prev) => ({
        ...prev,
        loading: false,
        successMessage: '',
        errorMessage: message,
        errors: {},
      }));
      console.error('useUpdateAuditoriaController: Error en handleUpdateSubmit:', message);
    }
  };

  return { state, handleInputChange, handleUpdateSubmit };
};