<?php
namespace App\Models\Interfaces\Reportes;

interface IReportes_UseCases {
    public function handleCreateReporte(array $data): array;
    public function handleUpdateReporte(int $id, array $data);
}
