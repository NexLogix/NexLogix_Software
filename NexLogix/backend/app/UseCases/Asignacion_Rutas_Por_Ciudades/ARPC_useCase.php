<?php
namespace App\UseCases\Asignacion_Rutas_Por_Ciudades;

use App\Services\Asignacion_Rutas_Por_Ciudades\ARPC_Service;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ARPC_useCase
{
    protected ARPC_Service $service;

    public function __construct(ARPC_Service $service)
    {
        $this->service = $service;
    }

    // CREATE
    public function handleCreateARPC(array $data): array
    {
        // Normaliza idCiudad a array si viene como valor individual
        if (isset($data['idCiudad']) && !is_array($data['idCiudad'])) {
            $data['idCiudad'] = [$data['idCiudad']];
        }

        $validator = Validator::make($data, [
            'idRuta'   => 'required|integer|exists:rutas,idRuta',
            'idCiudad' => 'required|array|min:1',
            'idCiudad.*' => 'integer|exists:ciudades,idCiudad',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación en asignación',
                'errors'  => $validator->errors(),
                'status'  => 422,
            ];
        }

        $resultados = [];
        foreach ($data['idCiudad'] as $ciudad) {
            $resultados[] = $this->service->create([
                'idRuta' => $data['idRuta'],
                'idCiudad' => $ciudad,
            ]);
        }

        return [
            'success' => true,
            'message' => 'Asignaciones creadas',
            'data' => $resultados,
            'status' => 201,
        ];
    }

    // PATCH
    public function handleUpdateARPC(string $idOrValue, array $data): array
    {
        $encontrar_ARPC = $this->service->getById($idOrValue);

        if (!$encontrar_ARPC['success']) {
            return [
                'success' => false,
                'message' => 'Asignacion de Rutas por Ciudades no encontrada',
                'status'  => 404
            ];
        }

        $validator = Validator::make($data, [
            'idRuta' => [
                'sometimes',
                'integer',
                Rule::exists('rutas', 'idRuta'),
                Rule::unique('Asignacion_Rutas_Por_Ciudades')
                    ->where(function ($query) use ($data) {
                        if (isset($data['idCiudad'])) {
                            $query->where('idCiudad', $data['idCiudad']);
                        }
                    })
                    ->ignore($idOrValue, 'idasignacion_rutas_por_ciudades'),
            ],
            'idCiudad' => [
                'sometimes',
                'integer',
                Rule::exists('ciudades', 'idCiudad'),
                Rule::unique('Asignacion_Rutas_Por_Ciudades')
                    ->where(function ($query) use ($data) {
                        if (isset($data['idRuta'])) {
                            $query->where('idRuta', $data['idRuta']);
                        }
                    })
                    ->ignore($idOrValue, 'idasignacion_rutas_por_ciudades'),
            ],
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación en actualización',
                'errors'  => $validator->errors(),
                'status'  => 422,
            ];
        }

        // 3) Persistir cambios
        return $this->service->update($idOrValue, $validator->validated());
    }
}
