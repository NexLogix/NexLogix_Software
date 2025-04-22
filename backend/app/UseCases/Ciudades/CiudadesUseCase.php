<?php
namespace App\UseCases\Ciudades;

use App\Models\Interfaces\Ciudades\ICiudadesService;
use App\Models\Interfaces\Ciudades\ICiudadesUseCase;
use Illuminate\Support\Facades\Validator;

class CiudadesUseCase implements ICiudadesUseCase
{
    protected ICiudadesService $ciudades_service;

    public function __construct(ICiudadesService $ciudades_service)
    {
        $this->ciudades_service = $ciudades_service;
    }

    // POST USE CASE
    public function handleCreateCiudad(array $data): array
    {
        $validator = Validator::make($data, [
            "nombreCiudad"=> "required|string|max:255|unique:ciudades,nombreCiudad",
            "costoPor_Ciudad" =>  "required|numeric|min:0",
        ]);
        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        return $this->ciudades_service->createCiudad($data);
    }

    // PUT

    public function handleUpdateCiudad(int $id, array $data)
    {
        $validator = Validator::make($data, [
            "nombreCiudad"=> [
                "required",
                "string",
                "max:255",
                'nombreCiudad' => 'unique:ciudades,nombreCiudad,' . $id . ',idCiudad'
            ],
            "costoPor_Ciudad" =>  "required|numeric|min:0",
        ]);
        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        return $this->ciudades_service->updateCiudad($id, $data);
    }


    // PATCH SERVICES
    public function handleUpdateSpecificSectionC(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'idCiudad' => 'sometimes|numeric|min:0',
            "nombreCiudad"=> [
                "sometimes",
                "string",
                "max:255",
                'nombreCiudad' => 'unique:ciudades,nombreCiudad,' . $id . ',idCiudad'

            ],
            "costoPor_Ciudad" => 'sometimes|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        return $this->ciudades_service->updateSpecificSectionCiudad($id, $data);
    }
}
