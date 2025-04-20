<?php
namespace App\Models\Interfaces\Recogidas;

interface IRecogidaService
{
    public function getAllRecogidas(): array;
    public function getRecogidaById(int $id): array;
    public function createRecogida(array $data): array;
    public function updateSpecificFields_R(int $id, array $data): array;
    public function deleteRecogida(int $id): array;
}
