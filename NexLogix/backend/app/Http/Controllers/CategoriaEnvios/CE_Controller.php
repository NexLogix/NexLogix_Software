<?php

namespace App\Http\Controllers\CategoriaEnvios;

use App\Events\ResourceAction;
use App\Http\Controllers\Controller;
use App\Models\Interfaces\CategoriaEnvios\ICategoriaEnviosService;
use App\Models\Interfaces\CategoriaEnvios\ICategoriaEnviosUseCase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class CE_Controller extends Controller
{
    protected ICategoriaEnviosService $CategoriaEnviosService;
    protected ICategoriaEnviosUseCase $categoriaEnviosUseCase;

    // constructor de metodos
    public function __construct(ICategoriaEnviosService $CategoriaEnviosService, ICategoriaEnviosUseCase $categoriaEnviosUseCase )
    {
        $this->CategoriaEnviosService = $CategoriaEnviosService;
        $this->categoriaEnviosUseCase = $categoriaEnviosUseCase;
    }

    // GET GENERAL CONTROLLER
    public function showAllCE()
    {
        $response = $this->CategoriaEnviosService->getAllCategoriasEnvios();
        if($response['success']) {
            $user_id = Auth::id(); // Obtiene el ID del usuario autenticado
            if($user_id){
                // Dispara un evento de auditoría para registrar la solicitud
                event( new ResourceAction(
                    $user_id,
                    'Solicitud GET',
                    'Gestion Categoria de Envios',
                    null,
                    ['Detalles' => request()->path()],
                ));
            }
        }
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

    // GET BY ID
    public function showCEById(int $id)
    {
        $response = $this->CategoriaEnviosService->getCategoriaEnvioById($id);
        if ($response['success']) {
            $user_id = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($user_id) {
                // Dispara un evento de auditoría para registrar la solicitud por ID
                event(new ResourceAction(
                    $user_id,
                    'Solicitud GET',
                    'Gestion Categoria de Envios',
                    $id,
                    ['path' => request()->path()]
                ));
            }
        }
        // Retorna la respuesta en formato JSON con el código de estado
        return response()->json($response, $response['status']);
    }

    // POST CONTROLLER
    public function createCE(Request $request)
    {
        $response = $this->categoriaEnviosUseCase->handleCreateCategoriaEnvio($request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la creación
                event(new ResourceAction(
                    $userId,
                    'Solicitud POST',
                    'Gestion Categoria de Envios',
                    $response['data']['idCategoria'],
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PUT CONTROLLER
    public function updateCA(Request $request, int $id)
    {
        $response = $this->categoriaEnviosUseCase->handleUpdateCategoriaEnvio($id, $request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la actualización total
                event(new ResourceAction(
                    $userId,
                    'Solicitud PUT',
                    'Gestion Categoria de Envios',
                    $id,
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // PATCH CONTROLLER
    public function updateSpecificSectionCE(Request $request, int $id)
    {
        $response = $this->categoriaEnviosUseCase->handleUpdateSpecificSection($id, $request->all());
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la actualización parcial
                event(new ResourceAction(
                    $userId,
                    'Solicitud PATCH',
                    'Gestion Categoria de Envios',
                    $id,
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // DELETE CONTROLLER
    public function deleteCE(int $id)
    {
        $response = $this->CategoriaEnviosService->deleteCategoriaEnvio($id);
        if ($response['success']) {
            $userId = Auth::id(); // Obtiene el ID del usuario autenticado
            if ($userId) {
                // Dispara un evento de auditoría para registrar la eliminación
                event(new ResourceAction(
                    $userId,
                    'Solicitud DELETE',
                    'Gestion Categorias de Envios',
                    $id,
                    []
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}
