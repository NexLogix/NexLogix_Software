<?php
namespace App\UseCases\Rutas;

use App\Models\Interfaces\Rutas\IRutasService;
use App\Models\Interfaces\Rutas\IRutasUseCase;
use Illuminate\Support\Facades\Validator;

class RutasUseCase implements IRutasUseCase
{
    protected IRutasService $rutas_service;
    public function __construct(IRutasService $rutas_service)
    {
        $this->rutas_service = $rutas_service;
    }

    function handleCreateRuta(array $data): array
    {
        $validator = Validator::make($data, [
            "nombreRuta"    => "required|string|max:255",
            "horaEntrada"   => "required|date_format:Y-m-d H:i:s",
            "horaSalida"    => "required|date_format:Y-m-d H:i:s",
            "idCiudad"      => "required|integer|exists:ciudades,idCiudad",
        ]);
        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        return $this->rutas_service->createRuta($data);
    }

    function handleUpdateRuta(array $data, int $id): array
    {
        $validator = Validator::make($data, [
            "nombreRuta"    => "sometimes|string|max:255",
            "horaEntrada"   => "sometimes|date",
            "horaSalida"     => "sometimes|date",
            "idCiudad"      => "sometimes|integer|exists:ciudades,idCiudad",
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        return $this->rutas_service->updateRuta($data, $id);
    }
}
