<?php

namespace App\Http\Controllers\Permisos\PermisosGenerales;

use App\Http\Controllers\Controller;
use App\Services\Permisos\PermisosGeneralesService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PostPGController extends Controller
{
    private PermisosGeneralesService $PGService;

    public function __construct(PermisosGeneralesService $PGService)
    {
        $this->PGService = $PGService;
    }

    public function createPG(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nombrePermisoGeneral' => 'required|string|max:100|unique:permisosgenerales,nombrePermisoGeneral',
            'fechaAsignacionPermisoGeneral' => 'required|date_format:Y-m-d H:i:s',
            'descripcionPermisoGeneral' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
                'status' => 422,
            ], 422);
        }

        $data = $validator->validated();

        $response = $this->PGService->createPG($data);

        return response()->json($response, $response['status']);
    }
}
