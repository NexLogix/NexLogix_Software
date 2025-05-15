<?php
namespace App\UseCases\Vehiculos;

use App\Models\Interfaces\Vehiculos\IVehiculoService;
use App\Models\Interfaces\Vehiculos\IVehiculoUseCase;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class VehiculosUseCase implements IVehiculoUseCase
{
    protected IVehiculoService $VehiculoService; // pasamos la interfaz como variable

    // contructor de Interfaz de service Vehiculos
    public function __construct(IVehiculoService $VehiculoService)
    {
        $this->VehiculoService = $VehiculoService;
    }

    // usecase post
    public function handleCreateVehiculo(array $data): array
    {
        $validator = Validator::make($data, [
            'marcaVehiculo' => 'required|string|max:155',
            'tipoVehiculo' => 'required|string|max:100',
            'placa' => 'required|string|max:7|unique:vehiculos,placa', // cuando se crea la entidad, esta debe tener una placa unica.
        ]);

        if ($validator->fails()) {
             return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        // si todo es correcto el use case manda $data al service
        return $this->VehiculoService->createVehiculo($data);
    }

    // usecase Patch, editar informacion
    public function handleUpdateVehiculo(int $id, array $data)
    {
        // uso nuevo con la importacion Rule,
        $validator = Validator::make($data, [
            // La marca del vehículo es un campo opcional y debe ser una cadena de texto con un máximo de 155 caracteres.
            'marcaVehiculo' => 'sometimes|string|max:155',

            // El tipo de vehículo también es opcional, y debe ser una cadena de texto con un máximo de 100 caracteres.
            'tipoVehiculo'  => 'sometimes|string|max:100',

            /*
                La placa es un campo opcional, debe ser una cadena de texto con un máximo
                de 7 caracteres. Además, se valida que la placa sea única en la base de datos.
                Se usa la regla 'unique' de Laravel, la cual garantiza que la placa no esté
                registrada en otro vehículo. Se omite la validación para el vehículo que
                está siendo actualizado mediante 'ignore', para evitar que el vehículo
                con la misma placa, pero mismo ID, cause un error de duplicado.
            */

            'placa' => [
                'sometimes', // Solo valida si el campo está presente.
                'string',    // El campo debe ser una cadena de texto.
                'max:7',     // La longitud máxima del campo es de 7 caracteres (como máximo para las placas).
                Rule::unique('vehiculos', 'placa')->ignore($id, 'idVehiculo'), // Asegura que la placa sea única,
            ],
        ]);

        // Si la validación falla, se retorna un array con la información del error, el 'status' 422 indica un error de validación.
        if ($validator->fails()) {
            return [
                'success' => false,              // Indica que la validación ha fallado.
                'message' => 'Errores de validación', // Mensaje general del error.
                'errors' => $validator->errors(), // Detalle de los errores encontrados.
                'status' => 422                  // Código HTTP para error de validación.
            ];
        }

        // Si la validación es exitosa, se llama al servicio de actualización de vehículos todo se manda por $data con $id
        return $this->VehiculoService->updateVehiculo($id, $data);
    }
}
