<?php

use App\Models\AsignacionRutas;
use App\Models\Interfaces\AsignacionRutas\IAsignacionRutasService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class AsignacionRutaService implements IAsignacionRutasService
{
    // GET GENERAL SERVICE
    public function getAll_AR()
    {
        try {
            $A_R = AsignacionRutas::with('vehiculo', 'ruta')->get();
            if ($A_R->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay Asignacion de Rutases registradas',
                    'status' => 404
                ];
            }
            return [
                'success' => true,
                'message' => 'Lista de Asignacion de Rutas:',
                'data' => $A_R,
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener Asignacion de Rutas ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // GET BY ID SERVICE
    public function get_AR_ById(int $id): array
    {
        try {
                $A_R = AsignacionRutas::with('vehiculo', 'ruta')->find($id);            return [
                'success' => true,
                'data' => $A_R,
                'message' => 'Asignacion de Rutas encontrada',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Asignacion de Ruta con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la Asignacion de Rutas ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // POST SERVICE
    public function create_AR(array $data): array
    {
        try {
            $A_R = AsignacionRutas::create($data);
            return [
                'success' => true,
                'data' => $A_R,
                'message' => 'Asignacion de Rutas creada exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Asignacion de Rutas ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Asignacion de Rutas ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // PATCH | EDIT-UPDATE SERVICE
    public function update_AR(int $id, array $data)
    {
        try {
            $A_R = AsignacionRutas::findOrFail($id);

            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            $A_R->update($data);
            return [
                'success' => true,
                'message' => 'Asignacion de Rutas actualizada',
                'data' => $A_R,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Asignacion de Ruta con ID $id no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Asignacion de Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // DELETE SERVICE
    public function delete_AR(int $id): array
    {
        try {
            $A_R = AsignacionRutas::findOrFail($id); // Busca
            $A_R->delete();
            return [
                'success' => true,
                'message' => 'Asignacion de Ruta eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Asignacion de Ruta con ID $id no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Asignacion de Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Asignacion de Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}
