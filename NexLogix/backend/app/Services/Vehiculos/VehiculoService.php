<?php
namespace App\Services\Vehiculos;

use App\Models\Interfaces\Vehiculos\IVehiculoService;
use App\Models\Vehiculos;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class VehiculoService implements IVehiculoService
{

    // service HTTP GET
    public function getAllVehiculos(): array
    {
        try {
            $vehiculo = Vehiculos::all();
            if ($vehiculo->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay cehiculos registrados',
                    'status' => 404
                ];
            }
            return [
                'success' => true,
                'message' => 'Lista de vehiculos:',
                'data' => $vehiculo,
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener el vehiculo ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }


    // SERVICE HTTP GET BY ID
    public function getVehiculoById(string $value): array
    {
        try {
            $Vehiculo = Vehiculos::where('idVehiculo', $value)
                ->orWhere('placa', 'like', "%{$value}%")
                ->firstOrFail();
            return [
                'success' => true,
                'message' => 'Vehiculo encontrado',
                'data' => $Vehiculo,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Vehiculo con ID $value no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener el Vehiculo ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

     // SERVICE HTTP POST
    public function createVehiculo(array $data): array
    {
        try {
            $vehiculo = Vehiculos::create($data);
                return [
                'success' => true,
                'data' => $vehiculo,
                'message' => 'Vehiculo creado exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear el vehiculo ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear el vehiculo ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    //patch service
    public function updateVehiculo(string $value, array $data): array
    {
        try {
            $vehiculo = Vehiculos::where('idVehiculo', $value)
                ->orWhere('placa', $value)
                ->firstOrFail();

            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            $vehiculo->update($data);

            return [
                'success' => true,
                'message' => 'Vehículo actualizado correctamente',
                'data' => $vehiculo,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Vehículo con valor $value no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar el vehículo: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }


     // SERVICE HTTP DELETE
    public function deleteVehiculo(string $value): array
    {
        try {
            $vehiculo = Vehiculos::where('idVehiculo', $value)
                ->orWhere('placa', $value)
                ->firstOrFail();

            $vehiculo->delete();
    
            return [
                'success' => true,
                'message' => 'Vehículo eliminado correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Vehículo con valor $value no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar el vehículo: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

}
