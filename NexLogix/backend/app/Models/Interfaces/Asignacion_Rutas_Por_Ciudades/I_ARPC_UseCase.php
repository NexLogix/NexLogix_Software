<?php
namespace App\Models\Interfaces\AsignacionRutas;

// se pone AR por Aasignacion Rutas
interface I_ARPC_UseCase
{
    public function handleCreate_ARPC(array $data): array;
    public function handleUpdate_ARPC(int $id, array $data);
}
