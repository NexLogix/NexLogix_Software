<?php
namespace App\Models\Interfaces\Entregas;
interface IEntregaUseCase
{
    public function handleCreateEntrega(array $data): array;
    public function handleUpdateEntrega(int $id, array $data): array;
    public function handleUpdateSpecificSection_R(int $id, array $data): array;
}
