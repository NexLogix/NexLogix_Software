<?php
namespace App\Models\Interfaces\CategoriaEnvios;

interface ICategoriaEnviosService
{
    public function getAllCategoriasEnvios();
    public function getCategoriaEnvioById(int $id): array;
    public function createCategoriaEnvio(array $data): array;
    public function updateCategoriaEnvio(int $id, array $data): array;
    public function updateSpecificSection(int $id, array $data): array;
    public function deleteCategoriaEnvio(int $id): array;
}
