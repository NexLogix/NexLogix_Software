<?php
namespace App\Services\Recogidas;

use App\Models\Interfaces\Recogidas\IRecogidaService;
use App\Models\Recogidas;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class RecogidasService implements IRecogidaService
{
    // ojo aqui, porque haremos implementacion de metodos
    public function getAllRecogidas(): array
    {
        try {
            $recogidas = Recogidas::with('ciudades')->get(); // importante el with()

            if ($recogidas->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay recogidas registradas',
                    'status' => 404
                ];
            }

            // Formatear cada recogida, usaremos un map para filtrar todo en clave valor
            $data = $recogidas->map(function ($recogida) {
                return [
                    'success' => true,
                    'id' => $recogida->idRecogida,
                    'fecha_recogida_seleccionada' => $recogida->fechaRecogidaSeleccionada,
                    'direccion_recogida' => $recogida->direccionRecogida,
                    // llamada de cuidades
                    'info cuidad Recogida' => [
                        'nombre cuidad Recogida' => $recogida->ciudades->nombreCiudad ?? 'No asignada',
                        'precio de envio por la cuidad' => $recogida->ciudades->costoPor_Ciudad ?? 'no asiganda',
                    ]
                ];
            });

            return [
                'success' => true,
                'message' => 'Lista de Recogidas:',
                'data' => $data,
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener las recogidas: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // GET BY ID
    public function getRecogidaById(int $id): array
    {
        try {
            $recogida = Recogidas::with('ciudades')->findOrFail($id);

            return [
                'success' => true,
                'data' => [
                    'id' => $recogida->idRecogida,
                    'fecha recogida seleccionada' => $recogida->fechaRecogidaSeleccionada,
                    'direccion recogida' => $recogida->direccionRecogida,
                    // llamada de cuidades
                    'info cuidad Recogida' => [

                        'nombre cuidad Recogida' => $recogida->ciudades->nombreCiudad ?? 'No asignada'
                    ]
                ],
                'message' => 'Recogida encontrada',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Recogida con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la recogida: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }


    // POST
    public function createRecogida(array $data): array
    {
        try {
            $recogida = Recogidas::create($data);
            $recogida->load('ciudades'); // cargamos el nombre de ciudad

            return [
                'success' => true,
                'message' => 'Recogida creada exitosamente.',
                'data' => $recogida,
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Recogida: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error general al crear la Recogida: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // PATCH
    public function updateSpecificFields_R(int $id, array $data): array
    {
        try {
            $recogida = Recogidas::findOrFail($id);

            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            $recogida->update($data);
            $recogida->load('ciudades'); // refresca con ciudad

            return [
                'success' => true,
                'message' => 'Recogida actualizada parcialmente',
                'data' => $recogida,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Recogida con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Recogida: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }


    // DELETE
    public function deleteRecogida(int $id): array
    {
        try {
            $recogida = Recogidas::findOrFail($id); // Busca
            $recogida->delete();
            return [
                'success' => true,
                'message' => 'Recogida eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Recogida con ID $id no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Recogida ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Recogida ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}

// en GET solo usaremos un filtro de datos limpios porque en post y patch no es necesario, ya que aqui se necesita toda la info.
