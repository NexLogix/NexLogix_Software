<?php
namespace App\Services\Asignacion_Rutas_Por_Ciudades;

use App\Models\Asignacion_Rutas_Por_Ciudades;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class ARPC_Service
{
    public function getAll(): array
    {
        try {
            $ARPC = Asignacion_Rutas_Por_Ciudades::all();
            if ($ARPC->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay Asignaciones de Rutas por Ciudades registradas',
                    'status' => 404
                ];
            }
            return [
                'success' => true,
                'message' => 'Lista de Asignaciones de Rutas por Ciudades:',
                'data' => $ARPC,
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener las Asignaciones de Rutas por Ciudades: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // SERVICE HTTP GET BY ID
    public function getById(string $value): array
    {
        try {
            $ARPC = Asignacion_Rutas_Por_Ciudades::where('idasignacion_rutas_por_ciudades', $value)->firstOrFail();
            return [
                'success' => true,
                'message' => 'Asignación de Rutas por Ciudades encontrada',
                'data' => $ARPC,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Asignación de Rutas por Ciudades con ID $value no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la Asignación de Rutas por Ciudades: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // SERVICE HTTP POST
    public function create(array $data): array
    {
        try {
            $ARPC = Asignacion_Rutas_Por_Ciudades::create($data);
            return [
                'success' => true,
                'data' => $ARPC,
                'message' => 'Asignación de Rutas por Ciudades creada exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Asignación de Rutas por Ciudades: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Asignación de Rutas por Ciudades: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // PATCH SERVICE
    public function update(string $value, array $data): array
    {
        try {
            $ARPC = Asignacion_Rutas_Por_Ciudades::where('idasignacion_rutas_por_ciudades', $value)->firstOrFail();

            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar la Asignación de Rutas por Ciudades',
                    'status' => 400
                ];
            }

            $ARPC->update($data);

            return [
                'success' => true,
                'message' => 'Asignación de Rutas por Ciudades actualizada correctamente',
                'data' => $ARPC,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Asignación de Rutas por Ciudades con valor $value no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Asignación de Rutas por Ciudades: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // SERVICE HTTP DELETE
    public function delete(string $value): array
    {
        try {
            $ARPC = Asignacion_Rutas_Por_Ciudades::where('idasignacion_rutas_por_ciudades', $value)->firstOrFail();

            $ARPC->delete();

            return [
                'success' => true,
                'message' => 'Asignación de Rutas por Ciudades eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Asignación de Rutas por Ciudades con valor $value no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Asignación de Rutas por Ciudades: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}
