<?php

namespace App\Services\Areas;

use App\Models\Areas;
use App\Models\Interfaces\Areas\IAreaService;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AreasService implements IAreaService
{
    // GET GENERAL
    public function getAll(): array
    {
        try {
            $areas = Areas::all();
            if ($areas->isEmpty()) { // si esta vacio muestra el estado 404
                return [
                    'success' => false,
                    'message' => 'No hay áreas registradas',
                    'status' => 404
                ];
            }
            // get exitoso
            return [
                'success' => true,
                'data' => $areas,
                'message' => 'Áreas obtenidas exitosamente',
                'status' => 200
            ];
        } catch (Exception $e) { // excepcion si la DB no se conecto
            return [
                'success' => false,
                'message' => 'Error al obtener áreas: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // GET BY ID
    public function getAreaById(int $id): array
    {
        try {
            $area = Areas::findOrFail($id); // se encuentra ID o sino falla
            return [
                'success' => true,
                'data' => $area,
                'message' => 'Área encontrada',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Área con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener área: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // POST SERVICE
    public function createArea(array $data): array
    {
        try {
            $area = Areas::create([ // se crea la Area Aqui
                'nombreArea' => $data['nombreArea'],
                'descripcionArea' => $data['descripcionArea'] ?? null,
            ]);
            return [
                'success' => true,
                'data' => $area,
                'message' => 'Área creada exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear área: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
                'status' => $e->getCode() ?: 500
            ];
        }
    }

    // PUT SERVICE
    public function updateArea(int $id, array $data): array
    {
        try {
            $area = Areas::findOrFail($id); // primero se busca el area por ID
            $area->update([
                'nombreArea' => $data['nombreArea'],
                'descripcionArea' => $data['descripcionArea'],
            ]);
            return [
                'success' => true,
                'data' => $area,
                'message' => 'Área actualizada completamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Área con ID $id no encontrada",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar área: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error inesperado: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // PATCH SERVICE
    public function updateSpecificSection(int $id, array $data): array
    {
        try {
            $area = Areas::findOrFail($id);
            $fields = []; // arrego vacio
            if (isset($data['nombreArea'])) {
                $fields['nombreArea'] = $data['nombreArea'];
            }
            if (isset($data['descripcionArea'])) {
                $fields['descripcionArea'] = $data['descripcionArea'];
            }
            if (empty($fields)) {
                throw new Exception('No se proporcionaron campos para actualizar', 400);
            }
            $area->update($fields); // metodo para actualizar, pero los fields que esten ahi
            return [
                'success' => true,
                'data' => $area,
                'message' => 'Área actualizada parcialmente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Área con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
                'status' => $e->getCode() ?: 500
            ];
        }
    }

    // DELETE SERVICE
    public function deleteArea(int $id): array
    {
        try {
            $area = Areas::findOrFail($id);
            $area->delete(); // metodo para eliminar
            return [
                'success' => true,
                'message' => 'Área eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Área con ID $id no encontrada",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar área: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error inesperado: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}
