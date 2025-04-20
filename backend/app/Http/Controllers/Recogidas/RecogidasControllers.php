<?php

namespace App\Http\Controllers\Recogidas;

use App\Events\ResourceAction;
use App\Http\Controllers\Controller;
use App\Models\Interfaces\Recogidas\IRecogidaService;
use App\Models\Interfaces\Recogidas\IRecogidaUseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecogidasControllers extends Controller
{
    protected IRecogidaService $recogida_service;
    protected IRecogidaUseCase $recogida_UseCase;

    public function __construct(IRecogidaService $recogida_service, IRecogidaUseCase $recogida_UseCase)
    {
        $this->recogida_service = $recogida_service;
        $this->recogida_UseCase = $recogida_UseCase;
    }

    // GET COTROLLER
    public function showAllRecogidas()
    {
        $response = $this->recogida_service->getAllRecogidas();
        return response()->json($response, $response['status']);
    }

    // GET COTROLLER BY ID
    public function showByIDRecogida(int $id)
    {
        $response = $this->recogida_service->getRecogidaById($id);
        return response()->json($response, $response['status']);
    }

    // POST CONTROLLER
    public function createRecogida(Request $request)
    {
        $response = $this->recogida_UseCase->handleCreateRecogida( $request->all() );
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la creación
                event(new ResourceAction(
                    $userId,
                    'Solicitud POST',
                    'Gestion Recogidas',
                    $response['data']['idCiudad'],
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PATCH CONTROLLER
    public function updateSpecificSection_R(Request $request, int $id)
    {
        $response = $this->recogida_UseCase->handleUpdateSpecificSection_R( $id, $request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la actualización parcial
                event(new ResourceAction(
                    $userId,
                    'Solicitud PATCH',
                    'Gestion Recogidas',
                    $id,
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
    // DELETE CONTROLLER
    public function deleteRecogida(int $id)
    {
        $response = $this->recogida_service->deleteRecogida( $id );
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la eliminación
                event(new ResourceAction(
                    $userId,
                    'Solicitud DELETE',
                    'Gestion Recogidas',
                    $id,
                    []
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}
