<?php
namespace App\Models\Interfaces\Areas;
interface IAreaUseCase
{
    public function handleCreateArea(array $data): array;
    public function handleUpdateArea(int $id, array $data): array;
    public function handleUpdateSpecificSection(int $id, array $data): array;
}
