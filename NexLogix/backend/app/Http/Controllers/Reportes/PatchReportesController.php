<?php

namespace App\Http\Controllers\Reportes;

use App\Http\Controllers\Controller;
use App\Services\Reportes\ReportesService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PatchReportesController extends Controller
{
    protected $reportesService;

    public function __construct(ReportesService $reportesService)
    {
        $this->reportesService = $reportesService;
    }

    public function updateReporte(Request $request, $id): JsonResponse
    {
        $response = $this->reportesService->udpateSpecificPlace($request, $id);
        return response()->json($response, $response['status']);
    }
}
