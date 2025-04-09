<?php

namespace App\UseCases\Estado;
use Illuminate\Support\Facades\Validator;
use App\Services\Estado\EstadoService;


class EstadoUseCase
{
    protected EstadoService $estado_service;

    public function __construct(EstadoService $estado_service)
    {
        $this->estado_service = $estado_service;
    }

    public function handleCreateEstado(array $data):array
    {
        $validator = Validator::make($data, [
            'estado' => 'required|string|in:ACTIVO,INACTIVO,BLOQUEADO,SUSPENDIDO'
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Error de validacion y creacion',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }

        return $this->estado_service->createEstado($validator->validated());
    }
}
