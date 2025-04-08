<?php

namespace App\Http\Controllers\Permisos\PermisosGenerales;

use App\Http\Controllers\Controller;
use App\Services\Permisos\PermisosGeneralesService;
use Illuminate\Http\JsonResponse;


class GetPermisoGeneralController extends Controller
{
    private PermisosGeneralesService $permisos_generales_service;

    public function __construct(PermisosGeneralesService $permisos_generales_service)
    {
        $this->permisos_generales_service = $permisos_generales_service;
    }

    public function showPermisosGenerales(): JsonResponse
    {
        return $this->permisos_generales_service->getAll();
    }
}
