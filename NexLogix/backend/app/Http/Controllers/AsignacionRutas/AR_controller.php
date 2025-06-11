<?php

namespace App\Http\Controllers\AsignacionRutas;

use App\Events\ResourceAction;
use App\Http\Controllers\Controller;
use App\Models\Interfaces\AsignacionRutas\IAsignacionRutasService;
use App\Models\Interfaces\AsignacionRutas\IAsignacionRutasUseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AR_controller extends Controller
{
    protected IAsignacionRutasService $AR_Service;
    protected IAsignacionRutasUseCase $AR_use_case;

    public function __construct(IAsignacionRutasService $AR_Service, IAsignacionRutasUseCase $AR_use_case)
    {
        $this->AR_Service = $AR_Service;
        $this->AR_use_case = $AR_use_case;
    }

    // GET GENERAL CONTROLLER
    public function showAll_AR()
    {
        $response = $this->AR_Service->getAll_AR();
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

     // GET BY ID
    public function show_AR_ById(int $id)
    {
        $response = $this->AR_Service->get_AR_ById($id);
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

    // POST CONTROLLER
    public function create_AR(Request $request)
    {
        $response = $this->AR_use_case->handleCreate_AR($request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la creación
                event(new ResourceAction(
                    $userId,
                    'Solicitud POST',
                    'Gestion Asignacion de Rutas',
                    $response['data']['idCiudad'],
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PATCH CONTROLLER
    public function update_AR(Request $request, int $id)
    {
        $response = $this->AR_use_case->handleUpdate_AR($id, $request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la actualización parcial
                event(new ResourceAction(
                    $userId,
                    'Solicitud PATCH',
                    'Gestion Asignacion de Rutas',
                    $id,
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // DELETE CONTROLLER
    public function delete_AR(int $id)
    {
        $response = $this->AR_Service->delete_AR($id);
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la eliminación
                event(new ResourceAction(
                    $userId,
                    'Solicitud DELETE',
                    'Gestion Asignacion de Rutas',
                    $id,
                    []
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}
