<?php

namespace App\Services\Areas;

use App\Models\Areas;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AreasService
{
    // GET ALL
    public function getAll(): array
    {
        try {
            $areas = Areas::all();

            if ($areas->isEmpty()) {
                throw new ModelNotFoundException("No hay áreas registradas!");
            }

            return [
                "message" => "Áreas obtenidas exitosamente",
                "data"    => $areas,
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
    public function getAreaById($id): array
    {
        try {
            $area = Areas::findOrFail($id);
            return [
                "message" => "Área encontrada!",
                "data"    => $area,
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "message" => "Área con ID $id no encontrada!",
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
    public function createArea(array $data): array
    {
        try {
            if (!isset($data['nombreArea']) || empty($data['nombreArea'])) {
                throw new Exception("El campo nombreArea es obligatorio", 400);
            }

            $area = Areas::create([
                'nombreArea'      => $data['nombreArea'],
                'descripcionArea' => $data['descripcionArea'] ?? null,
            ]);

            return [
                "success" => true,
                "data"    => $area,
                "message" => "Área creada exitosamente",
                "status"  => 201
            ];
        } catch (QueryException $e) {
            return [
                "success" => false,
                "message" => "Error al crear el área: " . $e->getMessage(),
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
    public function updateArea($id, array $data): array
    {
        try {
            $area = Areas::findOrFail($id);

            if (!isset($data['nombreArea']) || !isset($data['descripcionArea'])) {
                throw new Exception("Faltan campos obligatorios para la actualización completa.", 400);
            }

            $area->update([
                'nombreArea'      => $data['nombreArea'],
                'descripcionArea' => $data['descripcionArea'],
            ]);

            return [
                "message" => "Área actualizada exitosamente.",
                "data"    => $area,
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "message" => "Área con ID $id no encontrada!",
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
            $area = Areas::findOrFail($id);

            $fields = [];
            if (isset($data['nombreArea'])) {
                $fields['nombreArea'] = $data['nombreArea'];
            }
            if (isset($data['descripcionArea'])) {
                $fields['descripcionArea'] = $data['descripcionArea'];
            }

            if (empty($fields)) {
                throw new Exception("No se han enviado campos para actualizar.", 400);
            }

            $area->update($fields);

            return [
                "message" => "Área actualizada exitosamente.",
                "data"    => $area,
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "message" => "Área con ID $id no encontrada!",
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
    public function deleteArea($id): array
    {
        try {
            $area = Areas::findOrFail($id);
            $area->delete();

            return [
                "message" => "Área eliminada exitosamente",
                "status"  => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                "message" => "Área con ID $id no encontrada!",
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
