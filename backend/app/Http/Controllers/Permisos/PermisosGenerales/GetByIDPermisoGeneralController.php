<?php

namespace App\Http\Controllers\Permisos\PermisosGenerales;

use App\Http\Controllers\Controller;
use App\Services\Permisos\PermisosGeneralesService;
use Illuminate\Http\Request;

class GetByIDPermisoGeneralController extends Controller
{
    protected $permisosGeneralesService;

    public function __construct(PermisosGeneralesService $permisos_generales_service)
    {
        $this->permisosGeneralesService = $permisos_generales_service;
    }

    public function show_PG_ByID($id)
    {
        return $this->permisosGeneralesService->get_PG_ByID($id);
    }
}
