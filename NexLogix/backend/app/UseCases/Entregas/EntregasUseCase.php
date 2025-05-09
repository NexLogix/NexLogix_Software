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
            "fechaEntregaSeleccionada"  => "required|date",
            "fechaEntregaFinal"         => "sometimes|date",
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
            "fechaRecogidaSeleccionada"  => "sometimes|date",
            "fechaRecogidaFinal"         => "sometimes|date",
            "direccionRecogida"          => "sometimes|string|max:255",
            "idCiudad"                   => "sometimes|numeric|min:0",
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
