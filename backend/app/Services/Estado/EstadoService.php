<?php
namespace App\Services\Estado;
use App\Models\Estado;

class EstadoService
{
    // GET
    public function getAll():array
    {
        // si la condicion se cumple se retorna true y muestra los estados que haya
        return [
            "success" => true,
            "message" => "Listado de estados",
            "data"    => Estado::all(),
            "status"  => 200
        ];
    }
    // GET BY los estados
    public function getEstadoById($id): array
    {
        $estado = Estado::find($id);

        if (!$estado) {
            return [
                "success" => false,
                "message" => "Estado no encontrado",
                "data"    => null,
                "status"  => 404
            ];
        }

        return [
            "success" => true,
            "message" => "Estado encontrado",
            "data"    => $estado,
            "status"  => 200
        ];
    }

    //POST

    public function createEstado(array $data): array
    {
        try {
            $estado = Estado::create($data);
            return [
                'success' => true,
                'message' => 'Estado creado correctamente',
                'data'    => $estado,
                'status'  => 201
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear el estado',
                'error'   => $e->getMessage(),
                'status'  => 500
            ];
        }
    }

    // DELTE
    public function deleteEstado($id): array
    {
        $estado = Estado::find($id);

        if (!$estado) {
            return [
                "success" => false,
                "message" => "Estado no encontrado",
                "data"    => null,
                "status"  => 404
            ];
        }

        $estado->delete();

        return [
            "success" => true,
            "message" => "Estado eliminado correctamente",
            "data"    => null,
            "status"  => 200
        ];
    }
}
