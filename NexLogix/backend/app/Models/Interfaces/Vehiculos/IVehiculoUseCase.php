<?php
namespace App\Models\Interfaces\Vehiculos;
interface IVehiculoUseCase
{
    public function handleCreateVehiculo(array $data): array;
    public function handleUpdateVehiculo(int $id, array $data);

}

