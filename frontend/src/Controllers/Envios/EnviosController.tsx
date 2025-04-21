import { useState, useCallback } from 'react';
import { fetchEnvios } from '../../services/Envios/EnvioService';
import { Envio } from '../../models/Interfaces/IEnvios';

interface EnviosState {
  envios: Envio[];
  error: string;
  loading: boolean;
}

// METODO GET CONTROLLER
export const useEnviosController = () => {
  const [state, setState] = useState<EnviosState>({
    envios: [],
    error: '',
    loading: true,
  });

  const fetchEnviosData = useCallback(async () => {
    try {
      console.log('Fetching envíos en EnviosController...');
      const response = await fetchEnvios();
      console.log('Response:', response);
      setState({
        envios: response.success ? response.data : [],
        error: response.success ? '' : 'No se pudo cargar la lista de envíos',
        loading: false,
      });
    } catch (error) {
      console.error('Error en EnviosController:', error);
      const message = error instanceof Error ? error.message : 'Error desconocido al cargar los envíos';
      setState({
        envios: [],
        error: message,
        loading: false,
      });
      if (message.includes('Error 401')) {
        window.location.href = '/login';
      }
    }
  }, []);

  return { state, fetchEnviosData };
};