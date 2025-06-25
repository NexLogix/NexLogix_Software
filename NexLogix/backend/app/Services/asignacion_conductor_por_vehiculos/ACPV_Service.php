<?php
namespace App\Services\Asignacion_Conductor_Por_Vehiculos;

use App\Models\asignacion_conductor_por_vehiculos;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class ACPV_Service
{
    public function showAll_ACPV()
    {
        try {
            $ACPV = asignacion_conductor_por_vehiculos::with('conductor.usuario', 'vehiculo')->get();
            if ($ACPV->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay cehiculos registrados',
                    'status' => 404
                ];
            }

            $info_ACPV = $ACPV->map(function ($asignacion) {
                return [
                    'idAsignacion' => $asignacion->idAsignacion,
                    'fecha_asignacion_vehiculo' => $asignacion->fecha_asignacion_vehiculo,
                    'fecha_entrega_vehiculo' => $asignacion->fecha_entrega_vehiculo,
                    'conductor' => $asignacion->conductor ? [
                        'licencia' => $asignacion->conductor->licencia,
                        'tipoLicencia' => $asignacion->conductor->tipoLicencia,
                        'vigenciaLicencia' => $asignacion->conductor->vigenciaLicencia,
                        'estado' => $asignacion->conductor->estado,
                        'usuario' => $asignacion->conductor->usuario ? [
                            'email' => $asignacion->conductor->usuario->addArrayOfWheres,
                            'nombreCompleto' => $asignacion->conductor->usuario->nombreCompleto,
                            'documentoIdentidad' => $asignacion->conductor->usuario->documentoIdentidad,
                        ] : null
                    ] : null,
                    'vehiculo' => $asignacion->vehiculo ? [
                        'idVehiculo' => $asignacion->vehiculo->idVehiculo,
                        'placa' => $asignacion->vehiculo->placa,
                        'marca' => $asignacion->vehiculo->marca,
                        'modelo' => $asignacion->vehiculo->modelo
                    ] : null
                ];
            });

            return [
                'success' => true,
                'message' => 'Lista de vehiculos:',
                'data' => $info_ACPV,
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

    public function showBySearching_ACPV(array $data)
    {
        $ACPV = asignacion_conductor_por_vehiculos::with(
            'conductor.usuario.estado',
            'vehiculo')
            ->findOrFail($data);
        if (!$ACPV) {
            return [
                'success' => false,
                'message' => 'No se encontró la asignación de conductor por vehículo',
                'status' => 404
            ];
        }

        $ACPV =  [
            'idAsignacion' => $ACPV->idAsignacion,
            'fecha_asignacion_vehiculo' => $ACPV->fecha_asignacion_vehiculo,
            'fecha_entrega_vehiculo' => $ACPV->fecha_entrega_vehiculo,
            'conductor' => $ACPV->conductor ? [
                'licencia' => $ACPV->conductor->licencia,
                'tipoLicencia' => $ACPV->conductor->tipoLicencia,
                'vigenciaLicencia' => $ACPV->conductor->vigenciaLicencia,
                'estado' => $ACPV->conductor->estado,
                'usuario' => $ACPV->conductor->usuario ? [
                    'email' => $ACPV->conductor->usuario->email,
                    'nombreCompleto' => $ACPV->conductor->usuario->nombreCompleto,
                    'documentoIdentidad' => $ACPV->conductor->usuario->documentoIdentidad,
                    'userStatus' => $ACPV->conductor->usuario->estado->estado ?? null,
                ] : null
            ] : null,
            'vehiculo' => $ACPV->vehiculo ? [
                'idVehiculo' => $ACPV->vehiculo->idVehiculo,
                'placa' => $ACPV->vehiculo->placa,
                'marca' => $ACPV->vehiculo->marca,
                'modelo' => $ACPV->vehiculo->modelo
            ] : null
        ];
           return [
            'success' => true,
            'message' => 'Asignación de conductor por vehículo encontrada',
            'data' => $ACPV,
            'status' => 200
        ];

    }

    // POST
    public function create_ACPV(array $data)
    {
        try {
            $asignacion = asignacion_conductor_por_vehiculos::create($data);
            return [
                'success' => true,
                'data' => $asignacion,
                'message' => 'Asignación creada exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear asignación: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
                'status' => 500
            ];
        }
    }

    public function update_ACPV(int $id, array $data)
    {
        try {
            $asignacion = asignacion_conductor_por_vehiculos::findOrFail($id);
            $asignacion->update($data);
            return [
                'success' => true,
                'data' => $asignacion,
                'message' => 'Asignación actualizada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Asignación con ID $id no encontrada",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar asignación: ' . $e->getMessage(),
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

    public function delete_ACPV(int $id)
    {
        try {
            $asignacion = asignacion_conductor_por_vehiculos::findOrFail($id);
            $asignacion->delete();
            return [
                'success' => true,
                'message' => 'Asignación eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Asignación con ID $id no encontrada",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar asignación: ' . $e->getMessage(),
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