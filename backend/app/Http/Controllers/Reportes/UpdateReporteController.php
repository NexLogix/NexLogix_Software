<?php

namespace App\Http\Controllers\Reportes;

use App\Http\Controllers\Controller;
use App\Services\Reportes\ReportesService;
use Illuminate\Http\Request;

class UpdateReporteController extends Controller
{
    protected $reportesService;

    public function __construct(ReportesService $reportesService)
    {
        $this->reportesService = $reportesService;
    }

    public function updateReporte(Request $request, $id)
    {
        // Validamos que los campos necesarios estén presentes y no vacíos
        $validated = $request->validate([
            'tipoReporte'   => 'required|string',
            'descripcion'   => 'required|string',
            'fechaCreacion' => 'nullable|date_format:Y-m-d H:i:s',
            'idusuarios'    => 'required|integer|exists:usuarios,idusuarios'
        ]);

        return $this->reportesService->udpateReporte($id, $validated);
    }
}
