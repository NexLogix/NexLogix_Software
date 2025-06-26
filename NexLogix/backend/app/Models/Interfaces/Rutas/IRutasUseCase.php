<?php
namespace App\Models\Interfaces\Rutas;

interface IRutasUseCase
{
    public function handleCreateRuta(array $data): array;
    public function handleUpdateRuta(string $value, array $data): array;
}