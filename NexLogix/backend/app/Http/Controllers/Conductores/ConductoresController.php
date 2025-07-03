<?php

namespace App\Http\Controllers\Conductores;

use App\Http\Controllers\Controller;
use App\Events\ResourceAction;
use App\Services\Conductores\Conductores_service;
use App\UseCases\Conductores\Conductores_req_usecase;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Conductores",
 *     description="Operaciones sobre los Conductores"
 * )
 */
class ConductoresController extends Controller
{
    protected Conductores_service $conductoresService;
    protected Conductores_req_usecase $conductoresUseCase;

    public function __construct(Conductores_service $conductoresService, Conductores_req_usecase $conductoresUseCase)
    {
        $this->conductoresService = $conductoresService;
        $this->conductoresUseCase = $conductoresUseCase;
    }

    // GET METHOD
    /**
     * @OA\Get(
     *     path="/api/gestion_conductores",
     *     summary="Obtener todos los conductores",
     *     tags={"Conductores"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Response(
     *         response=200,
     *         description="Lista de conductores obtenida exitosamente"
     *     )
     * )
     */
    public function showAll()
    {
        $response = $this->conductoresService->getAll();
        return response()->json($response, $response['status']);
    }

    // GET BY ID METHOD
    /**
     * @OA\Get(
     *     path="/api/gestion_conductores/{id}",
     *     summary="Obtener un conductor por ID",
     *     tags={"Conductores"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del conductor",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Conductor encontrado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Conductor no encontrado"
     *     )
     * )
     */
    public function showByID($id)
    {
        $response = $this->conductoresService->getConductorById($id);
        return response()->json($response, $response['status']);
    }

    // GET METHOD FOR SEARCHING USERS IN CREATE OR UPDATE CONDUCTOR
    /**
     * @OA\Get(
     *     path="/api/gestion_conductores/buscar_para_crear_o_actualizar",
     *     summary="Buscar usuarios para crear o actualizar conductor",
     *     tags={"Conductores"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         required=false,
     *         description="Buscar por nombre, documento o email",
     *         @OA\Schema(type="string")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Usuarios encontrados para crear o actualizar conductor"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Error en la búsqueda"
     *     )
     * )
     */

    // asi se busca en la siguiente api: http://127.0.0.1:8000/api/gestion_conductores/buscar_para_crear_o_actualizar?search=sofi777@gmail.com
    /*
    public function searchConductorForCreateOrUpdate(Request $request)
    {
        $search = $request->query('search');
        $response = $this->conductoresService->searchConductorForCreateOrUpdate($search);
        return response()->json($response, $response['status']);
    }*/


    // POST METHOD
    /**
     * @OA\Post(
     *     path="/api/gestion_conductores/crear_conductor",
     *     summary="Crear un conductor",
     *     tags={"Conductores"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"licencia", "tipoLicencia", "vigenciaLicencia", "idUsuario"},
     *             @OA\Property(property="licencia", type="string", example="123456789"),
     *             @OA\Property(property="tipoLicencia", type="string", example="B1"),
     *             @OA\Property(property="vigenciaLicencia", type="string", format="date", example="2025-12-31"),
     *             @OA\Property(property="estado", type="string", example="disponible"),
     *             @OA\Property(property="idUsuario", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Conductor creado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=400,
     *         description="Error en la solicitud"
     *     )
     * )
     */
    public function createConductor(Request $request)
    {
        $result = $this->conductoresUseCase->handleCreateConductor($request->all());
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud POST',
                    'Gestion Conductores',
                    $result['data']['idConductor'] ?? null,
                    ['Detalles' => $request->all()]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }

    // PUT METHOD
    /**
     * @OA\Put(
     *     path="/api/gestion_conductores/editar_conductor/{id}",
     *     summary="Actualizar un conductor",
     *     tags={"Conductores"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del conductor a actualizar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"licencia", "tipoLicencia", "vigenciaLicencia", "estado", "idUsuario"},
     *             @OA\Property(property="licencia", type="string", example="123456789"),
     *             @OA\Property(property="tipoLicencia", type="string", example="B1"),
     *             @OA\Property(property="vigenciaLicencia", type="string", format="date", example="2025-12-31"),
     *             @OA\Property(property="estado", type="string", example="disponible"),
     *             @OA\Property(property="idUsuario", type="integer", example=1)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Conductor actualizado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Conductor no encontrado"
     *     )
     * )
     */
    /*public function updateConductor(Request $request, $id)
    {
        $result = $this->conductoresUseCase->handleUpdateConductor($id, $request->all());
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud PUT',
                    'Gestion Conductores',
                    $id,
                    ['Detalles' => $request->all()]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }*/

    // PATCH METHOD
    /**
     * @OA\Patch(
     *     path="/api/gestion_conductores/actualizar_campos_especificos_conductor/{id}",
     *     summary="Actualizar parcialmente un conductor",
     *     tags={"Conductores"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del conductor a actualizar parcialmente",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="licencia", type="string", example="987654321"),
     *             @OA\Property(property="tipoLicencia", type="string", example="C1"),
     *             @OA\Property(property="vigenciaLicencia", type="string", format="date", example="2026-01-01"),
     *             @OA\Property(property="estado", type="string", example="en_ruta"),
     *             @OA\Property(property="idUsuario", type="integer", example=2)
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Conductor actualizado parcialmente exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Conductor no encontrado"
     *     )
     * )
     */
    public function updatePartialConductor(Request $request, $id)
    {
        $result = $this->conductoresUseCase->handleUpdateSpecificSection($id, $request->all());
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud PATCH Parcial',
                    'Gestion Conductores',
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
     *     path="/api/gestion_conductores/eliminar_conductor/{id}",
     *     summary="Eliminar un conductor",
     *     tags={"Conductores"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="ID del conductor a eliminar",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Conductor eliminado exitosamente"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Conductor no encontrado"
     *     )
     * )
     */
    public function deleteConductor($id)
    {
        $result = $this->conductoresService->deleteConductor($id);
        if ($result['success']) {
            $user_id = Auth::id();
            if ($user_id) {
                event(new ResourceAction(
                    $user_id,
                    'Solicitud DELETE',
                    'Gestion Conductores',
                    $id,
                    ['Detalles' => 'Eliminación del recurso con ID ' . $id]
                ));
            }
        }
        return response()->json($result, $result['status']);
    }
}
