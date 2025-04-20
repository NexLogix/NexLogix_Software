<?php
namespace App\Models\Interfaces\Recogidas;
interface IRecogidaUseCase
{
    public function handleCreateRecogida(array $data): array;

    // public function handleUpdateRecogida(int $id, array $data): array;
    public function handleUpdateSpecificSection_R(int $id, array $data): array;
}
