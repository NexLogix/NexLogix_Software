<?php

namespace App\Services\Roles;

use App\Models\Roles;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class RoleService
{
    // GET ALL
    public function getAll(): array
    {
        try {
            $roles = Roles::all();
            if ($roles->isEmpty()) {
                throw new ModelNotFoundException("No hay roles creados!");
            }
            return [
                "message" => "Roles obtenidos exitosamente",
                "data"    => $roles,
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "message" => $e->getMessage(),
                "status"  => 404
            ];
        } catch (QueryException $e) {
            return [
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status"  => 500
            ];
        } catch (Exception $e) {
            return [
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status"  => 500
            ];
        }
    }

    // GET BY ID
    public function getRoleById($id): array
    {
        try {
            $role = Roles::findOrFail($id);
            return [
                "message" => "Role encontrado!",
                "data"    => $role,
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "message" => "Role con ID $id no encontrado!",
                "status"  => 404
            ];
        } catch (QueryException $e) {
            return [
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status"  => 500
            ];
        } catch (Exception $e) {
            return [
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status"  => 500
            ];
        }
    }

    // POST
    public function createRole(array $data): array
    {
        try {
            if (!isset($data['nombreRole']) || empty($data['nombreRole'])) {
                throw new Exception("El campo nombreRole es obligatorio", 400);
            }
            $role = Roles::create([
                'nombreRole'          => $data['nombreRole'],
                'descripcionRole'     => $data['descripcionRole'] ?? null,
                'fechaAsignacionRole' => $data['fechaAsignacionRole'] ?? now()
            ]);

            // Si se envía un array de permisos generales, se sincroniza la relación
            if (isset($data['permisosGenerales'])) {
                $role->permisosGenerales()->sync($data['permisosGenerales']);
            }

            return [
                "success" => true,
                "data"    => $role->load('permisosGenerales'),
                "message" => "Rol creado exitosamente",
                "status"  => 201
            ];
        } catch (QueryException $e) {
            return [
                "success" => false,
                "message" => "Error al crear el rol: " . $e->getMessage(),
                "error_code" => $e->getCode(),
                "status"  => 500
            ];
        } catch (Exception $e) {
            return [
                "success" => false,
                "message" => $e->getMessage(),
                "status"  => $e->getCode() ?: 500
            ];
        }
    }

    // PUT
    public function updateRole($id, array $data): array
    {
        try {
            $role = Roles::findOrFail($id);

            if (!isset($data['nombreRole']) || !isset($data['descripcionRole']) || !isset($data['fechaAsignacionRole'])) {
                throw new Exception("Faltan campos obligatorios para la actualización completa.", 400);
            }

            $role->update([
                'nombreRole'          => $data['nombreRole'],
                'descripcionRole'     => $data['descripcionRole'],
                'fechaAsignacionRole' => $data['fechaAsignacionRole'],
            ]);

            return [
                "message" => "Role actualizado exitosamente.",
                "data"    => $role,
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "message" => "Role con ID $id no encontrado!",
                "status"  => 404
            ];
        } catch (QueryException $e) {
            return [
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status"  => 500
            ];
        } catch (Exception $e) {
            return [
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status"  => 500
            ];
        }
    }

    // PATCH
    public function updateSpecificSection($id, array $data): array
    {
        try {
            $role = Roles::findOrFail($id);

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

            $role->update($fields);

            return [
                "message" => "Role actualizado exitosamente.",
                "data"    => $role,
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "message" => "Role con ID $id no encontrado!",
                "status"  => 404
            ];
        } catch (QueryException $e) {
            return [
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status"  => 500
            ];
        } catch (Exception $e) {
            return [
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status"  => 500
            ];
        }
    }

    // DELETE
    public function deleteRole($id): array
    {
        try {
            $role = Roles::findOrFail($id);
            $role->delete();

            return [
                "message" => "Role eliminado exitosamente",
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "message" => "Role con ID $id no encontrado!",
                "status"  => 404
            ];
        } catch (QueryException $e) {
            return [
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status"  => 500
            ];
        } catch (Exception $e) {
            return [
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status"  => 500
            ];
        }
    }
}
