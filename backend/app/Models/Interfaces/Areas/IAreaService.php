<?php
namespace App\Models\Interfaces\Areas;

interface IAreaService
{
    public function getAll(): array;
    public function getAreaById(int $id): array;
    public function createArea(array $data): array;
    public function updateArea(int $id, array $data): array;
    public function updateSpecificSection(int $id, array $data): array;
    public function deleteArea(int $id): array;

}
