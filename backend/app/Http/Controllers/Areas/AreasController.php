<?php

namespace App\Http\Controllers\Areas;

use App\Events\ResourceAction;
use App\Models\Interfaces\Areas\IAreaService;
use App\Models\Interfaces\Areas\IAreaUseCase;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AreasController extends Controller
{
    protected IAreaService $areasService;
    protected IAreaUseCase $areasUseCase;

    public function __construct(IAreaService $areasService, IAreaUseCase $areasUseCase)
    {
        $this->areasService = $areasService;
        $this->areasUseCase = $areasUseCase;
    }

    public function showAll()
    {
        $response = $this->areasService->getAll();
        if ($response['status']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud GET',
                    'Gestion Areas',
                    null,
                    ['Detalles' => request()->path()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    public function showByID($id)
    {
        $response = $this->areasService->getAreaById($id); // Asumo que era getById, no getAll
        if ($response['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud GET_by_id',
                    'Gestion Areas',
                    $id,
                    ['Detalles' => request()->path()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    public function createArea(Request $request)
    {
        $result = $this->areasUseCase->handleCreateArea($request->all());
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud POST',
                    'Gestion Areas',
                    $result['data']['idareas'] ?? null,
                    ['Detalles' => $request->all()]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }

    public function updateArea(Request $request, $id)
    {
        $result = $this->areasUseCase->handleUpdateArea($id, $request->all());
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud PUT',
                    'Gestion Areas',
                    $id,
                    ['Detalles' => $request->all()]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }

    public function updatePartialArea(Request $request, $id)
    {
        $result = $this->areasUseCase->handleUpdateSpecificSection($id, $request->all());
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud PATCH Parcial',
                    'Gestion Areas',
                    $id,
                    ['Detalles' => $request->all()]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }

    public function deleteArea($id)
    {
        $result = $this->areasService->deleteArea($id);
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud DELETE',
                    'Gestion Areas',
                    $id,
                    ['Detalles' => 'Eliminación del recurso con ID ' . $id]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }
}
