<?php
namespace App\Services\Rutas;

use App\Models\Interfaces\Rutas\IRutasService;
use App\Models\Rutas;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class RutasService implements IRutasService
{
    function getAllRutas()
    {
        try {
            $rutas = Rutas::with('ciudades')->get();
            // si esa vacia la peticion retorna en esta excepcion
            if ($rutas->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay Rutas registradas',
                    'status' => 404
                ];
            }
            // si es verdadera, muestra las listas
            return [
                'success' => true,
                'message' => 'Lista de Rutas:',
                'data' => $rutas,
                'status' => 200
            ];
        // excepcion de la conexion de la base de datos
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    function getRutaByID(int $id): array
    {
        try {
            // busca por ID, por eso usamos find or fail
            $ruta = Rutas::with('ciudades')->findOrFail($id);
            return [
                'success' => true,
                'data' => $ruta,
                'message' => 'Ruta encontrada',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Ruta con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    function createRuta(array $data): array
    {
        try {
            $ruta = Rutas::create($data);
            return [
                'success' => true,
                'data' => $ruta,
                'message' => 'Ruta creada exitosamente',
                'status' => 201
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    function updateRuta(array $data, int $id): array
    {
        try {
            $ruta = Rutas::findOrFail($id);

            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            $ruta->update($data);
            return [
                'success' => true,
                'message' => 'Ruta actualizada pero parcialmente',
                'data' => $ruta,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Ruta con ID $id no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    function deleteRuta(int $id): array
    {
        try {
            $ruta = Rutas::findOrFail($id); // Busca
            $ruta->delete();
            return [
                'success' => true,
                'message' => 'Ciudad eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Ruta con ID $id no encontrada",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Ciudad ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

}


