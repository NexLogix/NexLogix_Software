<?php

namespace App\Http\Controllers\Permisos\PermisosGenerales;

use App\Http\Controllers\Controller;
use App\Services\Permisos\PermisosGeneralesService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PutPGController extends Controller
{
    protected $pg_service;

    public function __construct(PermisosGeneralesService $pg_service)
    {
        $this->pg_service = $pg_service;
    }

    public function updatePG(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'nombrePermisoGeneral' => 'required|string|max:100|unique:permisosgenerales,nombrePermisoGeneral,' . $id . ',idPermisosGenerales',
            'fechaAsignacionPermisoGeneral' => 'required|date_format:Y-m-d H:i:s',
            'descripcionPermisoGeneral' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ], 422);
        }

        $result = $this->pg_service->updatePG($id, $validator->validated());

        if (!$result['success']) {
            return response()->json([
                'message' => $result['message'],
                'details' => $result['details'] ?? null,
                'status' => $result['code']
            ], $result['code']);
        }

        return response()->json([
            'message' => 'Permiso General actualizado correctamente!',
            'data' => $result['data'],
            'status' => 200
        ], 200);
    }
}
