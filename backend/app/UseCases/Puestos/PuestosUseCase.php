<?php
namespace App\UseCases\Puestos;

use Illuminate\Support\Facades\Validator;
use App\Services\Puestos\PuestosService;
class PuestosUseCase
{
    protected PuestosService $serviceP;

    public function __construct(PuestosService $serviceP)
    {
        $this->serviceP = $serviceP;
    }

    // POST USE CASE
    public function handleCreatePuesto(array $data): array
    {
        $validator = Validator::make($data, [
            'nombrePuesto'      => 'required|string|max:100',
            'descripcionPuesto' => 'nullable|string',
            'idArea'            => 'required|integer|exists:areas,idArea',
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => "Errores de validación",
                "errors"  => $validator->errors(),
                "status"  => 422
            ];
        }

        return $this->serviceP->createPuesto($validator->validated());
    }

    // PUT USE CASE
    public function handleUpdatePuesto(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombrePuesto'      => 'required|string|max:100',
            'descripcionPuesto' => 'nullable|string',
            'idArea'            => 'required|integer|exists:areas,idArea',
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => "Errores de validación",
                "errors"  => $validator->errors(),
                "status"  => 422
            ];
        }

        return $this->serviceP->updatePuesto($id, $validator->validated());
    }

    // PATCH USE CASE
    public function handleUpdateSpecificFields(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombrePuesto'      => 'sometimes|string|max:100',
            'descripcionPuesto' => 'sometimes|string',
            'idArea'            => 'sometimes|integer|exists:areas,idArea',
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => "Errores de validación",
                "errors"  => $validator->errors(),
                "status"  => 422
            ];
        }

        return $this->serviceP->updateSpecificFields($id, $validator->validated());
    }
}
