<?php
namespace App\UseCases\Rutas;

use App\Models\Interfaces\Rutas\IRutasService;
use App\Models\Interfaces\Rutas\IRutasUseCase;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

// Clase que implementa la lógica de negocio para las rutas
// Se comunica con el servicio que interactúa con la base de datos
class RutasUseCase implements IRutasUseCase
{
    // Se declara la variable protegida que almacenará la instancia del servicio de rutas
    protected IRutasService $rutas_service;

    // Constructor de la clase que recibe el servicio como dependencia
    // Esto permite aplicar inyección de dependencias y facilita el mantenimiento
    public function __construct(IRutasService $rutas_service)
    {
        // Se asigna la instancia recibida a la variable protegida
        $this->rutas_service = $rutas_service;
    }

    // Método para manejar la creación de una nueva ruta
    // Valida los datos requeridos antes de pasar al servicio
    function handleCreateRuta(array $data): array
    {
        // Se valida que el nombre de la ruta sea obligatorio, de tipo string y con máximo 255 caracteres
        // Se valida que las horas estén en formato Y-m-d H:i:s
        // Se valida que el id de ciudad exista en la tabla 'ciudades' bajo la columna 'idCiudad'
        $validator = Validator::make($data, [
            "nombreRuta"       => "required|string|max:255|unique:rutas,nombreRuta",
            "horaInicioRuta"   => "required|date_format:Y-m-d H:i:s",
            "descripcion"      => "required|string",

            "estadoRuta"    => [
                "nullable",
                Rule::in(['EN_BODEGA','EN_RUTA','EN_RECOGIDA','EN_ENTREGA','EN_DEVOLUCIONES']),
            ],
            "novedades" => "nullable|string",
        ]);

        // Si la validación falla, se retorna un array con los errores
        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors'  => $validator->errors(),
                'status'  => 422
            ];
        }

        // Si la validación es exitosa, se llama al servicio para crear la ruta
        return $this->rutas_service->createRuta($data);
    }

    // Método para manejar la actualización de una ruta existente
    // Los campos son opcionales ('sometimes'), pero si vienen deben cumplir con su formato
    function handleUpdateRuta(string $value, array $data): array
    {
        // Validaciones condicionales: si el campo viene, se valida su tipo y formato
        $validator = Validator::make($data, [
            "nombreRuta" => [
                'sometimes', 'string', 'max:255',
                    Rule::unique('rutas', 'nombreRuta')->ignore($value, 'idRuta')
                ],
            "horaInicioRuta"        => "sometimes|date_format:Y-m-d H:i:s",
            "horaFinalizacionRuta"       => "sometimes|date_format:Y-m-d H:i:s",
            "estadoRuta"     => [
                "sometimes",
                Rule::in(['EN_BODEGA','EN_RUTA','EN_RECOGIDA','EN_ENTREGA','EN_DEVOLUCIONES']),
            ],
            "novedades" => "sometimes|string",
        ]);

        // Si hay errores de validación, se retornan en la respuesta
        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors'  => $validator->errors(),
                'status'  => 422
            ];
        }

        // Si la validación es correcta, se llama al servicio para actualizar la ruta
        return $this->rutas_service->updateRuta($value, $data);
    }
}
