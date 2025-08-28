<?php
namespace App\Models\Interfaces\Vehiculos;

interface IVehiculoService
{
    public function getAllVehiculos(): array;
    public function getVehiculoById(string $value): array;
    public function createVehiculo(array $data): array;
    public function updateVehiculo(string $value, array $data): array;
    public function deleteVehiculo(string $value): array;
}