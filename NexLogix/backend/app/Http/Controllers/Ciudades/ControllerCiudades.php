<?php

namespace App\Http\Controllers\Ciudades;

use App\Events\ResourceAction;
use App\Http\Controllers\Controller;
use App\Models\Interfaces\Ciudades\ICiudadesService;
use App\Models\Interfaces\Ciudades\ICiudadesUseCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ControllerCiudades extends Controller
{
    protected ICiudadesService $ciudades_service;
    protected ICiudadesUseCase $ciudades_use_case;

    public function __construct(ICiudadesService $ciudades_service, ICiudadesUseCase $ciudades_use_case)
    {
        $this->ciudades_service = $ciudades_service;
        $this->ciudades_use_case = $ciudades_use_case;
    }

    // GET GENERAL CONTROLLER
    public function showAllCiudades()
    {
        $response = $this->ciudades_service->getAllCiudades();
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

     // GET BY ID
    public function showCiudadById(string $id)
    {
        $response = $this->ciudades_service->getCiudadById($id);
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

    // POST CONTROLLER
    public function createCiudad(Request $request)
    {
        $response = $this->ciudades_use_case->handleCreateCiudad($request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la creación
                event(new ResourceAction(
                    $userId,
                    'Solicitud POST',
                    'Gestion Ciudades',
                    $response['data']['idCiudad'],
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PUT CONTROLLER
    public function updateCiudad(Request $request, string $id)
    {
        $response = $this->ciudades_use_case->handleUpdateCiudad($id, $request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la actualización parcial
                event(new ResourceAction(
                    $userId,
                    'Solicitud PUT',
                    'Gestion Ciudades',
                    $id,
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PATCH CONTROLLER
    public function updateSpecificSection(Request $request, string $id)
    {
        $response = $this->ciudades_use_case->handleUpdateSpecificSectionC($id, $request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la actualización parcial
                event(new ResourceAction(
                    $userId,
                    'Solicitud PATCH',
                    'Gestion Ciudades',
                    $id,
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // DELETE CONTROLLER
    public function deleteCiudades(string $id)
    {
        $response = $this->ciudades_service->deleteCiudad($id);
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la eliminación
                event(new ResourceAction(
                    $userId,
                    'Solicitud DELETE',
                    'Gestion Ciudades',
                    $id,
                    []
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}
