<?php

namespace App\Http\Controllers\AVPR_controller;

use App\Events\ResourceAction;
use App\Http\Controllers\Controller;
use App\Services\Asignacion_Vehiculos_Por_Rutas\AVPR_Service;
use App\UseCases\Asignacion_Vehiculos_Por_Rutas\AVPR_UseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Asignacion_Vehiculos_Por_Rutas_Controller extends Controller
{
    protected AVPR_Service $AVPR_Service;
    protected AVPR_UseCase $AVPR_use_case;

    public function __construct(AVPR_Service $AVPR_Service, AVPR_UseCase $AVPR_use_case)
    {
        $this->AVPR_Service = $AVPR_Service;
        $this->AVPR_use_case = $AVPR_use_case;
    }

    // GET GENERAL CONTROLLER
    public function showAll_AVPR()
    {
        $response = $this->AVPR_Service->getAll_AVPR();
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

     // GET BY ID
    public function show_AR_ById(int $id)
    {
        $response = $this->AVPR_Service->get_AVPR_ById($id);
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

    // POST CONTROLLER
    public function create_AVPR(Request $request)
    {
        $response = $this->AVPR_use_case->handleCreate_AVPR($request->all());
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
    public function update_AVPR(Request $request, int $id)
    {
        $response = $this->AVPR_use_case->handleUpdate_AVPR($id, $request->all());
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
    public function delete_AVPR(int $id)
    {
        $response = $this->AVPR_Service->delete_AVPR($id);
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
