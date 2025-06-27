import { useEffect, useState } from "react";
import { RolesUseCase } from "../../UseCases/Roles/RolesUseCase";
import { IRol } from "../../models/Interfaces/IRoles";

export const useRolesController = () => {
  const [roles, setRoles] = useState<IRol[]>([]);
  const [loading, setLoading] = useState(false);
  const useCase = new RolesUseCase();

  const cargarRoles = async () => {
    setLoading(true);
    const res = await useCase.getAllRoles();
    if (res.success) setRoles(res.data);
    setLoading(false);
  };

  useEffect(() => {
    cargarRoles();
  }, []);

  return { roles, setRoles, loading, cargarRoles, useCase };
};