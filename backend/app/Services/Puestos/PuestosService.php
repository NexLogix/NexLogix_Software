<?php

namespace App\Services\Puestos;

use App\Models\Puestos;

class PuestosService
{
    // GET SERVICE
    public function getAllPuestos():array
    {
        $puestos = Puestos::with('areas')->get();
        // Despues quitamos lo comntado porque ya hay areas creadas

        if(!$puestos) {
            return [
                'success' => false,
                'message' => 'No hay puestos',
                'status' => 404
            ];
        }
 
        return [
            'success' => true,
            'data' => $puestos,
            'status' => 200
        ];
    }

    // GET BY ID SERVICE
    public function getPuestoById(int $id):array
    {
        $puesto = Puestos::with('areas')->find( $id );
        if(!$puesto){
            return [
                'success' => false,
                'message' => 'Puesto no encontrado',
                'status' => 404
            ];
        }

        return [
            'success' => true,
            'data' => $puesto,
            'status' => 200
        ];
    }

    // POST SERVICE
    public function createPuesto(array $data): array
    {
        try {
            $puesto = Puestos::create($data)->fresh();
            return [
                'success' => true,
                'message' => 'Puesto creado exitosamente',
                'data'    => $puesto,
                'status'  => 201
            ];
        } catch (\Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear el puesto',
                'error'   => $e->getMessage(),
                'status'  => 500
            ];
        }
    }


    // PUT SERVICE
    public function updatePuesto(int $id, array $data): array
    {
        $puesto = Puestos::find($id);

        if (!$puesto) {
            return [
                'success' => false,
                'message' => 'Puesto no encontrado',
                'status' => 404
            ];
        }

        $puesto->update($data);

        return [
            'success' => true,
            'message' => 'Se ha actualizado toda la informacion general el Puesto correctamente!',
            'data' => $puesto,
            'status' => 200
        ];
    }

    // PATCH SERVICE
    public function updateSpecificFields(int $id, array $data): array
    {
        $puesto = Puestos::find($id);

        if (!$puesto) {
            return [
                'success' => false,
                'message' => 'Puesto no encontrado',
                'status' => 404
            ];
        }

        $puesto->update($data);

        return [
            'success' => true,
            'message' => 'Han sido actualizados los campos especificos del puesto',
            'data' => $puesto,
            'status' => 200
        ];
    }

    // DELETE SERVICE
    public function deletePuesto(int $id): array
    {
        $puesto = Puestos::find($id);

        if (!$puesto) {
            return [
                'success' => false,
                'message' => 'Puesto no encontrado',
                'status' => 404
            ];
        }

        $puesto->delete();

        return [
            'success' => true,
            'message' => 'Puesto eliminado correctamente',
            'status' => 200
        ];
    }
}

