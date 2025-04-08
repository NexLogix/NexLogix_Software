<?php

namespace App\Services\Roles;
use App\Models\Roles;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RoleService
{
    // GET
    public function getAll()
    {
        try {
            $roles = Roles::all();

            if ($roles->isEmpty()) {
                throw new ModelNotFoundException("No hay roles creados!");
            }

            return response()->json([
                "message" => "Roles obtenidos exitosamente",
                "data" => $roles,
                "status" => 200
            ], 200);

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

    //GET BY ID
    public function getRoleById($id)
    {
        try {
            $role = Roles::findOrFail($id);
            return response()->json([
                "message: "=> "Role encontrado!",
                "Role"=> $role,
                "Status" => 200
            ]);
        } catch (ModelNotFoundException $e){
            return response()->json([
                "message"=> "Role con ID $id no encontrado!",
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
    public function createRole(array $data)
    {
        try {
            // Validación manual (alternativa a FormRequest)
            if (!isset($data['nombreRole']) || empty($data['nombreRole'])) {
                throw new Exception("El campo nombreRole es obligatorio", 400);
            }

            $role = Roles::create([
                'nombreRole' => $data['nombreRole'],
                'descripcionRole' => $data['descripcionRole'] ?? null,
                'fechaAsignacionRole' => $data['fechaAsignacionRole'] ?? now()
            ]);

            // Adjuntar permisos generales si vienen en la petición
            if (isset($data['permisosGenerales'])) {
                $role->permisosGenerales()->sync($data['permisosGenerales']);
            }

            return response()->json([
                "success" => true,
                "data" => $role->load('permisosGenerales'), // Devuelve el rol con permisos
                "message" => "Rol creado exitosamente"
            ], 201);

        } catch (QueryException $e) {
            return response()->json([
                "success" => false,
                "message" => "Error al crear el rol: " . $e->getMessage(),
                "error_code" => $e->getCode(),
                "status" => 500
            ], 500);

        } catch (Exception $e) {
            return response()->json([
                "success" => false,
                "message" => $e->getMessage(),
                "status" => $e->getCode() ?: 500
            ], $e->getCode() ?: 500);
        }
    }


    // PUT
        public function updateRole($id, array $data)
    {
        try {
            // Buscar el role por ID o lanzar excepción si no existe
            $role = Roles::findOrFail($id);

            // Verificar que se recibieron todos los campos obligatorios
            if (!isset($data['nombreRole']) || !isset($data['descripcionRole']) || !isset($data['fechaAsignacionRole'])) {
                throw new Exception("Faltan campos obligatorios para la actualización completa.", 400);
            }

            // Actualizar el role con los datos completos
            $role->update([
                'nombreRole'          => $data['nombreRole'],
                'descripcionRole'     => $data['descripcionRole'],
                'fechaAsignacionRole' => $data['fechaAsignacionRole'],
            ]);

            return response()->json([
                "message" => "Role actualizado exitosamente.",
                "role"    => $role,
                "status"  => 200
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Role con ID $id no encontrado!",
                "status"  => 400
            ], 400);
        } catch (QueryException $e) {
            return response()->json([
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status"  => 500
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status"  => 500
            ], 500);
        }
    }


    // PATCH
    public function UpdateSpesificSection($id, array $data)
    {
        try {
            // Buscar el role por ID
            $role = Roles::findOrFail($id);

            // Armar array con los campos a actualizar si están presentes
            $fields = [];
            if (isset($data['nombreRole'])) {
                $fields['nombreRole'] = $data['nombreRole'];
            }
            if (isset($data['descripcionRole'])) {
                $fields['descripcionRole'] = $data['descripcionRole'];
            }
            if (isset($data['fechaAsignacionRole'])) {
                $fields['fechaAsignacionRole'] = $data['fechaAsignacionRole'];
            }

            if (empty($fields)) {
                throw new Exception("No se han enviado campos para actualizar.", 400);
            }

            // Actualizar solo los campos recibidos
            $role->update($fields);

            return response()->json([
                "message" => "Role actualizado exitosamente.",
                "role"    => $role,
                "status"  => 200
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Role con ID $id no encontrado!",
                "status"  => 400
            ], 400);
        } catch (QueryException $e) {
            return response()->json([
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status"  => 500
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status"  => 500
            ], 500);
        }
    }

    // DELETE
        public function DeleteRole($id)
    {
        try {
            $role = Roles::findOrFail($id);
            $role->delete();

            return response()->json([
                "message" => "Role eliminado exitosamente",
                "status" => 200
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                "message" => "Role con ID $id no encontrado!",
                "status" => 400
            ], 400);
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
}
