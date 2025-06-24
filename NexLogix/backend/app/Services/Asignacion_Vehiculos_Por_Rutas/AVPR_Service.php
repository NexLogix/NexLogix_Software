<?php
namespace App\Services\Asignacion_Vehiculos_Por_Rutas;

// IMPORTACIONES
use App\Models\Asignacion_Vehiculos_Por_Rutas;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class AVPR_Service
{
    // Servicio para obtener todas las asignaciones de rutas
    public function getAll_AVPR()
    {
        try {
            // Obtiene todas las asignaciones con relaciones a vehículo y ruta
            $AVPR = Asignacion_Vehiculos_Por_Rutas::with('vehiculo', 'ruta')->get();

            // Si no hay registros, devuelve un mensaje indicando que no existen datos
            if ($AVPR->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay Asignacion de Rutases registradas',
                    'status' => 404
                ];
            }

            // Si existen datos, los retorna con mensaje y estado exitoso
            return [
                'success' => true,
                'message' => 'Lista de Asignacion de Rutas:',
                'data' => $AVPR,
                'status' => 200
            ];
        } catch (Exception $e) {
            // Si ocurre un error, lo captura y devuelve mensaje de error con código 500
            return [
                'success' => false,
                'message' => 'Error al obtener Asignacion de Rutas ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // Servicio para obtener una asignación de ruta por su ID
    public function get_AVPR_ById(int $id): array
    {
        try {
            // Busca una asignación específica por su ID junto con sus relaciones
            $AVPR = Asignacion_Vehiculos_Por_Rutas::with('vehiculo', 'ruta')->findOrFail($id);

            // Si la encuentra, retorna la información con estado 200
            return [
                'success' => true,
                'data' => $AVPR,
                'message' => 'Asignacion de Rutas encontrada',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            // Si no encuentra el ID, retorna mensaje de no encontrado
            return [
                'success' => false,
                'message' => "Asignacion de Ruta con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            // Captura cualquier otro error y lo retorna con mensaje y código 500
            return [
                'success' => false,
                'message' => 'Error al obtener la Asignacion de Rutas ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // Servicio para crear una nueva asignación de ruta
    public function create_AVPR(array $data): array
    {
        try {
            // Crea un nuevo registro en la base de datos con los datos proporcionados
            $AVPR = Asignacion_Vehiculos_Por_Rutas::create($data);

            // Retorna la nueva asignación con mensaje y estado 201 (creado)
            return [
                'success' => true,
                'data' => $AVPR,
                'message' => 'Asignacion de Rutas creada exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            // Error relacionado con la consulta a la base de datos
            return [
                'success' => false,
                'message' => 'Error al crear la Asignacion de Rutas ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            // Cualquier otro error al intentar crear la asignación
            return [
                'success' => false,
                'message' => 'Error al crear la Asignacion de Rutas ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // Servicio para actualizar una asignación de ruta existente
    public function update_AVPR(int $id, array $data)
    {
        try {
            // Busca la asignación por ID, lanza excepción si no existe
            $AVPR = Asignacion_Vehiculos_Por_Rutas::findOrFail($id);

            // Si no se recibe ningún dato, retorna error de solicitud
            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            // Aplica los cambios al modelo y guarda
            $AVPR->update($data);

            // Devuelve respuesta indicando que fue actualizado correctamente
            return [
                'success' => true,
                'message' => 'Asignacion de Rutas actualizada',
                'data' => $AVPR,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            // Si el ID no existe, se informa que no se encontró la asignación
            return [
                'success' => false,
                'message' => "Asignacion de Ruta con ID $id no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            // Cualquier otro error al intentar actualizar
            return [
                'success' => false,
                'message' => 'Error al actualizar la Asignacion de Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // Servicio para eliminar una asignación de ruta por su ID
    public function delete_AVPR(int $id): array
    {
        try {
            // Busca la asignación por su ID y lanza excepción si no existe
            $AVPR = Asignacion_Vehiculos_Por_Rutas::findOrFail($id);

            // Elimina el registro de la base de datos
            $AVPR->delete();

            // Devuelve mensaje de éxito al eliminar
            return [
                'success' => true,
                'message' => 'Asignacion de Ruta eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            // Si el ID no existe, retorna error 404
            return [
                'success' => false,
                'message' => "Asignacion de Ruta con ID $id no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            // Si hay un error en la base de datos al eliminar
            return [
                'success' => false,
                'message' => 'Error al eliminar la Asignacion de Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            // Captura cualquier otro tipo de error al intentar eliminar
            return [
                'success' => false,
                'message' => 'Error al eliminar la Asignacion de Ruta ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}

/*
    NOTA:
    $AVPR es asignacion rutas, solo usamos una abrebiacion como variable y ahorra tiempo en hacer codigo
*/
