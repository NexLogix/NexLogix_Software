<?php

namespace App\Http\Controllers\vehiculos;

use App\Events\ResourceAction;
use App\Http\Controllers\Controller;
use App\Models\Interfaces\Vehiculos\IVehiculoService;
use App\Models\Interfaces\Vehiculos\IVehiculoUseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VehiculosController extends Controller
{
    protected IVehiculoService $vehiculo_service;
    protected IVehiculoUseCase $vehiculo_use_case;

    public function __construct(IVehiculoService $vehiculo_service, IVehiculoUseCase $vehiculo_use_case)
    {
        $this->vehiculo_service = $vehiculo_service;
        $this->vehiculo_use_case = $vehiculo_use_case;
    }

    // GET GENERAL CONTROLLER
    public function showAllVehiculos()
    {
        $response = $this->vehiculo_service->getAllVehiculos();
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

    // GET BY ID
    public function showVehiculoById(int $id)
    {
        $response = $this->vehiculo_service->getVehiculoById($id);
        // Retorna la respu~esta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

    // POST CONTROLLER
    public function createVehiculo(Request $request)
    {
        $response = $this->vehiculo_use_case->handleCreateVehiculo($request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la creación
                event(new ResourceAction(
                    $userId,
                    'Solicitud POST',
                    'Gestion Vehiculos',
                    $response['data']['idCiudad'],
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PATCH CONTROLLER
    public function updateVehiculo(Request $request, int $id)
    {
        $response = $this->vehiculo_use_case->handleUpdateVehiculo($id, $request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la actualización parcial
                event(new ResourceAction(
                    $userId,
                    'Solicitud PATCH',
                    'Gestion Vehiculos',
                    $id,
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // DELETE CONTROLLER
    public function deleteVehiculo(int $id)
    {
        $response = $this->vehiculo_service->deleteVehiculo($id);
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la eliminación
                event(new ResourceAction(
                    $userId,
                    'Solicitud DELETE',
                    'Gestion Vehiculos',
                    $id,
                    []
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}
