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
            //se pone este formato date_format:Y-m-d H:i:s ya que en la DB esta como datetime,
            // ejemplo = "fechaRecogidaSeleccionada": "2024-06-17 14:30:00"
            "fechaRecogidaSeleccionada"  => "required|date_format:Y-m-d H:i:s",
            "fechaRecogidaFinal"         => "sometimes|date_format:Y-m-d H:i:s",
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
            "fechaRecogidaSeleccionada"  => "sometimes|date_format:Y-m-d H:i:s",
            "fechaRecogidaFinal"         => "sometimes|date_format:Y-m-d H:i:s",
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
