<?php

namespace App\Services\Roles;
use App\Models\Roles;
use Exception;
use Illuminate\Database\QueryException;

class RoleService
{
    // GET
    public function getAll()
    {
        $role = Roles::all();

        if (!$role){
            throw new Exception("No hay roles creados!", 400);
        }

        return response()->json([
            "Roles: "=> $role
        ], 200);
    }

    //GET BY ID
    public function getRoleById($id)
    {
        $role = Roles::findOrFail($id);
        if (!$role){
            throw new Exception("No se encontro el role",404);
        }

        return response()->json([
            "message: "=> "Role encontrado!",
            "Role: "=> $role,
            "Status" => 200
        ]);
    }

    // POST
    public function createRole(array $data)
    {
        try {
            $role = Roles::create($data);
            return response()->json([
                'Mensaje' => 'Role creado exitosamente!',
                'Role' => $role
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'Error:' => 'Error al conectarse al servidor!',
                'Detalles: ' => $e->getMessage()
            ], 500);
        }
    }


    // PUT
    public function EditAll()
    {
        
    }

    // PATCH
    public function EditSpesificSection()
    {

    }

    // DELETE
    public function DeleteRole()
    {

    }
}
