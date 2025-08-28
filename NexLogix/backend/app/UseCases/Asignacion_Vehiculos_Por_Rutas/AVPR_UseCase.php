<?php
namespace App\UseCases\Asignacion_Vehiculos_Por_Rutas;

// IMPORTACIONES
use App\Services\Asignacion_Vehiculos_Por_Rutas\AVPR_Service;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AVPR_UseCase
{
    // Propiedad protegida para almacenar la instancia del servicio de asignación de rutas
    protected AVPR_Service $AVPRService;

    // Constructor que inyecta la dependencia del servicio de asignación de rutas
    public function __construct(AVPR_Service $AVPRService )
    {
        $this->AVPRService = $AVPRService;
    }

    //  POST
    // Caso de uso para crear una nueva asignación de ruta
    public function handleCreate_AVPR(array $data): array
    {
        // Validación de los datos recibidos, asegurando que los ID existan en las tablas correspondientes
        $validator = Validator::make($data, [
            'fechaAsignacionFinalizacion' => 'nullable|date|after:fechaAsignacionInicio',
            'idVehiculo' => 'required|integer|exists:vehiculos,idVehiculo',
            'idRuta' => 'required|integer|exists:rutas,idRuta',
        ]);

        // Si la validación falla, retorna un arreglo con los errores y un estado HTTP 422
        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        // Si todo es válido, delega la creación al servicio correspondiente
        return $this->AVPRService->create_AVPR($data);
    }

    // PATCH
    // Caso de uso para actualizar parcialmente una asignación de ruta existente
    public function handleUpdate_AVPR(int $id, array $data)
    {
        // Validación condicional para permitir la edición solo de los campos presentes
        $validator = Validator::make($data, [
            'fechaAsignacionInicio' => 'sometimes|date',
            'fechaAsignacionFinalizacion' => 'sometimes|nullable|date|after:fechaAsignacionInicio',
            'idVehiculo' => [
                'sometimes',
                'integer',
                Rule::exists('vehiculos', 'idVehiculo'),
                Rule::unique('Asignacion_Vehiculos_Por_Rutas', 'idVehiculo')
                    ->ignore($id, 'idAsignacionVehiculoRuta')
            ],
            'idRuta' => [
                'sometimes',
                'integer',
                Rule::exists('rutas', 'idRuta'),
                Rule::unique('Asignacion_Vehiculos_Por_Rutas', 'idRuta')
                    ->ignore($id, 'idAsignacionVehiculoRuta')
            ],
        ]);

        // Si la validación falla, retorna los errores y un estado HTTP 422
        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        // Si pasa la validación, se llama al método de actualización del servicio
        return $this->AVPRService->update_AVPR($id, $data);
    }
}
