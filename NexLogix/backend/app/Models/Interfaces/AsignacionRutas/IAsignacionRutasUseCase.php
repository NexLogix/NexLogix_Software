<?php
namespace App\Models\Interfaces\AsignacionRutas;

interface IAsignacionRutasUseCase
{
    public function handleCreateCiudad(array $data): array;
    public function handleUpdateCiudad(int $id, array $data);
}
