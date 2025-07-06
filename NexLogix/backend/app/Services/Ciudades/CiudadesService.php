<?php
namespace App\Services\Ciudades;

use App\Models\Ciudades;
use App\Models\Interfaces\Ciudades\ICiudadesService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class CiudadesService implements ICiudadesService
{
    // GET
    public function getAllCiudades()
    {
        try {
            $ciudad = Ciudades::all();
            if ($ciudad->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay Ciudades registradas',
                    'status' => 404
                ];
            }
            return [
                'success' => true,
                'message' => 'Lista de Ciudades:',
                'data' => $ciudad,
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener Ciudad ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // GET BY ID
    public function getCiudadById(string $value): array
    {
        try {
            $ciudad = Ciudades::where('idCiudad',$value)
                ->orWhere('nombreCiudad', $value)
                ->firstOrFail();
            return [
                'success' => true,
                'data' => $ciudad,
                'message' => 'Ciudad encontrada',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Ciudad con ID $value no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la Ciudad ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // POST
    public function createCiudad(array $data): array
    {
        try {
            $ciudad = Ciudades::create($data);
            return [
                'success' => true,
                'data' => $ciudad,
                'message' => 'Ciudad creada exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Ciudad ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Ciudad ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    //PUT

    public function updateCiudad(string $value, array $data)
    {
        try {
            $ciudad = Ciudades::findOrFail($value);

            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            $ciudad->update($data);
            return [
                'success' => true,
                'message' => 'La Ciudad ha sido actualizada',
                'data' => $ciudad,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Ciudades con ID $value no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Ciudad ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
    // PATCH
    public function updateSpecificSectionCiudad(string $value, array $data): array
    {
        try {
            $ciudad = Ciudades::findOrFail($value);

            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            $ciudad->update($data);
            return [
                'success' => true,
                'message' => 'Ciudad actualizada pero parcialmente',
                'data' => $ciudad,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Ciudades con ID $value no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Ciudad ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // DELETE
    public function deleteCiudad(string $value): array
    {
        try {
            $ciudad = Ciudades::findOrFail($value); // Busca
            $ciudad->delete();
            return [
                'success' => true,
                'message' => 'Ciudad eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Ciudad con ID $value no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Ciudad ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Ciudad ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}

// COMENTARIO PARA HACER MERGE ENTRE CIUDADES Y DEVELOP
