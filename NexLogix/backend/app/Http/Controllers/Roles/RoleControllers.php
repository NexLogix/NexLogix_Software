<?php

namespace App\Http\Controllers\Roles;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Roles\RoleService;
use App\UseCases\Roles\RoleUseCase;

class RoleControllers extends Controller
{
    protected RoleService $roleService;
    protected RoleUseCase $roleUseCase;

    public function __construct(RoleService $roleService, RoleUseCase $roleUseCase)
    {
        $this->roleService = $roleService;
        $this->roleUseCase = $roleUseCase;
    }

    // GET: /api/roles
    public function showAll()
    {
        return response()->json($this->roleService->getAll(), 200);
    }

    // GET: /api/roles/{id}
    public function showByID($id)
    {
        return response()->json($this->roleService->getRoleById($id));
    }

    // POST: /api/roles
    public function createRole(Request $request)
    {
        $result = $this->roleUseCase->handleCreateRole($request->all());
        return response()->json($result, $result['status']);
    }

    // PUT: /api/roles/{id}
    public function updateRole(Request $request, $id)
    {
        $result = $this->roleUseCase->handleUpdateRole($id, $request->all());
        return response()->json($result, $result['status']);
    }


    // DELETE: /api/roles/{id}
    public function deleteRole($id)
    {
        return response()->json($this->roleService->deleteRole($id));
    }
}
