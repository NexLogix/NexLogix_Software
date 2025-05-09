<?php
namespace App\UseCases\Recogidas;

use App\Models\Interfaces\Recogidas\IRecogidaService;
use App\Models\Interfaces\Recogidas\IRecogidaUseCase;
use Illuminate\Support\Facades\Validator;

class RecogidaUseCase implements IRecogidaUseCase
{
    protected IRecogidaService $recogida_service;

    public function __construct(IRecogidaService $recogida_service)
    {
        $this->recogida_service = $recogida_service;
    }

    // POST USE CASE
    public function handleCreateRecogida(array $data): array
    {
        $validator = Validator::make($data, [
            "fechaRecogidaSeleccionada"  => "required|date",
            "fechaRecogidaFinal"         => "sometimes|date",
            "direccionRecogida"          => "required|string|max:255",
            'idCiudad'                   => 'required|numeric|min:1|exists:ciudades,idCiudad',
        ]);

        if ($validator->fails()) {
            return [
                'success'   => false,
                'message'   => 'Errores de validación',
                'errors'    => $validator->errors(),
                'status'    => 422
            ];
        }

        return $this->recogida_service->createRecogida($data);
    }

    // PATCH USE CASE
    public function handleUpdateSpecificSection_R(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            "fechaRecogidaSeleccionada"  => "sometimes|date",
            "fechaRecogidaFinal"         => "sometimes|date",
            "direccionRecogida"          => "sometimes|string|max:255",
            'idCiudad'                   => 'sometimes|numeric|min:1|exists:ciudades,idCiudad',
        ]);

        if ($validator->fails()) {
            return [
                'success'   =>  false,
                'message'   => 'Errores de validación',
                'errors'    =>  $validator->errors(),
                'status'    =>  422
            ];
        }

        return $this->recogida_service->updateSpecificFields_R($id, $data);
    }
}
