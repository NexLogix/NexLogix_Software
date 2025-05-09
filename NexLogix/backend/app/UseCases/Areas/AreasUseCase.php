<?php

namespace App\UseCases\Areas;

use App\Models\Interfaces\Areas\IAreaService;
use App\Models\Interfaces\Areas\IAreaUseCase;
use Illuminate\Support\Facades\Validator;

class AreasUseCase implements IAreaUseCase
{
    protected IAreaService $areasService;

    public function __construct(IAreaService $areasService)
    {
        $this->areasService = $areasService;
    }

    // USECASE POST
    public function handleCreateArea(array $data): array
    {
        $validator = Validator::make($data, [
            'nombreArea' => 'required|string|max:100',
            'descripcionArea' => 'nullable|string|max:255'
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        return $this->areasService->createArea($validator->validated());
    }

    // USECASE PUT
    public function handleUpdateArea(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreArea' => 'required|string|max:100',
            'descripcionArea' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        return $this->areasService->updateArea($id, $validator->validated());
    }

    // USECASE PATCH
    public function handleUpdateSpecificSection(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreArea' => 'sometimes|string|max:100',
            'descripcionArea' => 'sometimes|string|max:255'
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        return $this->areasService->updateSpecificSection($id, $validator->validated());
    }
}
