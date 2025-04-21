<?php

namespace App\Services\Envios;

use App\Models\Envios;
use App\Models\Interfaces\Envios\IEnviosService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;

class EnvioService implements IEnviosService
{
    //SERVICE GET
    public function getAllEnvios(): array
    {
        try {
            $envios = Envios::with([
                'user',
                'recogidas.ciudades',
                'entregas.ciudades',
                'categoriaEnvio'])->get();

            if ($envios->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay envíos registrados',
                    'status' => 404
                ];
            }
            $data = $envios->map(function ($envio) {
                return [
                    "idEnvio"                   => $envio->idEnvio,
                    "nombreRemitente"           => $envio->nombreRemitente,
                    "num_ContactoRemitente"     => $envio->num_ContactoRemitente,
                    "nombreDestinatario"        => $envio->nombreDestinatario,
                    "num_ContactoDestinatario"  => $envio->num_ContactoDestinatario,
                    "metodoPago"                => $envio->metodoPago,
                    "costosTotal_Envio"         => $envio->costosTotal_Envio,
                    "fechaEnvio"                => $envio->fechaEnvio,

                    "recogidas" => [
                        "idRecogida"                => $envio->recogidas->idRecogida ?? null,
                        "fechaRecogidaSeleccionada" => $envio->recogidas->fechaRecogidaSeleccionada ?? null,
                        "fechaRecogidaFinal"        => $envio->recogidas->fechaRecogidaFinal ?? null,
                        "direccionRecogida"         => $envio->recogidas->direccionRecogida ?? null,
                        "ciudad" => [
                            "idCiudad" => $envio->recogidas->ciudades->idCiudad ?? null,
                            "nombre"   => $envio->recogidas->ciudades->nombreCiudad ?? null,
                            "precioCiudad" => $envio->recogidas->ciudades->costoPor_Ciudad ?? null,
                        ],
                    ],

                    "entregas" => [
                        "idEntrega"                => $envio->entregas->idEntrega ?? null,
                        "fechaEntregaSeleccionada" => $envio->entregas->fechaEntregaSeleccionada ?? null,
                        "fechaEntregaFinal"        => $envio->entregas->fechaEntregaFinal ?? null,
                        "direccionEntrega"         => $envio->entregas->direccionEntrega ?? null,
                        "ciudad" => [
                            "idCiudad" => $envio->entregas->ciudades->idCiudad ?? null,
                            "nombre"   => $envio->entregas->ciudades->nombreCiudad ?? null,
                            "precioCiudad" => $envio->entregas->ciudades->costoPor_Ciudad ?? null,
                        ],
                    ],

                    "categoria_envio" => [
                        "idCategoria"     => $envio->categoriaEnvio->idCategoria ?? null,
                        "nombreCategoria" => $envio->categoriaEnvio->nombreCategoria ?? null,
                        "precioCategoria" => $envio->categoriaEnvio->precioCategoria ?? null,
                        "descripcion"     => $envio->categoriaEnvio->descripcion ?? null,
                    ],

                    "user" => [
                        "idUser" => $envio->user->idusuarios ?? null,
                        "nombreUsuario" => $envio->user->nombreCompleto ?? null,
                        "email" => $envio->user->email ?? null,
                    ]
                ];
            });

            return [
                'success' => true,
                'message' => 'Lista de envíos',
                'data'    => $data,
                'status'  => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener envíos: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // GET BY ID
    public function getEnvioById(int $id): array
    {
        try {
            $envio = Envios::with(['user', 'recogidas.ciudades', 'entregas.ciudades', 'categoriaEnvio'])->findOrFail($id);

        $data = [
            "idEnvio"                   => $envio->idEnvio,
            "nombreRemitente"           => $envio->nombreRemitente,
            "num_ContactoRemitente"     => $envio->num_ContactoRemitente,
            "nombreDestinatario"        => $envio->nombreDestinatario,
            "num_ContactoDestinatario"  => $envio->num_ContactoDestinatario,
            "metodoPago"                => $envio->metodoPago,
            "costosTotal_Envio"         => $envio->costosTotal_Envio,
            "fechaEnvio"                => $envio->fechaEnvio,

            "recogidas" => [
                "idRecogida"                => $envio->recogidas->idRecogida ?? null,
                "fechaRecogidaSeleccionada" => $envio->recogidas->fechaRecogidaSeleccionada ?? null,
                "fechaRecogidaFinal"        => $envio->recogidas->fechaRecogidaFinal ?? null,
                "direccionRecogida"         => $envio->recogidas->direccionRecogida ?? null,
                "ciudad" => [
                    "idCiudad" => $envio->recogidas->ciudades->idCiudad ?? null,
                    "nombre"   => $envio->recogidas->ciudades->nombreCiudad ?? null,
                    "precioCiudad" => $envio->recogidas->ciudades->costoPor_Ciudad ?? null,
                ],
            ],

            "entregas" => [
                "idEntrega"                => $envio->entregas->idEntrega ?? null,
                "fechaEntregaSeleccionada" => $envio->entregas->fechaEntregaSeleccionada ?? null,
                "fechaEntregaFinal"        => $envio->entregas->fechaEntregaFinal ?? null,
                "direccionEntrega"         => $envio->entregas->direccionEntrega ?? null,
                "ciudad" => [
                    "idCiudad" => $envio->entregas->ciudades->idCiudad ?? null,
                    "nombre"   => $envio->entregas->ciudades->nombreCiudad ?? null,
                    "precioCiudad" => $envio->entregas->ciudades->costoPor_Ciudad ?? null,
                ],
            ],

            "categoria_envio" => [
                "idCategoria"     => $envio->categoriaEnvio->idCategoria ?? null,
                "nombreCategoria" => $envio->categoriaEnvio->nombreCategoria ?? null,
                "precioCategoria" => $envio->categoriaEnvio->precioCategoria ?? null,
                "descripcion"     => $envio->categoriaEnvio->descripcion ?? null,
            ],

            "user" => [
                "idUser" => $envio->user->idusuarios ?? null,
                "nombreUsuario" => $envio->user->nombreCompleto ?? null,
                "email" => $envio->user->email ?? null,
            ]
        ];

        return [
            'success' => true,
            'message' => 'Detalles del envío',
            'data'    => $data,
            'status'  => 200
        ];

        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // POST
    public function createEnvio(array $data): array
    {
        try {
            $envio = Envios::create($data);
            return [
                'success' => true,
                'data' => $envio,
                'message' => 'Envío creado exitosamente',
                'status' => 201
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al crear envío: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al crear envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    //PUT
    public function updateEnvio(int $id, array $data): array
    {
        try {
            $envio = Envios::findOrFail($id);
            $envio->update($data);
            return [
                'success' => true,
                'data' => $envio,
                'message' => 'Envío actualizado completamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar envío: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    // PATCH
    public function updateSpecificSection(int $id, array $data): array
    {
        try {
            $envio = Envios::findOrFail($id);

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
                'message' => 'Envío actualizado parcialmente',
                'data' => $envio,
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }


    // DELETE
    public function deleteEnvio(int $id): array
    {
        try {
            $envio = Envios::findOrFail($id);
            $envio->delete();
            return [
                'success' => true,
                'message' => 'Envío eliminado correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Envío con ID $id no encontrado",
                'status' => 404
            ];
        } catch (QueryException $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar envío: ' . $e->getMessage(),
                'status' => 500
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar envío: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}
