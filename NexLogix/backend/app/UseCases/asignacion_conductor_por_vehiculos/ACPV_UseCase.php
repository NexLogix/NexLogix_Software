<?php
namespace App\UseCases\asignacion_conductor_por_vehiculos;

use App\Services\Asignacion_Conductor_Por_Vehiculos\ACPV_Service;
use Illuminate\Support\Facades\Validator;
use App\UseCases\asignacion_conductor_por_vehiculos\VerificarAsignacionVehiculosConConductores;

class ACPV_UseCase
{
    protected ACPV_Service $service;

    public function __construct(ACPV_Service $service)
    {
        $this->service = $service;
    }

    // CREATE
    public function handleCreateACPV(array $data): array
    {
        // 1) Reglas de negocio
        $verificacion_data = VerificarAsignacionVehiculosConConductores::verificarRequisitos($data);
        if (! $verificacion_data['success']) {
            return $verificacion_data;
        }

        // 2) Validación de esquema
        $validator = Validator::make($data, [
            'fecha_entrega_vehiculo'    => 'nullable|date_format:Y-m-d H:i:s',
            'idConductor'               => 'required|integer|exists:conductores,idConductor',
            'idVehiculo'                => 'required|integer|exists:vehiculos,idVehiculo',

        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación en asignación',
                'errors'  => $validator->errors(),
                'status'  => 422,
            ];
        }

        // 3) Persistir en DB
        return $this->service->create_ACPV($validator->validated());
    }

    // UPDATE
    public function handleUpdateACPV(string $id, array $data): array
    {
        // 1) Reglas de negocio (usamos mismo verificador, pero pasamos id incluido)
        $requisito = VerificarAsignacionVehiculosConConductores::verificarRequisitos(
            array_merge(['idConductor' => $data['idConductor'] ?? null, 'idVehiculo' => $data['idVehiculo'] ?? null], $data)
        );
        if (! $requisito['success']) {
            return $requisito;
        }

        // 2) Validación de esquema (permitimos sólo campos válidos)
        $validator = Validator::make($data, [
            'fecha_asignacion_vehiculo' => 'sometimes|date_format:Y-m-d H:i:s',
            'fecha_entrega_vehiculo'    => 'sometimes|date_format:Y-m-d H:i:s',
            'idConductor'               => 'sometimes|integer|exists:conductores,idConductor',
            'idVehiculo'                => 'sometimes|integer|exists:vehiculos,idVehiculo',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación en actualización',
                'errors'  => $validator->errors(),
                'status'  => 422,
            ];
        }

        // 3) Persistir cambios
        return $this->service->update_ACPV($id, $validator->validated());
    }
}