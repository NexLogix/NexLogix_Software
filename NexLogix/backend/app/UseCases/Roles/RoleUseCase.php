<?php

namespace App\UseCases\Roles;

use Illuminate\Support\Facades\Validator;
use App\Services\Roles\RoleService;

class RoleUseCase
{
    protected RoleService $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    // validacion de createRole
    public function handleCreateRole(array $data): array
    {
        $validator = Validator::make($data, [
            'nombreRole'          => 'required|string|max:100',
            'descripcionRole'     => 'nullable|string',
            'fechaAsignacionRole' => 'nullable|date',
            'permisosGenerales'   => 'nullable|array'
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => "Errores de validación",
                "errors"  => $validator->errors(),
                "status"  => 422
            ];
        }

        return $this->roleService->createRole($validator->validated());
    }

    public function handleUpdateRole($id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreRole'          => 'required|string|max:100',
            'descripcionRole'     => 'required|string',
            'fechaAsignacionRole' => 'required|date'
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => "Errores de validación",
                "errors"  => $validator->errors(),
                "status"  => 422
            ];
        }

        return $this->roleService->updateRole($id, $validator->validated());
    }

    public function handleUpdateSpecificSection($id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreRole'          => 'sometimes|string|max:100',
            'descripcionRole'     => 'sometimes|string',
            'fechaAsignacionRole' => 'sometimes|date'
        ]);

        if ($validator->fails()) {
            return [
                "success" => false,
                "message" => "Errores de validación",
                "errors"  => $validator->errors(),
                "status"  => 422
            ];
        }

        return $this->roleService->updateSpecificSection($id, $validator->validated());
    }
}
