<?php
namespace App\Models\Interfaces\Areas;

interface IAreaService
{
    public function getAll(): array;
    public function getAreaById($id): array;
    public function createArea(array $data): array;
    public function updateArea($id, array $data): array;
    public function updateSpecificSection($id, array $data): array;
    public function deleteArea($id): array;

}
