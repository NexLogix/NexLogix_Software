<?php

namespace App\Services\Envios;

use App\Models\Envios;
use App\Models\Interfaces\Envios\IEnviosService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class EnvioService implements IEnviosService
{
    //SERVICE GET
    public function getAllEnvios(): array
    {
        try {
            $envios = Envios::all();
            if ($envios->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay envíos registrados',
                    'status' => 404
                ];
            }
            return [
                'success' => true,
                'message' => 'Lista de envios',
                'data' => $envios,
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener envíos: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // GET BY ID
    public function getEnvioById(int $id): array
    {
        try {
            $envio = Envios::findOrFail($id);
            return [
                'success' => true,
                'data' => $envio,
                'message' => 'Envío encontrado',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // POST
    public function createEnvio(array $data): array
    {
        try {
            $envio = Envios::create($data);
            return [
                'success' => true,
                'data' => $envio,
                'message' => 'Envío creado exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear envío: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    //PUT
    public function updateEnvio(int $id, array $data): array
    {
        try {
            $envio = Envios::findOrFail($id);
            $envio->update($data);
            return [
                'success' => true,
                'data' => $envio,
                'message' => 'Envío actualizado completamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar envío: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // PATCH
    public function updateSpecificSection(int $id, array $data): array
    {
        try {
            $envio = Envios::findOrFail($id);

            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            $envio->update($data);
            return [
                'success' => true,
                'message' => 'Envío actualizado parcialmente',
                'data' => $envio,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }


    // DELETE
    public function deleteEnvio(int $id): array
    {
        try {
            $envio = Envios::findOrFail($id);
            $envio->delete();
            return [
                'success' => true,
                'message' => 'Envío eliminado correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar envío: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}
