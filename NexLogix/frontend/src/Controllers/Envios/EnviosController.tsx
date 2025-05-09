import { useState, useEffect, useCallback } from 'react';
import { fetchCiudades, fetchCategoriasEnvio, fetchEnvios, fetchEnvioPorId } from '../../services/Envios/EnvioService';
import { Ciudad, CategoriaEnvio, Envio } from '../../models/Interfaces/IEnvios';
import { EnvioFormData, CrearEnvioUseCase } from '../../UseCases/Envios/EnviosUseCase';

// Controlador para listar y buscar envíos
interface EnviosState {
  envios: Envio[];
  error: string;
  loading: boolean;
  searchId: string;
}

export const useEnviosController = () => {
  const [state, setState] = useState<EnviosState>({
    envios: [],
    error: '',
    loading: true,
    searchId: '',
  });

  const fetchEnviosData = useCallback(async () => {
    try {
      console.log('Fetching envíos en EnviosController...');
      const response = await fetchEnvios();
      setState((prev) => ({
        ...prev,
        envios: response.success ? response.data : [],
        error: response.success ? '' : 'No se pudo cargar la lista de envíos',
        loading: false,
      }));
    } catch (error) {
      console.error('Error en EnviosController:', error);
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar los envíos';
      setState((prev) => ({
        ...prev,
        envios: [],
        error: message,
        loading: false,
      }));
      if (message.includes('Error 401')) {
        window.location.href = '/login';
      }
    }
  }, []);

  const buscarEnvioPorId = useCallback(async (idEnvio: number) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      const response = await fetchEnvioPorId(idEnvio);
      if (response.success) {
        setState((prev) => ({
          ...prev,
          envios: [response.data],
          loading: false,
        }));
      } else {
        setState((prev) => ({
          ...prev,
          envios: [],
          error: 'No se encontró el envío',
          loading: false,
        }));
      }
    } catch (error) {
      console.error('Error en EnviosController (buscar por ID):', error);
      const message = error instanceof Error ? error.message : 'Error desconocido al buscar el envío';
      setState((prev) => ({
        ...prev,
        envios: [],
        error: message,
        loading: false,
      }));
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchId: e.target.value }));
  };

  const handleSearch = () => {
    const idEnvio = parseInt(state.searchId, 10);
    if (!isNaN(idEnvio)) {
      buscarEnvioPorId(idEnvio);
    } else {
      setState((prev) => ({ ...prev, error: 'Ingrese un ID válido' }));
    }
  };

  const resetSearch = () => {
    setState((prev) => ({ ...prev, searchId: '', error: '' }));
    fetchEnviosData();
  };

  return { state, fetchEnviosData, handleSearchChange, handleSearch, resetSearch };
};

// Controlador para crear envíos
interface CrearEnvioState {
  ciudades: Ciudad[];
  categorias: CategoriaEnvio[];
  formData: EnvioFormData;
  errors: Record<string, string>;
  loading: boolean;
  successMessage: string;
  errorMessage: string;
}

// Tipo para las claves de EnvioFormData que son objetos
type ObjectKeys<T> = {
  [K in keyof T]: T[K] extends object ? K : never;
}[keyof T];
type EnvioFormDataObjectKeys = ObjectKeys<EnvioFormData>; // "recogida" | "entrega"

export const useCrearEnvioController = () => {
  const [state, setState] = useState<CrearEnvioState>({
    ciudades: [],
    categorias: [],
    formData: {
      nombreRemitente: '',
      num_ContactoRemitente: '',
      nombreDestinatario: '',
      num_ContactoDestinatario: '',
      metodoPago: '',
      idCategoria: 0,
      recogida: {
        fechaRecogidaSeleccionada: '',
        direccionRecogida: '',
        idCiudad: 0,
      },
      entrega: {
        fechaEntregaSeleccionada: '',
        direccionEntrega: '',
        idCiudad: 0,
      },
    },
    errors: {},
    loading: false,
    successMessage: '',
    errorMessage: '',
  });

  const crearEnvioUseCase = new CrearEnvioUseCase();

  // Cargar ciudades y categorías al montar el componente
  useEffect(() => {
    const loadData = async () => {
      try {
        const [ciudadesResponse, categoriasResponse] = await Promise.all([
          fetchCiudades().catch((error) => {
            console.error('Error al cargar ciudades:', error);
            throw new Error('Error al cargar las ciudades');
          }),
          fetchCategoriasEnvio().catch((error) => {
            console.error('Error al cargar categorías:', error);
            throw new Error('Error al cargar las categorías');
          }),
        ]);
        setState((prev) => ({
          ...prev,
          ciudades: ciudadesResponse.data,
          categorias: categoriasResponse.data,
        }));
      } catch (error) {
        console.error('Error en loadData:', error);
        setState((prev) => ({
          ...prev,
          errorMessage: error instanceof Error ? error.message : 'Error al cargar ciudades o categorías',
        }));
      }
    };
    loadData();
  }, []);

  // Manejar cambios en los inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const [field, subField] = name.split('.');

    setState((prev) => {
      if (subField && (field === 'recogida' || field === 'entrega')) {
        // Actualizar campos anidados (recogida o entrega)
        return {
          ...prev,
          formData: {
            ...prev.formData,
            [field]: {
              ...prev.formData[field as EnvioFormDataObjectKeys],
              [subField]: subField.includes('id') ? Number(value) : value,
            },
          },
          errors: {
            ...prev.errors,
            [name]: '', // Limpiar error al cambiar
          },
        };
      }
      // Actualizar campos directos
      return {
        ...prev,
        formData: {
          ...prev.formData,
          [name]: name === 'idCategoria' ? Number(value) : value,
        },
        errors: {
          ...prev.errors,
          [name]: '', // Limpiar error al cambiar
        },
      };
    });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));

    const result = await crearEnvioUseCase.execute(state.formData);

    setState((prev) => ({
      ...prev,
      loading: false,
      successMessage: result.success ? result.message : '',
      errorMessage: !result.success ? result.message : '',
      errors: result.errors || {},
      formData: result.success
        ? {
            nombreRemitente: '',
            num_ContactoRemitente: '',
            nombreDestinatario: '',
            num_ContactoDestinatario: '',
            metodoPago: '',
            idCategoria: 0,
            recogida: {
              fechaRecogidaSeleccionada: '',
              direccionRecogida: '',
              idCiudad: 0,
            },
            entrega: {
              fechaEntregaSeleccionada: '',
              direccionEntrega: '',
              idCiudad: 0,
            },
          }
        : prev.formData,
    }));
  };

  return { state, handleInputChange, handleSubmit };
};