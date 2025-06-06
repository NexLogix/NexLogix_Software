<?php
namespace App\Models\Interfaces\Reportes;

interface IReportes_UseCases {
    public function handleCreate_ARPC(array $data): array;
    public function handleUpdate_ARPC(int $id, array $data);
}
