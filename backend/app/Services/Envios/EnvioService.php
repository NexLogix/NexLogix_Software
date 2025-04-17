<?php
namespace App\Services\Envios;

use App\Models\Envios;
use App\Models\Interfaces\Envios\IEnviosService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class EnvioService implements IEnviosService
{
    public function getAllEnvios(): array
    {
        try {
            $envios = Envios::all();
            if ($envios->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay envios registrados',
                    'status' => 404
                ];
            }
            return [
                'success' => true,
                'data' => $envios,
                'message' => 'Envios obtenidas exitosamente',
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener el envio: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
    public function getEnvioById(int $id): array
    {
        try {
            $envio = Envios::findOrFail($id);
            return [
                'success' => true,
                'data' => $envio,
                'message' => 'Envio no encontrado',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "El envio con ID $id no fue encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener el envio: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
    public function createEnvio(array $data): array
    {
        try {
            $envio = Envios::create([
                'nombreArea' => $data['nombreArea'],
                'descripcionArea' => $data['descripcionArea'] ?? null,
            ]);
            return [
                'success' => true,
                'data' => $envio,
                'message' => 'El Envio ha sido creado exitosamente',
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
    public function updateSpecificFields(int $id, array $data): array{

    }
    public function deleteEnvio(int $id): array{

    }
}
