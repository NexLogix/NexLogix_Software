import { useEffect, useState } from "react";
import { ReportesUseCase } from "../../UseCases/Reportes/ReportesUseCase";
import { IReporte } from "../../models/Interfaces/IReportes";

export const useReportesController = () => {
  const [reportes, setReportes] = useState<IReporte[]>([]);
  const [loading, setLoading] = useState(false);
  const useCase = new ReportesUseCase();

  const cargarReportes = async () => {
    setLoading(true);
    const res = await useCase.getAllReportes();
    if (res.success) setReportes(res.data);
    setLoading(false);
  };

  useEffect(() => {
    cargarReportes();
  }, []);

  return { reportes, setReportes, loading, cargarReportes, useCase };
};