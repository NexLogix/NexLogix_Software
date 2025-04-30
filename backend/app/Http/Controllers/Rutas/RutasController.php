<?php

namespace App\Http\Controllers\Rutas;

use App\Http\Controllers\Controller;
use App\Models\Interfaces\Rutas\IRutasService;
use App\Models\Interfaces\Rutas\IRutasUseCase;
use Illuminate\Http\Request;

class RutasController extends Controller
{

    protected IRutasService $rutas_service;
    protected IRutasUseCase $rutas_use_case;

    public function __construct(IRutasService $rutas_service, IRutasUseCase $rutas_use_case)
    {
        $this->rutas_service  = $rutas_service;
        $this->rutas_use_case = $rutas_use_case;
    }

    public function getAllRutas()
    {
        $response = $this->rutas_service->getAllRutas();
        return response()->json($response, $response['status']);
    }
    public function getRutaByID(int $id)
    {
        $response = $this->rutas_service->getRutaByID($id);
        return response()->json($response, $response['status']);
    }
    public function createRuta(Request $request)
    {
        $response = $this->rutas_use_case->handleCreateRuta($request->all());
        return response()->json($response, $response['status']);
    }
 
    public function updateRuta(Request $request, int $id)
    {
        $response = $this->rutas_use_case->handleUpdateRuta( $request->all(), $id);
        return response()->json($response, $response['status']);
    }

    public function deleteRuta(int $id)
    {
        $response = $this->rutas_service->deleteRuta($id);
        return response()->json($response, $response['status']);
    }

}
