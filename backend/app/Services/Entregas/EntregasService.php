<?php
namespace App\Services\Entregas;

use App\Models\Entregas;
use App\Models\Interfaces\Entregas\IEntregaService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class EntregasService implements IEntregaService
{
    // GET GENERAL SERVICE
    public function getAllEntregas(): array
    {
        try {
            $entregas = Entregas::with("ciudades")->get();
            if ($entregas->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay entregas registradas',
                    'status' => 404
                ];
            }

            return [
                'success' => true,
                'message' => 'Lista de Entregas:',
                'data' => $entregas,
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener las entregas: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // GET BY ID
    public function getEntregaById(int $id): array
    {
        try {
            $entrega = Entregas::with('ciudades')->findOrFail($id);

            return [
                'success' => true,
                'message' => 'Entrega encontrada',
                'data' => [
                    'id Entrega' => $entrega->idEntrega,
                    'fecha Entrega seleccionada' => $entrega->fechaEntregaSeleccionada,
                    'direccion Entrega' => $entrega->direccionEntrega,
                    // llamada de cuidades
                    'info cuidad Entrega' => [
                        'nombre cuidad Entrega' => $entrega->ciudades->nombreCiudad ?? 'No asignada',
                        'costo de la cuidad' => $entrega->ciudades->costoPor_Ciudad ?? 'Precio no asignado',
                    ]
                ],
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Entrega con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la Entrega: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // POST SERVICE
    public function createEntrega(array $data): array
    {
        try {
            $entrega = Entregas::create($data);
            $entrega->load('ciudades'); // cargamos el nombre de ciudad

            return [
                'success' => true,
                'message' => 'Entrega creada exitosamente.',
                'data' => $entrega,
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Entrega: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error general al crear la Entrega: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // PATCH SERVICE
    public function updateSpecificFields_E(int $id, array $data): array
    {
        try {
            $entrega = Entregas::findOrFail($id);

            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            $entrega->update($data);
            $entrega->load('ciudades'); // refresca con ciudad

            return [
                'success' => true,
                'message' => 'Entrega actualizada parcialmente',
                'data' => $entrega,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Entrega con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Entrega: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // DELETE SERVICE
    public function deleteEntrega(int $id): array
    {
        try {
            $entrega = Entregas::findOrFail($id); // Busca
            $entrega->delete();
            return [
                'success' => true,
                'message' => 'Entrega eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Entrega con ID $id no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Entrega ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Entrega ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}
