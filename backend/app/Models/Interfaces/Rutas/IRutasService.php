<?php
namespace App\Models\Interfaces\Rutas;

interface IRutasService
{
    public function getAllRutas();
    public function getRutaByID(int $id): array;
    public function createRuta(array $data): array;
    public function updateRuta(array $data, int $id): array;
    public function deleteRuta(int $id): array;
}
