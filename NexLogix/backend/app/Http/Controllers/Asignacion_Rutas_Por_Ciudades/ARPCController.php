<?php

namespace App\Http\Controllers\Asignacion_Rutas_Por_Ciudades;

use App\Http\Controllers\Controller;
use App\Services\Asignacion_Rutas_Por_Ciudades\ARPC_Service;
use App\UseCases\Asignacion_Rutas_Por_Ciudades\ARPC_useCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\ResourceAction;

class ARPCController extends Controller
{
    protected ARPC_Service $arpcService;
    protected ARPC_useCase $arpcUseCase;

    public function __construct(ARPC_Service $arpcService, ARPC_useCase $arpcUseCase)
    {
        $this->arpcService = $arpcService;
        $this->arpcUseCase = $arpcUseCase;
    }

    // GET ALL
    public function showAll()
    {
        $response = $this->arpcService->getAll();
        return response()->json($response, $response['status']);
    }

    // GET BY ID
    public function showByID($id)
    {
        $response = $this->arpcService->getById($id);
        return response()->json($response, $response['status']);
    }

    // POST
    public function createARPC(Request $request)
    {
        $result = $this->arpcUseCase->handleCreateARPC($request->all());
        /*if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud POST',
                    'Gestion ARPC',
                    $result['data']['idasignacion_rutas_por_ciudades'] ?? null,
                    ['Detalles' => $request->all()]
                ));
            }
        }*/
        return response()->json($result, $result['status']);
    }

    // PATCH
    public function updatePartialARPC(Request $request, $id)
    {
        $result = $this->arpcUseCase->handleUpdateARPC($id, $request->all());
        /*if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud PATCH Parcial',
                    'Gestion ARPC',
                    $id,
                    ['Detalles' => $request->all()]
                ));
            }
        }*/
        return response()->json($result, $result['status']);
    }

    // DELETE
    public function deleteARPC($id)
    {
        $result = $this->arpcService->delete($id);
        /*if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud DELETE',
                    'Gestion ARPC',
                    $id,
                    ['Detalles' => 'Eliminación del recurso con ID ' . $id]
                ));
            }
        }*/
        return response()->json($result, $result['status']);
    }
}
