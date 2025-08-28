<?php
namespace App\Models\Interfaces\Ciudades;
interface ICiudadesService
{
    public function getAllCiudades();
    public function getCiudadById(string $value): array;
    public function createCiudad(array $data): array;
    public function updateCiudad(string $value, array $data);
    public function updateSpecificSectionCiudad(string $value, array $data): array;
    public function deleteCiudad(string $value): array;
}
