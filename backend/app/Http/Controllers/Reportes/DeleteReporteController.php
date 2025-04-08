<?php

namespace App\Http\Controllers\Reportes;

use App\Http\Controllers\Controller;
use App\Services\Reportes\ReportesService;
use Illuminate\Http\JsonResponse;

class DeleteReporteController extends Controller
{
    protected $reportesService;

    public function __construct(ReportesService $reportesService)
    {
        $this->reportesService = $reportesService;
    }

    public function deleteReporte($id): JsonResponse
    {
        $response = $this->reportesService->deleteReporte($id);
        return response()->json($response, $response['status']);
    }
}
