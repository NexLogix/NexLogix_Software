import { useState, useCallback } from 'react'; // Importa useState y useCallback desde React para manejar estado y memorizar funciones
import { fetchPuestos, fetchPuestoById, deletePuesto, fetchAreas } from '../../services/Puestos/PuestosService'; // Importa funciones del servicio para obtener, buscar, eliminar puestos y obtener áreas
import { PuestosUseCase } from '../../UseCases/Puestos/PuestosUseCase'; // Importa la clase PuestosUseCase para manejar la lógica de negocio
import { IPuesto, IArea } from '../../models/Interfaces/IPuestos'; // Importa interfaces IPuesto e IArea para definir tipos de datos

interface PuestosState { // Define una interfaz para el estado del controlador de listar/eliminar puestos
  puestos: IPuesto[]; // Arreglo de puestos de trabajo
  areas: IArea[]; // Arreglo de áreas
  error: string; // Mensaje de error para mostrar al usuario
  loading: boolean; // Indicador de carga para mostrar estado de procesamiento
  searchId: string; // ID de búsqueda ingresado por el usuario como cadena
}

interface CreatePuestoState { // Define una interfaz para el estado del controlador de crear/editar puestos
  formData: { nombrePuesto: string; descripcionPuesto: string; idArea: number }; // Datos del formulario para crear/editar un puesto
  errors: Record<string, string>; // Objeto que mapea nombres de campos a mensajes de error
  loading: boolean; // Indicador de carga para mostrar estado de procesamiento
  successMessage: string; // Mensaje de éxito tras una operación exitosa
  errorMessage: string; // Mensaje de error tras una operación fallida
}

// Controlador para listar y eliminar puestos
export const usePuestosController = () => { // Define un hook personalizado para manejar la lógica de listar y eliminar puestos
  const [state, setState] = useState<PuestosState>({ // Inicializa el estado con useState, usando la interfaz PuestosState
    puestos: [], // Inicializa el arreglo de puestos como vacío
    areas: [], // Inicializa el arreglo de áreas como vacío
    error: '', // Inicializa el mensaje de error como vacío
    loading: true, // Inicializa el estado de carga como verdadero
    searchId: '', // Inicializa el ID de búsqueda como vacío
  });

  const fetchPuestosData = useCallback(async () => { // Define una función memorizada para obtener todos los puestos
    try { // Inicia un bloque try para manejar errores
      console.log('usePuestosController: Ejecutando fetchPuestosData'); // Registra la ejecución para depuración
      const response = await fetchPuestos(); // Llama al servicio para obtener los puestos, esperando la respuesta
      setState((prev) => ({ // Actualiza el estado con la respuesta
        ...prev, // Mantiene las propiedades anteriores
        puestos: response.success ? response.data : [], // Asigna los puestos si la respuesta es exitosa, o un arreglo vacío
        error: response.success ? '' : 'No se pudo cargar la lista de puestos', // Limpia o asigna un mensaje de error
        loading: false, // Desactiva el estado de carga
      }));
      console.log('usePuestosController: Puestos cargados:', response.data); // Registra los datos obtenidos
    } catch (error) { // Captura cualquier error durante la ejecución
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar los puestos'; // Determina el mensaje de error
      console.error('usePuestosController: Error en fetchPuestosData:', message); // Registra el error
      setState((prev) => ({ // Actualiza el estado con el error
        ...prev, // Mantiene las propiedades anteriores
        puestos: [], // Limpia el arreglo de puestos
        error: message, // Asigna el mensaje de error
        loading: false, // Desactiva el estado de carga
      }));
      if (message.includes('Error 401')) { // Verifica si el error es de autenticación (401)
        window.location.href = '/login'; // Redirige a la página de inicio de sesión
      }
    }
  }, []); // Dependencias vacías para memorizar la función

  const fetchAreasData = useCallback(async () => { // Define una función memorizada para obtener todas las áreas
    try { // Inicia un bloque try para manejar errores
      console.log('usePuestosController: Ejecutando fetchAreasData'); // Registra la ejecución para depuración
      const response = await fetchAreas(); // Llama al servicio para obtener las áreas, esperando la respuesta
      setState((prev) => ({ // Actualiza el estado con la respuesta
        ...prev, // Mantiene las propiedades anteriores
        areas: response.success ? response.data : [], // Asigna las áreas si la respuesta es exitosa, o un arreglo vacío
        error: response.success ? prev.error : 'No se pudo cargar la lista de áreas', // Mantiene o asigna un mensaje de error
      }));
      console.log('usePuestosController: Áreas cargadas:', response.data); // Registra los datos obtenidos
    } catch (error) { // Captura cualquier error durante la ejecución
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar las áreas'; // Determina el mensaje de error
      console.error('usePuestosController: Error en fetchAreasData:', message); // Registra el error
      setState((prev) => ({ // Actualiza el estado con el error
        ...prev, // Mantiene las propiedades anteriores
        areas: [], // Limpia el arreglo de áreas
        error: message, // Asigna el mensaje de error
      }));
    }
  }, []); // Dependencias vacías para memorizar la función

  const searchPuestoById = useCallback(async (idPuestos: number) => { // Define una función memorizada para buscar un puesto por ID
    try { // Inicia un bloque try para manejar errores
      console.log('usePuestosController: Buscando puesto con ID:', idPuestos); // Registra el ID buscado
      setState((prev) => ({ ...prev, loading: true, error: '' })); // Activa el estado de carga y limpia el error
      const response = await fetchPuestoById(idPuestos); // Llama al servicio para buscar el puesto, esperando la respuesta
      if (response.success) { // Verifica si la respuesta es exitosa
        setState((prev) => ({ // Actualiza el estado con el puesto encontrado
          ...prev, // Mantiene las propiedades anteriores
          puestos: [response.data], // Asigna el puesto encontrado como un arreglo de un elemento
          loading: false, // Desactiva el estado de carga
        }));
        console.log('usePuestosController: Puesto encontrado:', response.data); // Registra el puesto encontrado
      } else { // Si la respuesta no es exitosa
        setState((prev) => ({ // Actualiza el estado con un error
          ...prev, // Mantiene las propiedades anteriores
          puestos: [], // Limpia el arreglo de puestos
          error: 'No se encontró el puesto', // Asigna un mensaje de error
          loading: false, // Desactiva el estado de carga
        }));
        console.log('usePuestosController: Puesto no encontrado para ID:', idPuestos); // Registra que no se encontró el puesto
      }
    } catch (error) { // Captura cualquier error durante la ejecución
      const message = error instanceof Error ? error.message : 'Error desconocido al buscar el puesto'; // Determina el mensaje de error
      console.error('usePuestosController: Error en searchPuestoById:', message); // Registra el error
      setState((prev) => ({ // Actualiza el estado con el error
        ...prev, // Mantiene las propiedades anteriores
        puestos: [], // Limpia el arreglo de puestos
        error: message, // Asigna el mensaje de error
        loading: false, // Desactiva el estado de carga
      }));
    }
  }, []); // Dependencias vacías para memorizar la función

  const deletePuestoById = useCallback(async (idPuestos: number) => { // Define una función memorizada para eliminar un puesto por ID
    try { // Inicia un bloque try para manejar errores
      console.log('usePuestosController: Eliminando puesto con ID:', idPuestos); // Registra el ID del puesto a eliminar
      setState((prev) => ({ ...prev, loading: true, error: '' })); // Activa el estado de carga y limpia el error
      const response = await deletePuesto(idPuestos); // Llama al servicio para eliminar el puesto, esperando la respuesta
      if (response.success) { // Verifica si la respuesta es exitosa
        setState((prev) => ({ // Actualiza el estado eliminando el puesto
          ...prev, // Mantiene las propiedades anteriores
          puestos: prev.puestos.filter((puesto) => puesto.idPuestos !== idPuestos), // Filtra el puesto eliminado
          loading: false, // Desactiva el estado de carga
          error: '', // Limpia el mensaje de error
        }));
        console.log('usePuestosController: Puesto eliminado con éxito, ID:', idPuestos); // Registra la eliminación exitosa
      } else { // Si la respuesta no es exitosa
        setState((prev) => ({ // Actualiza el estado con un error
          ...prev, // Mantiene las propiedades anteriores
          error: response.message, // Asigna el mensaje de error de la respuesta
          loading: false, // Desactiva el estado de carga
        }));
        console.log('usePuestosController: Error al eliminar puesto:', response.message); // Registra el error
      }
    } catch (error) { // Captura cualquier error durante la ejecución
      const message = error instanceof Error ? error.message : 'Error desconocido al eliminar el puesto'; // Determina el mensaje de error
      console.error('usePuestosController: Error en deletePuestoById:', message); // Registra el error
      setState((prev) => ({ // Actualiza el estado con el error
        ...prev, // Mantiene las propiedades anteriores
        error: message, // Asigna el mensaje de error
        loading: false, // Desactiva el estado de carga
      }));
    }
  }, []); // Dependencias vacías para memorizar la función

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => { // Define una función para manejar cambios en el campo de búsqueda
    setState((prev) => ({ ...prev, searchId: e.target.value })); // Actualiza el estado con el valor del campo de búsqueda
    console.log('usePuestosController: Search ID actualizado:', e.target.value); // Registra el nuevo valor
  };

  const handleSearch = () => { // Define una función para iniciar la búsqueda de un puesto
    const idPuestos = parseInt(state.searchId, 10); // Convierte el ID de búsqueda a número
    if (!isNaN(idPuestos)) { // Verifica si el ID es un número válido
      searchPuestoById(idPuestos); // Llama a la función de búsqueda con el ID
    } else { // Si el ID no es válido
      setState((prev) => ({ ...prev, error: 'Ingrese un ID válido' })); // Actualiza el estado con un error
      console.log('usePuestosController: Error - ID inválido:', state.searchId); // Registra el error
    }
  };

  const resetSearch = () => { // Define una función para restablecer la búsqueda
    setState((prev) => ({ ...prev, searchId: '', error: '' })); // Limpia el ID de búsqueda y el error
    fetchPuestosData(); // Vuelve a cargar todos los puestos
    console.log('usePuestosController: Búsqueda reseteada'); // Registra la acción
  };

  return { state, fetchPuestosData, fetchAreasData, handleSearchChange, handleSearch, resetSearch, deletePuestoById }; // Devuelve el estado y las funciones del controlador
};

// Controlador para crear y editar puestos
export const useCreatePuestoController = () => { // Define un hook personalizado para manejar la lógica de crear y editar puestos
  const [state, setState] = useState<CreatePuestoState>({ // Inicializa el estado con useState, usando la interfaz CreatePuestoState
    formData: { // Inicializa los datos del formulario
      nombrePuesto: '', // Nombre del puesto como cadena vacía
      descripcionPuesto: '', // Descripción del puesto como cadena vacía
      idArea: 0, // ID del área como 0
    },
    errors: {}, // Inicializa el objeto de errores como vacío
    loading: false, // Inicializa el estado de carga como falso
    successMessage: '', // Inicializa el mensaje de éxito como vacío
    errorMessage: '', // Inicializa el mensaje de error como vacío
  });

  const puestosUseCase = new PuestosUseCase(); // Crea una instancia de la clase PuestosUseCase para manejar la lógica de negocio

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => { // Define una función para manejar cambios en los campos del formulario
    const { name, value } = e.target; // Extrae el nombre y valor del campo
    setState((prev) => ({ // Actualiza el estado
      ...prev, // Mantiene las propiedades anteriores
      formData: { // Actualiza los datos del formulario
        ...prev.formData, // Mantiene los datos anteriores
        [name]: name === 'idArea' ? parseInt(value, 10) : value, // Convierte el valor a número para idArea, o usa la cadena
      },
      errors: { // Limpia los errores para el campo actualizado
        ...prev.errors, // Mantiene los errores anteriores
        [name]: '', // Limpia el error para el campo
      },
    }));
    console.log('useCreatePuestoController: Campo actualizado:', name, '=', value); // Registra la actualización
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => { // Define una función para manejar el envío del formulario de creación
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} })); // Activa la carga y limpia mensajes y errores
    console.log('useCreatePuestoController: Enviando formulario de creación:', state.formData); // Registra los datos del formulario

    try { // Inicia un bloque try para manejar errores
      const data = { // Prepara los datos para enviar al caso de uso
        nombrePuesto: state.formData.nombrePuesto, // Asigna el nombre del puesto
        descripcionPuesto: state.formData.descripcionPuesto || undefined, // Asigna la descripción o undefined si está vacía
        idArea: state.formData.idArea, // Asigna el ID del área
      };
      const response = await puestosUseCase.executeCreatePuesto(data); // Llama al caso de uso para crear el puesto
      if (response.success) { // Verifica si la respuesta es exitosa
        setState((prev) => ({ // Actualiza el estado con éxito
          ...prev, // Mantiene las propiedades anteriores
          loading: false, // Desactiva la carga
          successMessage: response.message, // Asigna el mensaje de éxito
          errorMessage: '', // Limpia el mensaje de error
          formData: { nombrePuesto: '', descripcionPuesto: '', idArea: 0 }, // Restablece el formulario
          errors: {}, // Limpia los errores
        }));
        console.log('useCreatePuestoController: Puesto creado con éxito:', response.data); // Registra la creación exitosa
      } else { // Si la respuesta no es exitosa
        setState((prev) => ({ // Actualiza el estado con error
          ...prev, // Mantiene las propiedades anteriores
          loading: false, // Desactiva la carga
          successMessage: '', // Limpia el mensaje de éxito
          errorMessage: response.message, // Asigna el mensaje de error
          errors: response.errors || {}, // Asigna los errores específicos
        }));
        console.log('useCreatePuestoController: Error al crear puesto:', response.message, response.errors); // Registra el error
      }
    } catch (error) { // Captura cualquier error durante la ejecución
      const message = error instanceof Error ? error.message : 'Error desconocido al crear el puesto'; // Determina el mensaje de error
      setState((prev) => ({ // Actualiza el estado con el error
        ...prev, // Mantiene las propiedades anteriores
        loading: false, // Desactiva la carga
        successMessage: '', // Limpia el mensaje de éxito
        errorMessage: message, // Asigna el mensaje de error
        errors: {}, // Limpia los errores específicos
      }));
      console.error('useCreatePuestoController: Error en handleCreateSubmit:', message); // Registra el error
    }
  };

  const handleUpdateSubmit = async (id: number, isPartial: boolean = false) => { // Define una función para manejar el envío del formulario de edición
    setState((prev) => ({ ...prev, loading: true, errorMessage: '', successMessage: '', errors: {} })); // Activa la carga y limpia mensajes y errores
    console.log('useCreatePuestoController: Enviando formulario de edición:', state.formData, 'ID:', id, 'Parcial:', isPartial); // Registra los datos y parámetros

    try { // Inicia un bloque try para manejar errores
      const data = { // Prepara los datos para enviar al caso de uso
        nombrePuesto: state.formData.nombrePuesto, // Asigna el nombre del puesto
        descripcionPuesto: state.formData.descripcionPuesto || undefined, // Asigna la descripción o undefined si está vacía
        idArea: state.formData.idArea, // Asigna el ID del área
      };
      const response = isPartial // Determina si es una actualización parcial o completa
        ? await puestosUseCase.executeUpdatePartialPuesto(id, data) // Llama al caso de uso para actualización parcial
        : await puestosUseCase.executeUpdatePuesto(id, data); // Llama al caso de uso para actualización completa
      if (response.success) { // Verifica si la respuesta es exitosa
        setState((prev) => ({ // Actualiza el estado con éxito
          ...prev, // Mantiene las propiedades anteriores
          loading: false, // Desactiva la carga
          successMessage: response.message, // Asigna el mensaje de éxito
          errorMessage: '', // Limpia el mensaje de error
          errors: {}, // Limpia los errores
        }));
        console.log('useCreatePuestoController: Puesto actualizado con éxito:', response.data); // Registra la actualización exitosa
      } else { // Si la respuesta no es exitosa
        setState((prev) => ({ // Actualiza el estado con error
          ...prev, // Mantiene las propiedades anteriores
          loading: false, // Desactiva la carga
          successMessage: '', // Limpia el mensaje de éxito
          errorMessage: response.message, // Asigna el mensaje de error
          errors: response.errors || {}, // Asigna los errores específicos
        }));
        console.log('useCreatePuestoController: Error al actualizar puesto:', response.message, response.errors); // Registra el error
      }
    } catch (error) { // Captura cualquier error durante la ejecución
      const message = error instanceof Error ? error.message : 'Error desconocido al actualizar el puesto'; // Determina el mensaje de error
      setState((prev) => ({ // Actualiza el estado con el error
        ...prev, // Mantiene las propiedades anteriores
        loading: false, // Desactiva la carga
        successMessage: '', // Limpia el mensaje de éxito
        errorMessage: message, // Asigna el mensaje de error
        errors: {}, // Limpia los errores específicos
      }));
      console.error('useCreatePuestoController: Error en handleUpdateSubmit:', message); // Registra el error
    }
  };

  return { state, handleInputChange, handleCreateSubmit, handleUpdateSubmit }; // Devuelve el estado y las funciones del controlador
};