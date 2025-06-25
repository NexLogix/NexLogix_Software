<?php
namespace App\Models\Interfaces\Vehiculos;
interface IVehiculoUseCase
{
    public function handleCreateVehiculo(array $data): array;
    public function handleUpdateVehiculo(string $idOrPlaca, array $data);

}