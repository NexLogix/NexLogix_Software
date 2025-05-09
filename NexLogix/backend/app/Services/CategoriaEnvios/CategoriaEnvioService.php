<?php
namespace App\Services\CategoriaEnvios;

use App\Models\CategoriaEnvio;
use App\Models\Interfaces\CategoriaEnvios\ICategoriaEnviosService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class CategoriaEnvioService implements ICategoriaEnviosService // lamada de la interace de services de Categoria Envios
{
    // GET GENERAL
    public function getAllCategoriasEnvios()
    {
        try {
            $envios = CategoriaEnvio::all();
            if ($envios->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay Categorias de Envios registrados',
                    'status' => 404
                ];
            }
            return [
                'success' => true,
                'message' => 'Lista de Categorias de Envios',
                'data' => $envios,
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener Categorias de Envios: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // GET BY ID
    public function getCategoriaEnvioById(int $id): array
    {
        try {
            $envio = CategoriaEnvio::findOrFail($id);
            return [
                'success' => true,
                'data' => $envio,
                'message' => 'Categoria de Envío encontrado',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Categoria de Envío con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la Categoria de Envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // POST
    public function createCategoriaEnvio(array $data): array
    {
        try {
            $envio = CategoriaEnvio::create($data);
            return [
                'success' => true,
                'data' => $envio,
                'message' => 'Categoria de Envío creado exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Categoria de Envío: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear la Categoria de Envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // PUT
    public function updateCategoriaEnvio(int $id, array $data): array
    {
        try {
            $envio = CategoriaEnvio::findOrFail($id);
            $envio->update($data);
            return [
                'success' => true,
                'data' => $envio,
                'message' => 'Categoria de Envío actualizado completamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Categoria de Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Categoria de Envío: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Categoria de Envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // PATCH
    public function updateSpecificSection(int $id, array $data): array
    {
        try {
            $envio = CategoriaEnvio::findOrFail($id);

            if (empty($data)) {
                return [
                    'success' => false,
                    'message' => 'No se proporcionaron campos válidos para actualizar',
                    'status' => 400
                ];
            }

            $envio->update($data);
            return [
                'success' => true,
                'message' => 'La Categoria de Envío actualizado parcialmente',
                'data' => $envio,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "La Categoria de Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar la Categoria de Envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // DELETE
    public function deleteCategoriaEnvio(int $id): array
    {
        try {
            $categoria = CategoriaEnvio::findOrFail($id); // Busca
            $categoria->delete();
            return [
                'success' => true,
                'message' => 'Categoria de Envío eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Categoria de Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Categoria de Envío! ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar la Categoria de Envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}
