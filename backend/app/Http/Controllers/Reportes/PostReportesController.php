<?php
namespace App\Http\Controllers\Reportes;

use App\Http\Controllers\Controller;
use App\Services\Reportes\ReportesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostReportesController extends Controller
{
    private ReportesService $reportes_service;

    public function __construct(ReportesService $reportes_service)
    {
        $this->reportes_service = $reportes_service;
    }

    public function handle(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'tipoReporte'   => 'required|string|max:150',
            'descripcion'   => 'required|string|max:1000',
            'fechaCreacion' => 'nullable|date',
            'idusuarios'    => 'required|numeric'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Datos inválidos',
                'errors' => $validator->errors(),
                'status' => 422
            ], 422);
        }

        $data = $validator->validated();
        $response = $this->reportes_service->createReporte($data);

        return response()->json($response, $response['status']);
    }
}

