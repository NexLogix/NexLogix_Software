<?php
namespace App\Models\Interfaces\AsignacionRutas;

// se pone AR por Aasignacion Rutas
interface IAsignacionRutasUseCase
{
    public function handleCreate_AR(array $data): array;
    public function handleUpdate_AR(int $id, array $data);
}
