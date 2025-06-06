<?php
namespace App\Models\Interfaces\Reportes;

interface IReportesService
{
    public function getAllReportes();
    public function getAllReportes_ById(int $id): array;
    public function create_Reportes(array $data): array;
    public function update_ARPC(int $id, array $data);
    public function delete_ARPC(int $id): array;
}