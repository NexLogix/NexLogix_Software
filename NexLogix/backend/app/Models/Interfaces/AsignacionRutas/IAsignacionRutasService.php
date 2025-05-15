<?php
namespace App\Models\Interfaces\AsignacionRutas;

interface IAsignacionRutasService
{
    public function getAllCiudades();
    public function getCiudadById(int $id): array;
    public function createCiudad(array $data): array;
    public function updateCiudad(int $id, array $data);
    public function updateSpecificSectionCiudad(int $id, array $data): array;
    public function deleteCiudad(int $id): array;
}
