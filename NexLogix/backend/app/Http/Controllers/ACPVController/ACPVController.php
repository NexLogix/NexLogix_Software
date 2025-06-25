<?php

namespace App\Http\Controllers\ACPVController;

use App\Events\ResourceAction;
use App\Http\Controllers\Controller;
use App\Services\Asignacion_Conductor_Por_Vehiculos\ACPV_Service;
use App\UseCases\asignacion_conductor_por_vehiculos\ACPV_UseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ACPVController extends Controller
{
    protected ACPV_Service $service;
    protected ACPV_UseCase $use_case;

    public function __construct(ACPV_Service $service, ACPV_UseCase $use_case)
    {
        $this->service = $service;
        $this->use_case = $use_case;
    }

    // GET GENERAL CONTROLLER
    public function showAll()
    {
        $response = $this->service->showAll_ACPV();
        return response()->json($response, $response['status']);
    }

    // GET BY ID
    public function showBySearching($id)
    {
        $response = $this->service->showBySearching_ACPV(['idAsignacion' => $id]);
        return response()->json($response, $response['status']);
    }

    // POST CONTROLLER
    public function create(Request $request)
    {
        $response = $this->use_case->handleCreateACPV($request->all());
        if ($response['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'Solicitud POST',
                    'Gestion Asignacion Conductores por Vehiculos',
                    $response['data']['idAsignacion'] ?? null, // <-- idAsignacion como resourceId
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PATCH CONTROLLER (actualiza asignación)
    public function update(Request $request, string $id)
    {
        $response = $this->use_case->handleUpdateACPV($id, $request->all());
        if ($response['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'Solicitud PUT',
                    'Gestion Asignacion Conductores por Vehiculos',
                    $response['data']['idAsignacion'] ?? $id, // <-- idAsignacion actualizado
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // DELETE CONTROLLER
    public function delete($id)
    {
        $response = $this->service->delete_ACPV($id);
        if ($response['success']) {
            $userId = Auth::id();
            if ($userId) {
                event(new ResourceAction(
                    $userId,
                    'Solicitud DELETE',
                    'Gestion Asignacion Conductores por Vehiculos',
                    $id, // <-- idAsignacion eliminado
                    []
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}
