<?php
namespace App\UseCases\asignacion_conductor_por_vehiculos;

use App\Models\Conductores;
use App\Models\Vehiculos;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class VerificarAsignacionVehiculosConConductores
{
    /**
     * Verifica todos los requisitos para poder asignar un conductor a un vehículo.
     *
     * @param  array  $data  ['idConductor' => int, 'idVehiculo' => int]
     * @return array        ['success' => bool, 'message' => string, 'status' => int]
     */
    public static function verificarRequisitos(array $data): array
    {
        try {
            // 1) Datos mínimos
            if (empty($data['idConductor']) || empty($data['idVehiculo'])) {
                return [
                    'success' => false,
                    'message' => 'Faltan datos requeridos: idConductor o idVehiculo',
                    'status'  => 400,
                ];
            }

            // 2) Buscar conductor y usuario asociado
            $conductor = Conductores::with('usuario.estado')->find($data['idConductor']);
            if (! $conductor) {
                return [
                    'success' => false,
                    'message' => 'Conductor no encontrado',
                    'status'  => 404,
                ];
            }
            // 2a) Usuario activo
            if (
                !isset($conductor->usuario) ||
                !isset($conductor->usuario->estado) ||
                $conductor->usuario->estado->estado !== 'ACTIVO'
            ) {
                return [
                    'success' => false,
                    'message' => 'Usuario del conductor no está activo',
                    'status'  => 400,
                ];
            }
            // 2b) Licencia vigente
            if (now()->gt($conductor->vigenciaLicencia)) {
                return [
                    'success' => false,
                    'message' => 'La licencia del conductor está expirada',
                    'status'  => 400,
                ];
            }

            // 3) Buscar vehículo
            $vehiculo = Vehiculos::find($data['idVehiculo']);
            if (! $vehiculo) {
                return [
                    'success' => false,
                    'message' => 'Vehículo no encontrado',
                    'status'  => 404,
                ];
            }

            // 3a) Estado disponible
            if (! in_array($vehiculo->estadoVehiculo, ['disponible','asignado','en_ruta'])) {
                return [
                    'success' => false,
                    'message' => "El vehículo está en estado “{$vehiculo->estadoVehiculo}” y no puede asignarse",
                    'status'  => 400,
                ];
            }

            // 4) Compatibilidad de licencias
            if (! static::licenciaCompatible($conductor->tipoLicencia, $vehiculo->tipoVehiculo)) {
                return [
                    'success' => false,
                    'message' => "Tipo de licencia “{$conductor->tipoLicencia}” del conductor no compatible con el vehículo, ya que tiene licencia “{$vehiculo->tipoVehiculo}”",
                    'status'  => 400,
                ];
            }

            // 5) Todo OK
            return [
                'success' => true,
                'message' => 'Requisitos cumplidos',
                'status'  => 200,
            ];
        }
        catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => 'Recurso no encontrado: ' . $e->getMessage(),
                'status'  => 404,
            ];
        }
        catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error de verificación: ' . $e->getMessage(),
                'status'  => 500,
            ];
        }
    }

    /**
     * Indica si el tipo de licencia del conductor cubre
     * el nivel requerido por el tipo de vehículo.
     */
    private static function licenciaCompatible(string $lic, string $veh): bool
    {
        $niveles = [
            'A1' => 1, 'A2' => 2,
            'B1' => 3, 'B2' => 4, 'B3' => 5,
            'C1' => 6, 'C2' => 7, 'C3' => 8,
        ];
        return ($niveles[$lic] ?? 0) >= ($niveles[$veh] ?? PHP_INT_MAX);
    }
}
