// Importa hooks de React para manejar estado, efectos secundarios y funciones memorizadas
import { useState, useCallback } from 'react';
// Importa funciones del servicio para interactuar con la API de puestos y áreas
import { fetchPuestos, fetchPuestoById, deletePuesto, fetchAreas } from '../../services/Puestos/PuestosService';
// Importa la clase PuestosUseCase para manejar la lógica de negocio
import { PuestosUseCase } from '../../UseCases/Puestos/PuestosUseCase'; 
// Importa las interfaces necesarias para tipar los datos de puestos y áreas
import { IPuesto, IArea } from '../../models/Interfaces/IPuestos';

// Define la interfaz PuestosState para tipar el estado del controlador de puestos
interface PuestosState {
  puestos: IPuesto[]; // Lista de puestos
  areas: IArea[]; // Lista de áreas (para el select)
  error: string; // Mensaje de error
  loading: boolean; // Indicador de carga
  searchId: string; // ID de búsqueda ingresado por el usuario
}

// Define la interfaz CreatePuestoState para tipar el estado del controlador de creación/edición
interface CreatePuestoState {
  formData: { nombrePuesto: string; descripcionPuesto: string; idArea: number }; // Datos del formulario
  errors: Record<string, string>; // Errores de validación
  loading: boolean; // Indicador de carga
  successMessage: string; // Mensaje de éxito
  errorMessage: string; // Mensaje de error
}

// Define el hook personalizado usePuestosController para manejar la lógica de listar y eliminar puestos
export const usePuestosController = () => {
  // Inicializa el estado con useState usando la interfaz PuestosState
  const [state, setState] = useState<PuestosState>({
    puestos: [], // Inicializa la lista de puestos como vacía
    areas: [], // Inicializa la lista de áreas como vacía
    error: '', // Inicializa el mensaje de error como vacío
    loading: true, // Indica que está cargando inicialmente
    searchId: '', // Inicializa el ID de búsqueda como vacío
  });

  // Define la función fetchPuestosData para cargar todos los puestos desde la API
  const fetchPuestosData = useCallback(async () => {
    try {
      // Log para depuración: indica que se está ejecutando la función
      console.log('usePuestosController: Ejecutando fetchPuestosData');
      // Llama al servicio para obtener los puestos
      const response = await fetchPuestos();
      // Actualiza el estado con los datos recibidos
      setState((prev) => ({
        ...prev,
        puestos: response.success ? response.data : [], // Si la solicitud es exitosa, asigna los puestos
        error: response.success ? '' : 'No se pudo cargar la lista de puestos', // Muestra un error si falla
        loading: false, // Indica que la carga ha finalizado
      }));
      // Log para depuración: muestra los puestos cargados
      console.log('usePuestosController: Puestos cargados:', response.data);
    } catch (error) {
      // Maneja errores al cargar los puestos
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar los puestos';
      console.error('usePuestosController: Error en fetchPuestosData:', message);
      // Actualiza el estado con el error
      setState((prev) => ({
        ...prev,
        puestos: [], // Limpia la lista de puestos
        error: message, // Asigna el mensaje de error
        loading: false, // Indica que la carga ha finalizado
      }));
      // Redirige al login si el error es 401 (no autorizado)
      if (message.includes('Error 401')) {
        window.location.href = '/login';
      }
    }
  }, []);

  // Define la función fetchAreasData para cargar todas las áreas desde la API
  const fetchAreasData = useCallback(async () => {
    try {
      // Log para depuración: indica que se está ejecutando la función
      console.log('usePuestosController: Ejecutando fetchAreasData');
      // Llama al servicio para obtener las áreas
      const response = await fetchAreas();
      // Actualiza el estado con los datos recibidos
      setState((prev) => ({
        ...prev,
        areas: response.success ? response.data : [], // Si la solicitud es exitosa, asigna las áreas
        error: response.success ? prev.error : 'No se pudo cargar la lista de áreas', // Muestra un error si falla
      }));
      // Log para depuración: muestra las áreas cargadas
      console.log('usePuestosController: Áreas cargadas:', response.data);
    } catch (error) {
      // Maneja errores al cargar las áreas
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar las áreas';
      console.error('usePuestosController: Error en fetchAreasData:', message);
      // Actualiza el estado con el error
      setState((prev) => ({
        ...prev,
        areas: [], // Limpia la lista de áreas
        error: message, // Asigna el mensaje de error
      }));
    }
  }, []);

  // Define la función searchPuestoById para buscar un puesto por ID
  const searchPuestoById = useCallback(async (idPuestos: number) => {
    try {
      // Log para depuración: indica que se está buscando un puesto
      console.log('usePuestosController: Buscando puesto con ID:', idPuestos);
      // Actualiza el estado para indicar que está cargando
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      // Llama al servicio para obtener el puesto por ID
      const response = await fetchPuestoById(idPuestos);
      if (response.success) {
        // Si la solicitud es exitosa, actualiza la lista de puestos con el puesto encontrado
        setState((prev) => ({
          ...prev,
          puestos: [response.data],
          loading: false,
        }));
        // Log para depuración: muestra el puesto encontrado
        console.log('usePuestosController: Puesto encontrado:', response.data);
      } else {
        // Si no se encuentra el puesto, actualiza el estado con un error
        setState((prev) => ({
          ...prev,
          puestos: [],
          error: 'No se encontró el puesto',
          loading: false,
        }));
        // Log para depuración: indica que no se encontró el puesto
        console.log('usePuestosController: Puesto no encontrado para ID:', idPuestos);
      }
    } catch (error) {
      // Maneja errores al buscar el puesto
      const message = error instanceof Error ? error.message : 'Error desconocido al buscar el puesto';
      console.error('usePuestosController: Error en searchPuestoById:', message);
      // Actualiza el estado con el error
      setState((prev) => ({
        ...prev,
        puestos: [],
        error: message,
        loading: false,
      }));
    }
  }, []);

  // Define la función deletePuestoById para eliminar un puesto por ID
  const deletePuestoById = useCallback(async (idPuestos: number) => {
    try {
      // Log para depuración: indica que se está eliminando un puesto
      console.log('usePuestosController: Eliminando puesto con ID:', idPuestos);
      // Actualiza el estado para indicar que está cargando
      setState((prev) => ({ ...prev, loading: true, error: '' }));
      // Llama al servicio para eliminar el puesto
      const response = await deletePuesto(idPuestos);
      if (response.success) {
        // Si la solicitud es exitosa, filtra el puesto eliminado de la lista
        setState((prev) => ({
          ...prev,
          puestos: prev.puestos.filter((puesto) => puesto.idPuestos !== idPuestos),
          loading: false,
          error: '',
        }));
        // Log para depuración: indica que el puesto fue eliminado
        console.log('usePuestosController: Puesto eliminado con éxito, ID:', idPuestos);
      } else {
        // Si falla la eliminación, actualiza el estado con un error
        setState((prev) => ({
          ...prev,
          error: response.message,
          loading: false,
        }));
        // Log para depuración: muestra el error
        console.log('usePuestosController: Error al eliminar puesto:', response.message);
      }
    } catch (error) {
      // Maneja errores al eliminar el puesto
      const message = error instanceof Error ? error.message : 'Error desconocido al eliminar el puesto';
      console.error('usePuestosController: Error en deletePuestoById:', message);
      // Actualiza el estado con el error
      setState((prev) => ({
        ...prev,
        error: message,
        loading: false,
      }));
    }
  }, []);

  // Define la función handleSearchChange para manejar cambios en el input de búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, searchId: e.target.value }));
    // Log para depuración: muestra el valor del input de búsqueda
    console.log('usePuestosController: Search ID actualizado:', e.target.value);
  };

  // Define la función handleSearch para manejar la búsqueda de un puesto por ID
  const handleSearch = () => {
    const idPuestos = parseInt(state.searchId, 10); // Convierte el ID de búsqueda a número
    if (!isNaN(idPuestos)) { // Verifica que el ID sea un número válido
      searchPuestoById(idPuestos); // Busca el puesto por ID
    } else {
      // Si el ID no es válido, muestra un error
      setState((prev) => ({ ...prev, error: 'Ingrese un ID válido' }));
      // Log para depuración: indica que el ID no es válido
      console.log('usePuestosController: Error - ID inválido:', state.searchId);
    }
  };

  // Define la función resetSearch para restablecer la búsqueda y mostrar todos los puestos
  const resetSearch = () => {
    setState((prev) => ({ ...prev, searchId: '', error: '' }));
    fetchPuestosData(); // Recarga todos los puestos
    // Log para depuración: indica que se restableció la búsqueda
    console.log('usePuestosController: Búsqueda reseteada');
  };

  // Devuelve el estado y las funciones para ser usadas por los componentes
  return { state, fetchPuestosData, fetchAreasData, handleSearchChange, handleSearch, resetSearch, deletePuestoById };
};

// Define el hook personalizado useCreatePuestoController para manejar la lógica de creación y edición de puestos
export const useCreatePuestoController = () => {
  // Inicializa el estado con useState usando la interfaz CreatePuestoState
  const [state, setState] = useState<CreatePuestoState>({
    formData: {
      nombrePuesto: '', // Inicializa el nombre del puesto como vacío
      descripcionPuesto: '', // Inicializa la descripción como vacía
      idArea: 0, // Inicializa el ID del área como 0
    },
    errors: {}, // Inicializa los errores como vacíos
    loading: false, // Indica que no está cargando inicialmente
    successMessage: '', // Inicializa el mensaje de éxito como vacío
    errorMessage: '', // Inicializa el mensaje de error como vacío
  });

  // Instancia la clase PuestosUseCase para manejar la lógica de negocio
  const puestosUseCase = new PuestosUseCase();

  // Define la función handleInputChange para manejar cambios en los inputs del formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target; // Obtiene el nombre y valor del input
    setState((prev) => ({
      ...prev,
      formData: {
        ...prev.formData,
        [name]: name === 'idArea' ? parseInt(value, 10) : value, // Convierte idArea a número si es necesario
      },
      errors: {
        ...prev.errors,
        [name]: '', // Limpia el error del campo actual
      },
    }));
    // Log para depuración: muestra el campo actualizado
    console.log('useCreatePuestoController: Campo actualizado:', name, '=', value);
  };

  // Define la función handleCreateSubmit para manejar la creación de un puesto
  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    // Actualiza el estado para indicar que está cargando
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));
    // Log para depuración: muestra los datos del formulario
    console.log('useCreatePuestoController: Enviando formulario de creación:', state.formData);

    try {
      // Prepara los datos para enviar al servicio
      const data = {
        nombrePuesto: state.formData.nombrePuesto,
        descripcionPuesto: state.formData.descripcionPuesto || undefined, // Convierte descripción vacía a undefined
        idArea: state.formData.idArea,
      };
      // Llama al UseCase para crear el puesto
      const response = await puestosUseCase.executeCreatePuesto(data);
      if (response.success) {
        // Si la creación es exitosa, actualiza el estado
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: response.message,
          errorMessage: '',
          formData: { nombrePuesto: '', descripcionPuesto: '', idArea: 0 }, // Resetea el formulario
          errors: {},
        }));
        // Log para depuración: indica que el puesto fue creado
        console.log('useCreatePuestoController: Puesto creado con éxito:', response.data);
      } else {
        // Si falla la creación, actualiza el estado con el error
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: '',
          errorMessage: response.message,
          errors: response.errors || {},
        }));
        // Log para depuración: muestra el error
        console.log('useCreatePuestoController: Error al crear puesto:', response.message, response.errors);
      }
    } catch (error) {
      // Maneja errores al crear el puesto
      const message = error instanceof Error ? error.message : 'Error desconocido al crear el puesto';
      setState((prev) => ({
        ...prev,
        loading: false,
        successMessage: '',
        errorMessage: message,
        errors: {},
      }));
      // Log para depuración: muestra el error
      console.error('useCreatePuestoController: Error en handleCreateSubmit:', message);
    }
  };

  // Define la función handleUpdateSubmit para manejar la edición de un puesto
  const handleUpdateSubmit = async (id: number, isPartial: boolean = false) => {
    // Actualiza el estado para indicar que está cargando
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} }));
    // Log para depuración: muestra los datos del formulario y si es una edición parcial
    console.log('useCreatePuestoController: Enviando formulario de edición:', state.formData, 'ID:', id, 'Parcial:', isPartial);

    try {
      // Prepara los datos para enviar al servicio
      const data = {
        nombrePuesto: state.formData.nombrePuesto,
        descripcionPuesto: state.formData.descripcionPuesto || undefined, // Convierte descripción vacía a undefined
        idArea: state.formData.idArea,
      };
      // Llama al UseCase para editar el puesto (PUT o PATCH según isPartial)
      const response = isPartial
        ? await puestosUseCase.executeUpdatePartialPuesto(id, data)
        : await puestosUseCase.executeUpdatePuesto(id, data);
      if (response.success) {
        // Si la edición es exitosa, actualiza el estado
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: response.message,
          errorMessage: '',
          errors: {},
        }));
        // Log para depuración: indica que el puesto fue actualizado
        console.log('useCreatePuestoController: Puesto actualizado con éxito:', response.data);
      } else {
        // Si falla la edición, actualiza el estado con el error
        setState((prev) => ({
          ...prev,
          loading: false,
          successMessage: '',
          errorMessage: response.message,
          errors: response.errors || {},
        }));
        // Log para depuración: muestra el error
        console.log('useCreatePuestoController: Error al actualizar puesto:', response.message, response.errors);
      }
    } catch (error) {
      // Maneja errores al editar el puesto
      const message = error instanceof Error ? error.message : 'Error desconocido al actualizar el puesto';
      setState((prev) => ({
        ...prev,
        loading: false,
        successMessage: '',
        errorMessage: message,
        errors: {},
      }));
      // Log para depuración: muestra el error
      console.error('useCreatePuestoController: Error en handleUpdateSubmit:', message);
    }
  };

  // Devuelve el estado y las funciones para ser usadas por los componentes
  return { state, handleInputChange, handleCreateSubmit, handleUpdateSubmit };
};