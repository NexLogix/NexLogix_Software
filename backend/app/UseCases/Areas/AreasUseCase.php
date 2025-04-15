<?php

namespace App\UseCases\Areas;

use App\Models\Interfaces\Areas\IAreaUseCase;
use Illuminate\Support\Facades\Validator;
use App\Services\Areas\AreasService;

class AreasUseCase implements IAreaUseCase
{
    protected AreasService $areasService;

    public function __construct(AreasService $areasService)
    {
        $this->areasService = $areasService;
    }

    public function handleCreateArea(array $data): array
    {
        $validator = Validator::make($data, [
            'nombreArea'      => 'required|string|max:100',
            'descripcionArea' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => "Errores de validación",
                "errors"  => $validator->errors(),
                "status"  => 422
            ];
        }

        return $this->areasService->createArea($validator->validated());
    }

    public function handleUpdateArea($id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreArea'      => 'required|string|max:100',
            'descripcionArea' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => "Errores de validación",
                "errors"  => $validator->errors(),
                "status"  => 422
            ];
        }

        return $this->areasService->updateArea($id, $validator->validated());
    }

    public function handleUpdateSpecificSection($id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreArea'      => 'sometimes|string|max:100',
            'descripcionArea' => 'sometimes|string|max:255'
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => "Errores de validación",
                "errors"  => $validator->errors(),
                "status"  => 422
            ];
        }

        return $this->areasService->updateSpecificSection($id, $validator->validated());
    }
}
