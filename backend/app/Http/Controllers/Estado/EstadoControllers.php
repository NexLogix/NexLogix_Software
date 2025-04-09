<?php

namespace App\Http\Controllers\Estado;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Estado\EstadoService;
use App\UseCases\Estado\EstadoUseCase;

class EstadoControllers extends Controller
{
    protected EstadoService $estadoService;
    protected EstadoUseCase $estadoUseCase;

    public function __construct(EstadoService $estadoService, EstadoUseCase $estadoUseCase)
    {
        $this->estadoService = $estadoService;
        $this->estadoUseCase = $estadoUseCase;
    }

    public function showAll()
    {
        return response()->json($this->estadoService->getAll(), 200);
    }

    public function showOne($id)
    {
        $response = $this->estadoService->getEstadoById($id);
        return response()->json($response, $response['status']);
    }

    public function createEstado(Request $request)
    {
        $response = $this->estadoUseCase->handleCreateEstado($request->all());
        return response()->json($response, $response['status']);
    }

    public function deleteEstado($id)
    {
        $response = $this->estadoService->deleteEstado($id);
        return response()->json($response, $response['status']);
    }
}
