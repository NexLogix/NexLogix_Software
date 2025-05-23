<?php

namespace App\Http\Controllers\Envios;

use App\Http\Controllers\Controller;
use App\Models\Interfaces\Envios\IEnviosService; // Interfaz para la capa de servicio de envíos
use App\Models\Interfaces\Envios\IEnviosUseCase; // Interfaz para la capa de casos de uso de envíos
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Events\ResourceAction; // Evento personalizado para auditar acciones

class EnvioControllers extends Controller
{
    protected IEnviosService $service_envios;
    protected IEnviosUseCase $useCase_envios;

    // Constructor que inyecta el servicio y el caso de uso
    public function __construct(IEnviosService $service_envios , IEnviosUseCase $useCase_envios)
    {
        $this->service_envios = $service_envios;
        $this->useCase_envios = $useCase_envios;
    }

    // GET GENERAL CONTROLLER
    public function showAllEnvios()
    {
        $response = $this->service_envios->getAllEnvios();
       // Retorna la respuesta en formato JSON con el código de estado
       return response()->json($response, $response['status']);
    }

    // GET BY ID
    public function showEnvioById(int $id)
    {
        $response = $this->service_envios->getEnvioById($id);
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

    // POST CONTROLLER
    public function createEnvio(Request $request)
    {
        $response = $this->useCase_envios->handleCreateEnvio($request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la creación
                event(new ResourceAction(
                    $userId,
                    'Solicitud POST',
                    'Gestion Envios',
                    $response['data']['idEnvio'],
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PUT CONTROLLER
    public function updateEnvio(Request $request, int $id)
    {
        $response = $this->useCase_envios->handleUpdateEnvio($id, $request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la actualización total
                event(new ResourceAction(
                    $userId,
                    'Solicitud PUT',
                    'Gestion Envios',
                    $id,
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PATCH CONTROLLER
    public function updateSpecificSection(Request $request, int $id)
    {
        $response = $this->useCase_envios->handleUpdateSpecificSection($id, $request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la actualización parcial
                event(new ResourceAction(
                    $userId,
                    'Solicitud PATCH',
                    'Gestion Envios',
                    $id,
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // DELETE CONTROLLER
    public function deleteEnvio(int $id)
    {
        $response = $this->service_envios->deleteEnvio($id);
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la eliminación
                event(new ResourceAction(
                    $userId,
                    'Solicitud DELETE',
                    'Gestion Envios',
                    $id,
                    []
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}
