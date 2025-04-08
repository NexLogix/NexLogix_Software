<?php
namespace App\Services\Permisos;

use App\Models\PermisosGenerales;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Validator;
use Exception;

class PermisosGeneralesService
{
    public function getAll()
    {
        try {
            $permisos_generales = PermisosGenerales::all();
            if ($permisos_generales->isEmpty()) {
                throw new ModelNotFoundException('No hay permisos registrados!');
            }

            return response()->json([
                'message' => 'Lista de Permisos Generales',
                'data'=> $permisos_generales,
                'status' => 200,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => $e->getMessage(),
                "status" => 404
            ], 404);
        } catch (QueryException $e) {
            return response()->json([
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status" => 500
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status" => 500
            ], 500);
        }
    }

    // GET BY ID
    public function get_PG_ByID($id)
    {
        try {
            $permisos_generales = PermisosGenerales::findOrFail($id);
            return response()->json([
                'message' => 'Permiso General encontrado!',
                'data' => $permisos_generales,
                'status'=> 200
            ]);
        } catch (ModelNotFoundException $e){
            return response()->json([
                "message"=> "El Permiso General con el ID $id, lamentablemente no ha sido encontrado!",
                "status"=> 404
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status" => 500
            ], 500);

        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status" => 500
            ], 500);
        }
    }

    // POST
    public function createPG(array $data):array
    {
        try {
            $permisos_generales = PermisosGenerales::create([
                "nombrePermisoGeneral"=> $data["nombrePermisoGeneral"],
                "fechaAsignacionPermisoGeneral"=> $data["fechaAsignacionPermisoGeneral"] ?? now(),
                "descripcionPermisoGeneral"=> $data["descripcionPermisoGeneral"] ?? null,
            ]);

            return [
                'message' => 'Permiso General creado correctamente',
                'data'    => $permisos_generales,
                'status'  => 201
            ];
        } catch (QueryException $e) {
            return [
                'message' => 'Error al insertar en la base de datos',
                'details' => $e->getMessage(),
                'status'  => 500
            ];
        }
    }

    // PUT
    public function updatePG($id, array $data)
    {
        try {
            $permisos_generales = PermisosGenerales::findOrFail($id);

            $permisos_generales->update([
                "nombrePermisoGeneral" => $data["nombrePermisoGeneral"],
                "fechaAsignacionPermisoGeneral" => $data["fechaAsignacionPermisoGeneral"] ?? now(),
                "descripcionPermisoGeneral" => $data["descripcionPermisoGeneral"] ?? null,
            ]);

            return response()->json([
                'message' => 'Permiso General actualizado correctamente!',
                'data'    => $permisos_generales,
                'status'  => 200
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Permiso General con el ID $id no ha sido encontrado",
                "status"  => 404
            ], 404);

        } catch (QueryException $e) {
            return response()->json([
                "message" => "Error en la base de datos: " . $e->getMessage(),
                "status"  => 500
            ], 500);

        } catch (\Throwable $e) {
            return response()->json([
                "message" => "Error inesperado: " . $e->getMessage(),
                "status"  => 500
            ], 500);
        }
    }

    // PATCH

    public function udpateSpecificPlace($request, $id): array
    {
        $validator = Validator::make($request->all(), [
            'nombrePermisoGeneral'   => 'sometimes|required|string|max:150',
            'fechaAsignacionPermisoGeneral' => 'sometimes|date_format:Y-m-d H:i:s',  // => 'sometimes|required|string|max:1000',
            'descripcionPermisoGeneral' => 'sometimes|required|string|max:1000'
        ]);

        if ($validator->fails()) {
            return [
                'message' => 'Error de validación',
                'errors'  => $validator->errors(),
                'status'  => 422
            ];
        }

        try {
            $permisos_generales = PermisosGenerales::findOrFail($id);
            $permisos_generales->update($request->all());

            return [
                'message' => 'Permiso General actualizado correctamente',
                'data'    => $permisos_generales,
                'status'  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'message' => "El Permiso General con ID el $id no ha sido encontrado",
                'status'  => 404
            ];
        } catch (QueryException $e) {
            return [
                'message' => "Error en la base de datos: " . $e->getMessage(),
                'status'  => 500
            ];
        } catch (\Exception $e) {
            return [
                'message' => "Error inesperado: " . $e->getMessage(),
                'status'  => 500
            ];
        }
    }


    // DELETE

    public function deletePG($id): array
    {
        try {
            // Buscamos el reporte; si no existe, se lanzará ModelNotFoundException
            $permisos_generales = PermisosGenerales::findOrFail($id);

            // Eliminamos el reporte
            $permisos_generales->delete();

            return [
                'message' => 'El Permiso General ha sido eliminado correctamente',
                'status'  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'message' => "El Permiso General con el ID $id no fue encontrado",
                'status'  => 404
            ];
        } catch (QueryException $e) {
            return [
                'message' => "Error de base de datos: " . $e->getMessage(),
                'status'  => 500
            ];
        } catch (Exception $e) {
            return [
                'message' => "Ocurrió un error inesperado: " . $e->getMessage(),
                'status'  => 500
            ];
        }
    }
}
