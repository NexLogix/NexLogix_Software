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
            return [
                "success" => true,
                "message" => "Roles obtenidos exitosamente",
                "data"    => $roles,
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "success" => false,
                "message" => $e->getMessage(),
                "status"  => 404
            ];
        } catch (Exception $e) {
            return [
                "success" => false,
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
                "success" => true,
                "message" => "Role encontrado!",
                "data"    => $role,
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "success" => false,
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
                "success" => false,
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status"  => 500
            ];
        }
    }

    // POST
    public function createRole(array $data): array
    {
        try {
            $role = Roles::create($data);
            return [
                "success" => true,
                "data"    => $role,
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

    // PATCH
    public function updateRole($id, array $data): array
    {
        try {
            $role = Roles::findOrFail($id);
            $role->update($data);
            return [
                    'success' => true,
                    'message' => 'Role creado exitosamente',
                    'data' => $role,
                    'status' => 200
                ];
        } catch (ModelNotFoundException $e) {
            return [
                "success" => false,
                "message" => "Role con ID $id no encontrado!",
                "status"  => 404
            ];
        } catch (QueryException $e) {
            return [
                "success" => false,
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status"  => 500
            ];
        } catch (Exception $e) {
            return [
                "success" => false,
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status"  => 500
            ];
        }
    }

    // put documentado
    /*
    public function updatePUT($id, array $data): array
    {
        try {
            $role = Roles::findOrFail($id);
            $role->update($data);

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
    */

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
