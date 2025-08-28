<?php
namespace App\UseCases\Vehiculos;

use App\Models\Interfaces\Vehiculos\IVehiculoService;
use App\Models\Interfaces\Vehiculos\IVehiculoUseCase;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class VehiculosUseCase implements IVehiculoUseCase
{
    protected IVehiculoService $VehiculoService;

    public function __construct(IVehiculoService $VehiculoService)
    {
        $this->VehiculoService = $VehiculoService;
    }

    // usecase post
    public function handleCreateVehiculo(array $data): array
    {
        $validator = Validator::make($data, [
            'marcaVehiculo'       => 'required|string|max:155',
            'placa'               => 'required|string|max:6|unique:vehiculos,placa',
            'tipoVehiculo'        => [
                'required',
                Rule::in(['A1','A2','B1','B2','B3','C1','C2','C3']),
            ],
            'capacidad'           => 'required|string|max:200',
            'estadoVehiculo'      => [
                'sometimes',
                Rule::in(['disponible','asignado','en_ruta','mantenimiento','fuera_de_servicio']),
            ],
            'ultimoMantenimiento' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        return $this->VehiculoService->createVehiculo($data);
    }

    // usecase Patch, editar informacion
    public function handleUpdateVehiculo(string $idOrPlaca, array $data)
    {
        $validator = Validator::make($data, [
            'marcaVehiculo'       => 'sometimes|string|max:155',
            'placa'               => [
                'sometimes',
                'string',
                'max:6',
                Rule::unique('vehiculos', 'placa')->ignore($idOrPlaca, 'idVehiculo'),
            ],
            'tipoVehiculo'        => [
                'sometimes',
                Rule::in(['A1','A2','B1','B2','B3','C1','C2','C3']),
            ],
            'capacidad'           => 'sometimes|string|max:200',
            'estadoVehiculo'      => [
                'sometimes',
                Rule::in(['disponible','asignado','en_ruta','mantenimiento','fuera_de_servicio']),
            ],
            'ultimoMantenimiento' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        return $this->VehiculoService->updateVehiculo($idOrPlaca, $data);
    }
}