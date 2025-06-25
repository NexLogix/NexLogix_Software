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
            $info_conductor = $conductores->map(function ($conductor) {
                return [
                    'idConductor' => $conductor->idConductor,
                    'licencia' => $conductor->licencia,
                    'tipoLicencia' => $conductor->tipoLicencia,
                    'vigenciaLicencia' => $conductor->vigenciaLicencia,
                    'estado' => $conductor->estado,
                    'usuario' => $conductor->usuario ? [
                        'idUsuario' => $conductor->usuario->idusuarios,
                        'nombreCompleto' => $conductor->usuario->nombreCompleto,
                        'email' => $conductor->usuario->email,
                        'estadoUsuario' => $conductor->usuario->estado->estado ?? null,
                    ] : null
                ];
            });
            return [
                'success' => true,
                'title' => 'Lista de los conductores',
                'data' => $info_conductor,
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
            $conductor = Conductores::with('usuario.roles')
                ->where('idConductor', $value) // Busca por ID del conductor
                //Si no viene id buscamos por documento de identidad o email del usuario
                ->orWhereHas('usuario', function ($query) use ($value) {
                    $query
                        // IF
                        ->where('documentoIdentidad', $value)
                        // OR
                        ->orWhere('email', $value);
                })
                ->firstOrFail();

            $info_conductor = [
                'idConductor' => $conductor->idConductor,
                'licencia' => $conductor->licencia,
                'tipoLicencia' => $conductor->tipoLicencia,
                'vigenciaLicencia' => $conductor->vigenciaLicencia,
                'estado' => $conductor->estado,
                'usuario' => [
                    'documentoIdentidad' => $conductor->usuario->documentoIdentidad ?? null,
                    'nombreCompleto'     => $conductor->usuario->nombreCompleto ?? null,
                    'email'              => $conductor->usuario->email ?? null,
                    'numContacto'        => $conductor->usuario->numContacto ?? null,
                    'nombreRole'         => $conductor->usuario->roles->nombreRole ?? null,
                ]
            ];

            return [
                'success' => true,
                'title' => 'Información del conductor',
                'data' => $info_conductor,
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

    // GET SEARCHING FOR CREATE NEW CONDUCTOR OR UPDATE CONDUCTOR
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
    }


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

    // PUT SERVICE
    public function updateConductor(int $id, array $data): array
    {
        try {
            $conductor = Conductores::findOrFail($id);
            $conductor->update($data);
            return [
                'success' => true,
                'data' => $conductor,
                'message' => 'Conductor actualizado correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Conductor con ID $id no encontrado",
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
    public function deleteConductor(int $id): array
    {
        try {
            $conductor = Conductores::findOrFail($id);
            $conductor->delete();
            return [
                'success' => true,
                'message' => 'Conductor eliminado correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Conductor con ID $id no encontrado",
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
