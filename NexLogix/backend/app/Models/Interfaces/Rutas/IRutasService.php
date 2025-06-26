<?php
namespace App\Models\Interfaces\Rutas;

interface IRutasService
{
    public function getAllRutas();
    public function getRutaByID(string $value): array;
    public function createRuta(array $data): array;
    public function updateRuta(string $value, array $data): array;
    public function deleteRuta(string $value): array;
}
