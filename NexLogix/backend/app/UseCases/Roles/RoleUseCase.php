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
            'nombreRole'          => 'sometimes|string|max:100', // pendiente pasarlo a unique, que la DB tenga index unique
            'descripcionRole'     => 'sometimes|string',
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
}
