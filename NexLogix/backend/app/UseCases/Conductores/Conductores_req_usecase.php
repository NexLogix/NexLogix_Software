<?php

namespace App\UseCases\Conductores;

use App\Models\Conductores;
use App\Services\Conductores\Conductores_service;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class Conductores_req_usecase
{
    protected Conductores_service $conductoresService;

    public function __construct(Conductores_service $conductoresService)
    {
        $this->conductoresService = $conductoresService;
    }

    // USECASE POST
    public function handleCreateConductor(array $data): array
    {
        $validator = Validator::make($data, [
            'licencia'         => 'required|string|max:50',
            'tipoLicencia'     => 'required|in:A1,A2,B1,B2,B3,C1,C2,C3',
            'vigenciaLicencia' => 'required|date',
            'idUsuario'        => 'required|integer|unique:conductores,idUsuario',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors'  => $validator->errors(),
                'status'  => 422
            ];
        }

        return $this->conductoresService->createConductor($validator->validated());
    }

/* // USECASE PUT
    public function handleUpdateConductor(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'licencia' => 'required|string|max:50|unique:conductores,licencia',
            'tipoLicencia'     => 'required|in:A1,A2,B1,B2,B3,C1,C2,C3',
            'vigenciaLicencia' => 'required|date',
            'estado'           => 'required|in:disponible,en_ruta,no_disponible',
            'idUsuario'        => 'required|integer|unique:conductores,idUsuario,' . $id . ',idConductor',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors'  => $validator->errors(),
                'status'  => 422
            ];
        }

        return $this->conductoresService->updateConductor($id, $validator->validated());
    }*/

    // USECASE PATCH
    public function handleUpdateSpecificSection(int $id, array $data): array
    {
        $conductor = $this->conductoresService->getConductorById($id);

        if (!$conductor['success']) {
            return [
                'success' => false,
                'message' => 'Conductor no encontrado',
                'status'  => 404
            ];
        }

        $validator = Validator::make($data, [
            'licencia' => [
                'sometimes',
                'string',
                'max:50',
                Rule::unique('conductores', 'licencia')->ignore($conductor['data']['idConductor'], 'idConductor'),
            ],
            'tipoLicencia'     => 'sometimes|in:A1,A2,B1,B2,B3,C1,C2,C3',
            'vigenciaLicencia' => 'sometimes|date',
            'estado'           => 'sometimes|in:disponible,en_ruta,no_disponible',
            'idUsuario'        => [
                'sometimes',
                'integer',
                Rule::unique('conductores', 'idUsuario')->ignore($conductor['data']['idConductor'], 'idConductor')
            ],
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors'  => $validator->errors(),
                'status'  => 422
            ];
        }

        return $this->conductoresService->updateConductor($id, $validator->validated());
    }
}