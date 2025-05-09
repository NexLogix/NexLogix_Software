<?php

namespace App\Http\Controllers\Puestos;

use App\Events\ResourceAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Puestos\PuestosService;
use App\UseCases\Puestos\PuestosUseCase;
use Illuminate\Support\Facades\Auth;

class PuestosController extends Controller
{
    protected PuestosService $puestosService;
    protected PuestosUseCase $puestosUseCase;

    public function __construct(PuestosService $puestosService, PuestosUseCase $puestosUseCase)
    {
        $this->puestosService = $puestosService;
        $this->puestosUseCase = $puestosUseCase;
    }

    public function showAll()
    {
        return response()->json($this->puestosService->getAllPuestos());
    }

    public function showByID($id)
    {
        return response()->json($this->puestosService->getPuestoById($id));
    }

    public function createPuesto(Request $request)
    {
        $result = $this->puestosUseCase->handleCreatePuesto($request->all());
        if ($result['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'Solicitud CREATE',
                    'Gestión Puestos',
                    $result['data']['id'] ?? null, // ID del nuevo puesto creado
                    $request->all()
                ));
            }
        }
        return response()->json($result, $result['status']);
    }

    public function updatePuesto(Request $request, $id)
    {
        $result = $this->puestosUseCase->handleUpdatePuesto($id, $request->all());
        if ($result['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'Solicitud UPDATE',
                    'Gestión Puestos',
                    $id,
                    $request->all()
                ));
            }
        }
        return response()->json($result, $result['status']);
    }

    public function updatePartialPuesto(Request $request, $id)
    {
        $result = $this->puestosUseCase->handleUpdateSpecificFields($id, $request->all());
        if ($result['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'Solicitud PATCH',
                    'Gestión Puestos',
                    $id,
                    $request->all()
                ));
            }
        }
        return response()->json($result, $result['status']);
    }

    public function deletePuesto($id)
    {
        $result = $this->puestosService->deletePuesto($id);
        if ($result['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'Solicitud DELETE',
                    'Gestión Puestos',
                    $id,
                    []
                ));
            }
        }

        return response()->json($result, $result['status']);
    }

}
