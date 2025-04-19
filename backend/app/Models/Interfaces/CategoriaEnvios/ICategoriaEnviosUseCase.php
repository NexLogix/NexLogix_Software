<?php
namespace App\Models\Interfaces\CategoriaEnvios;
interface ICategoriaEnviosUseCase
{
    public function handleCreateCategoriaEnvio(array $data): array;
    public function handleUpdateCategoriaEnvio(int $id, array $data): array;
    public function handleUpdateSpecificSection(int $id, array $data): array;
}
