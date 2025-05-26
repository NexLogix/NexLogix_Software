import { useState, useCallback } from 'react';
import { fetchAuditorias, fetchAuditoriaById, deleteAuditoria } from '../../services/Auditorias/AuditoriasService';
import { AuditoriasUseCase } from '../../UseCases/Auditorias/AuditoriasUseCase';
import { IAuditoria } from '../../models/Interfaces/IAuditorias';

interface AuditoriasState {
  auditorias: IAuditoria[];
  error: string;
  loading: boolean;
  searchId: string;
}

interface EditAuditoriaState {
  formData: Partial<IAuditoria>;
  errors: Record<string, string>;
  loading: boolean;
  successMessage: string;
  errorMessage: string;
}

export const useAuditoriasController = () => {
  const [state, setState] = useState<AuditoriasState>({
    auditorias: [],
    error: '',
    loading: true,
    searchId: '',
  });

  const fetchAuditoriasData = useCallback(async () => {
    try {
      const response = await fetchAuditorias();
      setState((prev) => ({
        ...prev,
        auditorias: response.success ? response.data : [],
        error: response.success ? '' : 'No se pudo cargar la lista de auditorías',
        loading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar las auditorías';
      setState((prev) => ({ ...prev, auditorias: [], error: message, loading: false }));
    }
  }, []);

  const searchAuditoriaById = useCallback(async (id: number) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await fetchAuditoriaById(id);
      setState((prev) => ({
        ...prev,
        auditorias: response.success ? [response.data] : [],
        error: response.success ? '' : 'No se encontró la auditoría',
        loading: false,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al buscar la auditoría';
      setState((prev) => ({ ...prev, auditorias: [], error: message, loading: false }));
    }
  }, []);

  const deleteAuditoriaById = useCallback(async (id: number) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await deleteAuditoria(id);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          auditorias: prev.auditorias.filter((auditoria) => auditoria.id !== id),
          loading: false,
          error: '',
        }));
      } else {
        setState((prev) => ({ ...prev, error: response.message, loading: false }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido al eliminar la auditoría';
      setState((prev) => ({ ...prev, error: message, loading: false }));
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchId: e.target.value }));
  };

  const handleSearch = () => {
    const id = parseInt(state.searchId, 10);
    if (!isNaN(id)) {
      searchAuditoriaById(id);
    } else {
      setState((prev) => ({ ...prev, error: 'Ingrese un ID válido' }));
    }
  };

  const resetSearch = () => {
    setState((prev) => ({ ...prev, searchId: '', error: '' }));
    fetchAuditoriasData();
  };

  return { state, fetchAuditoriasData, handleSearchChange, handleSearch, resetSearch, deleteAuditoriaById };
};

export const useEditAuditoriaController = () => {
  const [state, setState] = useState<EditAuditoriaState>({
    formData: {},
    errors: {},
    loading: false,
    successMessage: '',
    errorMessage: '',
  });

  const auditoriasUseCase = new AuditoriasUseCase();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [name]: value },
      errors: { ...prev.errors, [name]: '' },
    }));
  };

  const handleUpdateSubmit = async (id: number) => {
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));
    try {
      const response = await auditoriasUseCase.executeUpdatePartialAuditoria(id, state.formData);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: response.message,
          errorMessage: '',
          errors: {},
        }));
      } else {
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: '',
          errorMessage: response.message,
          errors: response.errors || {},
        }));
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
    }
  };

  return { state, handleInputChange, handleUpdateSubmit };
};