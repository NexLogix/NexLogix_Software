<?php

namespace App\Http\Controllers\Areas;

use App\Events\ResourceAction;
use App\Models\Interfaces\Areas\IAreaService;
use App\Models\Interfaces\Areas\IAreaUseCase;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Areas",
 *     description="Operaciones sobre las Areas"
 * )
 */
class AreasController extends Controller
{
    protected IAreaService $areasService;
    protected IAreaUseCase $areasUseCase;

    public function __construct(IAreaService $areasService, IAreaUseCase $areasUseCase)
    {
        $this->areasService = $areasService;
        $this->areasUseCase = $areasUseCase;
    }

    // GET METHOD
    /**
     * @OA\Get(
     *     path="/api/gestion_areas",
     *     summary="Obtener todas las áreas",
     *     tags={"Areas"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de áreas obtenida exitosamente"
     *     )
     * )
     */
    public function showAll()
    {
        $response = $this->areasService->getAll();
        return response()->json($response, $response['status']);
    }

    // GET BY ID METHOD
    /**
     * @OA\Get(
     *     path="/api/gestion_areas/{id}",
     *     summary="Obtener un área por ID",
     *     tags={"Areas"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del área",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Área encontrada exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Área no encontrada"
     *     )
     * )
     */
    public function showByID($id)
    {
        $response = $this->areasService->getAreaById($id);
        return response()->json($response, $response['status']);
    }

    // POST METHOD
    /**
     * @OA\Post(
     *     path="/api/gestion_areas/crear_area",
     *     summary="Crear un área",
     *     tags={"Areas"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre"},
     *             @OA\Property(property="nombre", type="string", example="Area Administrativa")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Área creada exitosamente"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la solicitud"
     *     )
     * )
     */
    public function createArea(Request $request)
    {
        $result = $this->areasUseCase->handleCreateArea($request->all());
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud POST',
                    'Gestion Areas',
                    $result['data']['idareas'] ?? null,
                    ['Detalles' => $request->all()]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }

    // PUT METHOD
    /**
     * @OA\Put(
     *     path="/api/gestion_areas/editar_area/{id}",
     *     summary="Actualizar un área",
     *     tags={"Areas"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del área a actualizar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"nombre"},
     *             @OA\Property(property="nombre", type="string", example="Área Modificada")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Área actualizada exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Área no encontrada"
     *     )
     * )
     */
    public function updateArea(Request $request, $id)
    {
        $result = $this->areasUseCase->handleUpdateArea($id, $request->all());
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud PUT',
                    'Gestion Areas',
                    $id,
                    ['Detalles' => $request->all()]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }

    // PATCH METHOD
    /**
     * @OA\Patch(
     *     path="/api/gestion_areas/actualizar_campos_especificos_area/{id}",
     *     summary="Actualizar parcialmente un área",
     *     tags={"Areas"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del área a actualizar parcialmente",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="nombre", type="string", example="Nombre Parcial Actualizado")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Área actualizada parcialmente exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Área no encontrada"
     *     )
     * )
     */
    public function updatePartialArea(Request $request, $id)
    {
        $result = $this->areasUseCase->handleUpdateSpecificSection($id, $request->all());
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud PATCH Parcial',
                    'Gestion Areas',
                    $id,
                    ['Detalles' => $request->all()]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }

    // DELETE METHOD
    /**
     * @OA\Delete(
     *     path="/api/gestion_areas/eliminar_area/{id}",
     *     summary="Eliminar un área",
     *     tags={"Areas"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del área a eliminar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Área eliminada exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Área no encontrada"
     *     )
     * )
     */
    public function deleteArea($id)
    {
        $result = $this->areasService->deleteArea($id);
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud DELETE',
                    'Gestion Areas',
                    $id,
                    ['Detalles' => 'Eliminación del recurso con ID ' . $id]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }
}
