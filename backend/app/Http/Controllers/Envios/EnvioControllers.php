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
    // Dependencia del servicio de envíos
    protected IEnviosService $service_envios;

    // Dependencia del caso de uso de envíos
    protected IEnviosUseCase $useCase_envios;

    // Constructor que inyecta el servicio y el caso de uso
    public function __construct(IEnviosService $service_envios , IEnviosUseCase $useCase_envios)
    {
        $this->service_envios = $service_envios;
        $this->useCase_envios = $useCase_envios;
    }

    // Muestra todos los registros de envíos
    public function showAllEnvios()
    {
        $response = $this->service_envios->getAllEnvios();
        if($response['success']) {
            $user_id = Auth::id(); // Obtiene el ID del usuario autenticado
            if($user_id){
                // Dispara un evento de auditoría para registrar la solicitud
                event( new ResourceAction(
                    $user_id,
                    'Solicitud GET',
                    'Gestion Envios',
                    null,
                    ['Detalles' => request()->path()],
                ));
            }
        }
    }

    // Muestra un envío específico por su ID
    public function showEnvioById(int $id)
    {
        $response = $this->service_envios->getEnvioById($id);
        if ($response['success']) {
            $user_id = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($user_id) {
                // Dispara un evento de auditoría para registrar la solicitud por ID
                event(new ResourceAction(
                    $user_id,
                    'Solicitud GET',
                    'Gestion Envios',
                    $id,
                    ['path' => request()->path()]
                ));
            }
        }
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

    // Crea un nuevo envío
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

    // Actualiza un envío completo
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

    // Actualiza parcialmente un envío
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

    // Elimina un envío por su ID
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
