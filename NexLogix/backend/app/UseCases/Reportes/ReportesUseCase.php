<?php
namespace App\UseCases\Reportes;

use App\Models\Interfaces\Reportes\IReportes_UseCases;
use App\Models\Interfaces\Reportes\IReportesService;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;


class ReportesUseCase implements IReportes_UseCases
{
    protected IReportesService $reportes_service;

    public function __construct(IReportesService $reportes_service)
    {
        $this->reportes_service = $reportes_service;
    }

    // POST USE CASE
    public function handleCreateReporte(array $data): array
    {
        $data['idusuarios'] = Auth::id();

        $validator = Validator::make($data, [
            "tipoReporte" => "required|string|max:150",
            "descripcion" => "nullable|string|max:1000",
            "idusuarios" =>  "required|integer|exists:usuarios,idusuarios",
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        return $this->reportes_service->create_Reportes($data);
    }

    // PATCH USE CASE
    public function handleUpdateReporte(int $id, array $data)
    {
        $validator = Validator::make($data, [
            "tipoReporte" => "sometimes|string|max:150",
            "descripcion" => "sometimes|string|max:1000",
            "idusuarios" =>  "sometimes|integer|exists:usuarios,idusuarios",
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        return $this->reportes_service->update_Reportes($id, $data);

    }
}
