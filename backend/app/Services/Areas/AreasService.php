<?php

namespace App\Services\Areas;

use App\Models\Areas;
use App\Models\Interfaces\Areas\IAreaService;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AreasService implements IAreaService
{
    // GET ALL
    public function getAll(): array
    {
        $areas = Areas::all();
        if (!$areas){
            return [
                'success' => false,
                'message' => 'No hay usuarios agregados',
                'status' => 404
            ];
        }
        return [
            'success' => true,
            'data' => $areas,
            'status' => 200
        ];
    }

    // GET BY ID
    public function getAreaById($id): array
    {
        $areas = Areas::findOrFail($id);
        if(!$areas){
            return [
                'success' => false,
                'message' => 'Area no encontrada!',
                'status' => 404
            ];
        }
        return [
            'success' => true,
            'data' => $areas,
            'status' => 200
        ];
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
        $areas = Areas::findOrFail($id);
        if (!$areas) {
            return [
                'success' => false,
                'message' => 'Area no encontrada',
                'status' => 404
            ];
        }
        $areas->update($data);
        return [
            'success' => true,
            'message' => 'Se ha actualizado toda la informacion general del Area correctamente!',
            'data' => $areas,
            'status' => 200
        ];
    }

    // PATCH
    public function updateSpecificSection($id, array $data): array
    {
        $areas = Areas::findOrFail($id);
        if (!$areas) {
            return [
                'success' => false,
                'message' => 'Area no encontrada',
                'status' => 404
            ];
        }
        $areas->update($data);
        return [
            'success' => true,
            'message' => 'Se ha actualizado toda la informacion general del Area correctamente!',
            'data' => $areas,
            'status' => 200
        ];
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
