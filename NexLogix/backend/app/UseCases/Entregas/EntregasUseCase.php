<?php
namespace App\UseCases\Entregas;

use App\Models\Interfaces\Entregas\IEntregaService;
use App\Models\Interfaces\Entregas\IEntregaUseCase;
use Illuminate\Support\Facades\Validator;

class EntregasUseCase implements IEntregaUseCase
{
    protected IEntregaService $entrega_service;
    public function __construct(IEntregaService $entrega_service)
    {
        $this->entrega_service = $entrega_service;
    }

    // POST
    public function handleCreateEntrega(array $data): array
    {
        $validator = Validator::make($data, [
            //se pone este formato date_format:Y-m-d H:i:s ya que en la DB esta como datetime,
            // ejemplo = "fechaEntregaSeleccionada": "2024-06-17 14:30:00"
            "fechaEntregaSeleccionada"  => "required|date_format:Y-m-d H:i:s",
            "fechaEntregaFinal"         => "sometimes|date_format:Y-m-d H:i:s",
            "direccionEntrega"          => "required|string|max:255",
            'idCiudad'                  => 'required|numeric|min:1|exists:ciudades,idCiudad',
        ]);
        if ($validator->fails()) {
            return [
                'success'   => false,
                'message'   => 'Errores de validación',
                'errors'    => $validator->errors(),
                'status'    => 422
            ];
        }
        return $this->entrega_service->createEntrega($data);
    }

    // PATCH
    public function handleUpdateSpecificSection_R(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            "fechaEntregaSeleccionada"  => "sometimes|date_format:Y-m-d H:i:s",
            "fechaEntregaFinal"         => "sometimes|date_format:Y-m-d H:i:s",
            "direccionEntrega"          => "sometimes|string|max:255",
            'idCiudad'                  => 'sometimes|numeric|min:1|exists:ciudades,idCiudad',
        ]);

        if ($validator->fails()) {
            return [
                'success'   =>  false,
                'message'   => 'Errores de validación',
                'errors'    =>  $validator->errors(),
                'status'    =>  422
            ];
        }

        return $this->entrega_service->updateSpecificFields_E($id, $data);
    }
}
