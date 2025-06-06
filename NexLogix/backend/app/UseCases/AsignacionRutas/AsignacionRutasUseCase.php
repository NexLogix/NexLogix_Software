<?php
namespace App\UseCases\AsignacionRutas;

// IMPORTACIONES
use App\Models\Interfaces\AsignacionRutas\IAsignacionRutasService;
use App\Models\Interfaces\AsignacionRutas\IAsignacionRutasUseCase;
use Illuminate\Support\Facades\Validator;

class AsignacionRutasUseCase implements IAsignacionRutasUseCase
{
    // Propiedad protegida para almacenar la instancia del servicio de asignación de rutas
    protected IAsignacionRutasService $Asignacion_Rutas_Service;

    // Constructor que inyecta la dependencia del servicio de asignación de rutas
    public function __construct(IAsignacionRutasService $Asignacion_Rutas_Service )
    {
        $this->Asignacion_Rutas_Service = $Asignacion_Rutas_Service;
    }

    // Caso de uso para crear una nueva asignación de ruta
    public function handleCreate_AR(array $data): array
    {
        // Validación de los datos recibidos, asegurando que los ID existan en las tablas correspondientes
        $validator = Validator::make($data, [
            'idVehiculo' => 'required|exists:vehiculos,idVehiculo',
            'idRuta' => 'required|exists:rutas,idRuta',
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
        return $this->Asignacion_Rutas_Service->create_AR($data);
    }

    // Caso de uso para actualizar parcialmente una asignación de ruta existente
    public function handleUpdate_AR(int $id, array $data)
    {
        // Validación condicional para permitir la edición solo de los campos presentes
        $validator = Validator::make($data, [
            'idVehiculo' => 'sometimes|exists:vehiculos,idVehiculo',
            'idRuta' => 'sometimes|exists:rutas,idRuta',
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
        return $this->Asignacion_Rutas_Service->update_AR($id, $data);
    }
}