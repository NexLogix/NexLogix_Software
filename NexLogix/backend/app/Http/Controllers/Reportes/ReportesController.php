<?php

namespace App\Http\Controllers\Reportes;

use App\Http\Controllers\Controller;
use App\Models\Interfaces\Reportes\IReportes_UseCases;
use App\Models\Interfaces\Reportes\IReportesService;
use Illuminate\Http\Request;

class ReportesController extends Controller
{
    protected IReportesService $reportes_service;
    protected IReportes_UseCases $reportes_UseCases;

    public function __construct(IReportesService $reportes_service, IReportes_UseCases $reportes_UseCases)
    {
        $this->reportes_service = $reportes_service;
        $this->reportes_UseCases = $reportes_UseCases;
    }

    // GET ALL CONTROLLER
    public function getAllReportes()
    {
        $response = $this->reportes_service->getAllReportes();
        return response()->json($response, $response['status']);
    }

    // GET BY ID
    public function getAllReportes_ById($id)
    {
        $response = $this->reportes_service->getAllReportes_ById($id);
        return response()->json($response, $response['status']);
    }

    // POST CONTROLLER
    public function create_Reportes(Request $request)
    {
        $response = $this->reportes_UseCases->handleCreateReporte($request->all());
        return response()->json($response, $response['status']);
    }

    // PATCH CONTROLLER | EDIT or UPDATE
    public function update_Reportes(Request $request , $id)
    {
        $response = $this->reportes_UseCases->handleUpdateReporte($id, $request->all());
        return response()->json($response, $response['status']);
    }

    // DELETE CONTROLLER
    public function  delete_Reportes($id)
    {
        $response = $this->reportes_service->delete_Reportes($id);
        return response()->json($response, $response['status']);
    }
}
