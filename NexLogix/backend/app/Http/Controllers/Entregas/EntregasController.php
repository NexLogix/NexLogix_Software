<?php

namespace App\Http\Controllers\Entregas;

use App\Events\ResourceAction;
use App\Http\Controllers\Controller;
use App\Models\Interfaces\Entregas\IEntregaService;
use App\Models\Interfaces\Entregas\IEntregaUseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EntregasController extends Controller
{
    protected IEntregaService $entregas_service;
    protected IEntregaUseCase $entregas_use_case;
    public function __construct(IEntregaService $entregas_service, IEntregaUseCase $entregas_use_case)
    {
        $this->entregas_service = $entregas_service;
        $this->entregas_use_case = $entregas_use_case;
    }

    // GET COTROLLER
    public function showAllEntregas()
    {
        $response = $this->entregas_service->getAllEntregas();
        return response()->json($response, $response['status']);
    }

    // GET COTROLLER BY ID
    public function showByIDEntrega(int $id)
    {
        $response = $this->entregas_service->getEntregaById($id);
        return response()->json($response, $response['status']);
    }

    // POST CONTROLLER
    public function createEntrega(Request $request)
    {
        $response = $this->entregas_use_case->handleCreateEntrega($request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la creación
                event(new ResourceAction(
                    $userId,
                    'Solicitud POST',
                    'Gestion Entregas',
                    $response['data']['idCiudad'],
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PATCH CONTROLLER
    public function updateSpecificSection_E(Request $request, int $id)
    {
        $response = $this->entregas_use_case->handleUpdateSpecificSection_R( $id, $request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la actualización parcial
                event(new ResourceAction(
                    $userId,
                    'Solicitud PATCH',
                    'Gestion Entregas',
                    $id,
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
    // DELETE CONTROLLER
    public function deleteEntrega(int $id)
    {
        $response = $this->entregas_service->deleteEntrega( $id );
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la eliminación
                event(new ResourceAction(
                    $userId,
                    'Solicitud DELETE',
                    'Gestion Entregas',
                    $id,
                    []
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}
