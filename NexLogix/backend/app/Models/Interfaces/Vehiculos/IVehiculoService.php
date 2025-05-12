<?php
namespace App\Models\Interfaces\Vehiculos;

interface IVehiculoService
{
    public function getAllVehiculos(): array;
    public function getVehiculoById(int $id): array;
    public function createVehiculo(array $data): array;
    public function updateVehiculo(int $id, array $data): array;
    public function deleteVehiculo(int $id): array;
}
