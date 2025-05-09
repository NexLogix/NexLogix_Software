<?php

namespace App\Http\Controllers\Reportes;

use App\Http\Controllers\Controller;
use App\Services\Reportes\ReportesService;

class GetByIDReportesController extends Controller
{
    protected $reportesService;
    // se llama al service ReportesService
    public function __construct(ReportesService $reportes_service)
    {
        $this->reportesService = $reportes_service;
    }
    // metodo que se importa para Router en api.php
    public function showReporte($id)
    {
        return $this->reportesService->getReporteByID($id);
    }
}
