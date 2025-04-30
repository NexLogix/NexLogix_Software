<?php
namespace App\Models\Interfaces\Rutas;

interface IRutasUseCase
{
    public function handleCreateRuta(array $data): array;
    public function handleUpdateRuta(array $data, int $id): array;
}
