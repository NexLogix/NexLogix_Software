<?php

namespace App\Http\Controllers\Permisos\PermisosGenerales;

use App\Http\Controllers\Controller;
use App\Services\Permisos\PermisosGeneralesService;

class DeletePGController extends Controller
{
    protected $pg_service;

    public function __construct(PermisosGeneralesService $pg_service)
    {
        $this->pg_service = $pg_service;
    }

    public function deletePG($id)
    {
        $result = $this->pg_service->deletePG($id);

        return response()->json([
            'message' => $result['message'],
            'status' => $result['status']
        ], $result['status']);
    }
}
