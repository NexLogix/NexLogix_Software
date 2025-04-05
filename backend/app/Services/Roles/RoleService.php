<?php

namespace App\Services\Roles;
use App\Models\Roles;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

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
        try {
            $role = Roles::findOrFail($id);
            return response()->json([
                "message: "=> "Role encontrado!",
                "Role: "=> $role,
                "Status" => 200
            ]);
        } catch (ModelNotFoundException $e){
            return response()->json([
                "message"=> "Role con ID $id no encontrado!",
                "status"=> 400
            ]);
        } catch (QueryException $e) {
            return response()->json([
                "message" => "Error de base de datos: " . $e->getMessage(),
                "status" => 500
            ], 500);

        } catch (Exception $e) {
            return response()->json([
                "message" => "Ocurrió un error inesperado: " . $e->getMessage(),
                "status" => 500
            ], 500);
        }
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
    public function EditAll($id, array $data)
    {
       // try {

       // }
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
