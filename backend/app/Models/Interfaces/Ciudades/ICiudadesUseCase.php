<?php
namespace App\Models\Interfaces\Ciudades;
interface ICiudadesUseCase
{
    public function handleCreateCiudad(array $data): array;
    public function handleUpdateSpecificSectionC(int $id, array $data): array;
}
