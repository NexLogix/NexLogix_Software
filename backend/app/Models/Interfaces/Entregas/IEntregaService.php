<?php
namespace App\Models\Interfaces\Entregas;
interface IEntregaService
{
    public function getAllEntregas(): array;
    public function getEntregaById(int $id): array;
    public function createEntrega(array $data): array;
    public function updateSpecificFields_R(int $id, array $data): array;
    public function deleteEntrega(int $id): array;
}
