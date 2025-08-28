<?php

namespace App\Services\Conductores;

use App\Models\Conductores;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Exception;

class Conductores_service
{
    // GET GENERAL
    public function getAll(): array
    {
        try {
            $conductores = Conductores::with('usuario.roles','usuario.estado')->get();
            if ($conductores->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay conductores registrados',
                    'status' => 404
                ];
            }
            return [
                'success' => true,
                'title' => 'Lista de los conductores',
                'data' => $conductores,
                'message' => 'Conductores obtenidos exitosamente',
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener conductores: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // GET BY ID
    public function getConductorById(string $value): array // $value puede ser ID, documento de identidad o email que se recibe de las APIS o de la DB
    {
        try {
            $conductor_found = Conductores::with('usuario.roles')
                ->where('idConductor', $value) // Busca por ID del conductor
                //Si no viene id buscamos por documento de identidad o email del usuario
                ->orWhereHas('usuario', function ($query) use ($value) {
                    $query
                        // Se busca por documento de identidad, email o licencia del conductor
                        ->where('documentoIdentidad', $value)
                        ->orWhere('email', $value)
                        ->orWhere('licencia', $value);
                })
                ->firstOrFail();


            return [
                'success' => true,
                'title' => 'Información del conductor',
                'data' => $conductor_found,
                'message' => 'Conductor encontrado',
                'status' => 200
            ];

        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "No se encontró conductor con el valor: $value",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener conductor: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    public function getActiveConductores(?string $value = null): array
    {
        try {
            $query = Conductores::with('usuario.roles')
                ->whereIn('estado', ['disponible', 'en_ruta']);

            // Solo aplica filtros si viene un valor de búsqueda
            if ($value) {
                $query->where(function ($query) use ($value) {
                    $query->where('idConductor', $value)
                        ->orWhere('licencia', 'like', "%{$value}%")
                        ->orWhereHas('usuario', function ($q) use ($value) {
                            $q->where('documentoIdentidad', 'like', "%{$value}%")
                                ->orWhere('email', 'like', "%{$value}%")
                                ->orWhere('nombreCompleto', 'like', "%{$value}%");
                        });
                });
            }

            $conductores = $query->get();

            if ($conductores->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No se encontraron conductores activos',
                    'status' => 404
                ];
            }

            return [
                'success' => true,
                'title' => 'Lista de conductores activos',
                'data' => $conductores,
                'message' => 'Conductores activos obtenidos exitosamente',
                'status' => 200
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener conductores activos: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    /*// GET SEARCHING FOR CREATE NEW CONDUCTOR OR UPDATE CONDUCTOR
    public function searchConductorForCreateOrUpdate(?string $search = null): array
    {
        try {
            $query = User::whereDoesntHave('roles', function ($q) {
                    $q->where('idRole', 2); // Excluye usuarios con rol 2
                })
                ->where(function ($query) use ($search) {
                    $query->where('documentoIdentidad', $search)
                        ->orWhere('email', $search);
                })
                ->whereDoesntHave('conductor'); // Excluye usuarios que ya son conductores
            // Si se proporciona un término de búsqueda, aplica el filtro
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nombreCompleto', 'like', "%{$search}%")
                    ->orWhere('documentoIdentidad', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
                });
            }

            $conductor_found = $query->get();
            return [
                'success' => true,
                'data' => $conductor_found,
                'status' => 200
            ];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al buscar conductor: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }*/


    // POST SERVICE
    public function createConductor(array $data): array
    {
        try {
            $conductor = Conductores::create($data);
            return [
                'success' => true,
                'data' => $conductor,
                'message' => 'Conductor creado exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear conductor: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // PATCH SERVICE
    public function updateConductor(string $value, array $data): array
    {
        try {
            $conductor_found = Conductores::with('usuario.roles')
                ->where('idConductor', $value)
                ->orWhereHas('usuario', function ($query) use ($value) {
                    $query
                        ->where('documentoIdentidad', $value)
                        ->orWhere('email', $value)
                        ->orWhere('licencia', $value);
                })
                ->firstOrFail();

            $conductor_found->update($data);

            return [
                'success' => true,
                'data' => $conductor_found,
                'message' => 'Conductor actualizado correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Conductor con valor $value no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar conductor: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error inesperado: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // DELETE SERVICE
    public function deleteConductor(string $value): array
    {
        try {
            $conductor_found = Conductores::with('usuario.roles')
                ->where('idConductor', $value)
                ->orWhereHas('usuario', function ($query) use ($value) {
                    $query
                        ->where('documentoIdentidad', $value)
                        ->orWhere('email', $value)
                        ->orWhere('licencia', $value);
                })
                ->firstOrFail();

            $conductor_found->delete();

            return [
                'success' => true,
                'message' => 'Conductor eliminado correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Conductor con valor $value no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar conductor: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error inesperado: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}