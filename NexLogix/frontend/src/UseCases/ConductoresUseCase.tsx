import { useState, useEffect, useCallback } from "react";
import {
  getConductores,
  createConductor,
  updateConductor,
  deleteConductor,
  getUsuarios,
  createUsuario,
  getRoles,
  getEstados,
  getPuestos
} from "../services/ConductoresService";
import { IConductor } from "../models/Interfaces/IConductor";
import { IUsuario, IRol, IEstado, IPuesto } from "../models/Interfaces/IGestionUsuarios";

export function useConductores() {
  const [conductores, setConductores] = useState<IConductor[]>([]);
  const [usuarios, setUsuarios] = useState<IUsuario[]>([]);
  const [roles, setRoles] = useState<IRol[]>([]);
  const [estados, setEstados] = useState<IEstado[]>([]);
  const [puestos, setPuestos] = useState<IPuesto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [conductoresData, usuariosData, rolesData, estadosData, puestosData] = await Promise.all([
        getConductores(),
        getUsuarios(),
        getRoles(),
        getEstados(),
        getPuestos()
      ]);
      setConductores(conductoresData);
      setUsuarios(usuariosData);
      setRoles(rolesData);
      setEstados(estadosData);
      setPuestos(puestosData);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Error al cargar datos");
      } else {
        setError("Error al cargar datos");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const crearConductor = async (data: Partial<IConductor>) => {
    setLoading(true);
    setError(null);
    try {
      await createConductor(data);
      await fetchAll();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Error al crear conductor");
      } else {
        setError("Error al crear conductor");
      }
    } finally {
      setLoading(false);
    }
  };

  const actualizarConductor = async (id: number, data: Partial<IConductor>) => {
    setLoading(true);
    setError(null);
    try {
      await updateConductor(id, data);
      await fetchAll();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Error al actualizar conductor");
      } else {
        setError("Error al actualizar conductor");
      }
    } finally {
      setLoading(false);
    }
  };

  const eliminarConductor = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteConductor(id);
      await fetchAll();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Error al eliminar conductor");
      } else {
        setError("Error al eliminar conductor");
      }
    } finally {
      setLoading(false);
    }
  };

  const crearUsuario = async (data: Partial<IUsuario>) => {
    setLoading(true);
    setError(null);
    try {
      await createUsuario(data);
      await fetchAll();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "Error al crear usuario");
      } else {
        setError("Error al crear usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    conductores,
    usuarios,
    roles,
    estados,
    puestos,
    loading,
    error,
    fetchAll,
    crearConductor,
    actualizarConductor,
    eliminarConductor,
    crearUsuario
  };
}
