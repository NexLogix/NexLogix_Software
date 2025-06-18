<?php
namespace App\UseCases\CategoriaEnvios;

use App\Models\Interfaces\CategoriaEnvios\ICategoriaEnviosService;
use App\Models\Interfaces\CategoriaEnvios\ICategoriaEnviosUseCase;
use Illuminate\Support\Facades\Validator;

class CategoriaEnvioUseCase implements ICategoriaEnviosUseCase
{
    protected ICategoriaEnviosService $categoria_envios_service;
    public function __construct(ICategoriaEnviosService $categoria_envios_service)
    {
        $this->categoria_envios_service = $categoria_envios_service;
    }

    // POST USECASE
    public function handleCreateCategoriaEnvio(array $data): array
    {
        $validator = Validator::make($data, [
            'nombreCategoria' => 'required|string|max:200|unique:categoriaenvios,nombreCategoria',
            'precioCategoria'=> 'required|numeric|min:0',
            'descripcion' => 'required|string',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        return $this->categoria_envios_service->createCategoriaEnvio($data);
    }

    // PUT USECASE
    public function handleUpdateCategoriaEnvio(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreCategoria' => [
                // metodo para que no lance error si no se actualiza nombreCategoria
                'required',
                'string',
                'max:200',
                // "Quiero validar que nombreCategoria sea único... excepto para el registro con idCategoria = $id."
                'unique:categoriaenvios,nombreCategoria,' . $id . ',idCategoria', // ignora el unique piendo el id
            ],
            'precioCategoria'=> 'required|numeric|min:0',
            'descripcion' => 'required|string',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        return $this->categoria_envios_service->updateCategoriaEnvio($id, $data);
    }

    // PATCH USECASE
    public function handleUpdateSpecificSection(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            'nombreCategoria' => [
                // metodo para que no lance error si no se actualiza nombreCategoria
                'sometimes',
                'string',
                'max:200',
                // "Quiero validar que nombreCategoria sea único... excepto para el registro con idCategoria = $id."
                'unique:categoriaenvios,nombreCategoria,' . $id . ',idCategoria', // ignora el unique piendo el id
            ],
            'precioCategoria'=> 'sometimes|numeric|min:0',
            'descripcion' => 'sometimes|string',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Errores de validación',
                'errors' => $validator->errors(),
                'status' => 422
            ];
        }
        return $this->categoria_envios_service->updateSpecificSection($id, $data);
    }
}
