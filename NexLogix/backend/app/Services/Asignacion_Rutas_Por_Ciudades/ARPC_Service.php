<?php
namespace App\Services\Rutas;

use App\Models\Asignacion_Rutas_Por_Ciudades;
use App\Models\Interfaces\Asignacion_Rutas_Por_Ciudades\I_ARPC_Service;
use App\Models\Rutas; // Modelo de Eloquent para rutas
use Exception; // Excepciones generales
use Illuminate\Database\Eloquent\ModelNotFoundException; // Excepción cuando no se encuentra un modelo
use Illuminate\Database\QueryException; // Excepción para errores de base de datos

// Clase que implementa la lógica del servicio para las rutas
class ARPC_Service implements I_ARPC_Service
{
    // Método para obtener todas las rutas registradas
    function getAll_ARPC()
    {
        try {
            // Obtiene todas las rutas junto con su Ruta relacionada
            $ARPC = Asignacion_Rutas_Por_Ciudades::with('ciudades', 'rutas')->get();

            // Si no hay rutas registradas, retorna una respuesta indicando vacío
            if ($ARPC->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay Rutas registradas',
                    'status' => 404
                ];
            }

            // Si existen rutas, retorna la lista con éxito
            return [
                'success' => true,
                'message' => 'Lista de Rutas:',
                'data' => $ARPC,
                'status' => 200
            ];

        // En caso de error general, se captura la excepción
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // Método para obtener una ruta específica por ID
    function get_ARPC_ById(int $id): array
    {
        try {
            // Busca una ruta por ID, incluyendo la Ruta relacionada
            $ARPC = Asignacion_Rutas_Por_Ciudades::with('ciudades', 'rutas')->findOrFail($id);

            // Si se encuentra, devuelve éxito con los datos
            return [
                'success' => true,
                'data' => $ARPC,
                'message' => 'Ruta encontrada',
                'status' => 200
            ];

        // Si no se encuentra, devuelve una respuesta 404
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Ruta con ID $id no encontrada",
                'status' => 404
            ];

        // Captura cualquier otro error general
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // Método para crear una nueva ruta en la base de datos
    function create_ARPC(array $data): array
    {
        try {
            // Se crea la ruta usando asignación masiva
            $ruta = Rutas::create($data);

            // Devuelve éxito con el objeto creado
            return [
                'success' => true,
                'data' => $ruta,
                'message' => 'La Ruta ha sido creada exitosamente',
                'status' => 201
            ];

        // Captura error general en caso de fallo en la creación
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // Método para actualizar una ruta existente por ID
    function update_ARPC(int $id, array $data): array
    {
        try {
            // Busca la ruta por ID
            $ARPC = Rutas::findOrFail($id);

            // Verifica si el array de datos está vacío
            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            // Actualiza los campos que fueron enviados
            $ARPC->update($data);

            // Retorna éxito con el objeto actualizado
            return [
                'success' => true,
                'message' => 'La Ruta ha sido actualizada',
                'data' => $ARPC,
                'status' => 200
            ];

        // Si no se encuentra la ruta, lanza error 404
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Ruta con ID $id no encontrado",
                'status' => 404
            ];

        // Captura error general
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // Método para eliminar una ruta por ID
    function delete_ARPC(int $id): array
    {
        try {
            // Busca la ruta por ID
            $ruta = Rutas::findOrFail($id);

            // Elimina la ruta
            $ruta->delete();

            // Retorna éxito
            return [
                'success' => true,
                'message' => 'Ruta eliminada correctamente',
                'status' => 200
            ];

        // Si no se encuentra, retorna error 404
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Ruta con ID $id no encontrada",
                'status' => 404
            ];

        // Si hay error de base de datos (integridad, restricciones), lo captura
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}
