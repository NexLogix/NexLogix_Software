<?php
namespace App\Models\Interfaces\Reportes;

interface IReportesService
{
    public function getAllReportes();
    public function getAllReportes_ById(int $id): array;
    public function create_Reportes(array $data): array;
    public function update_Reportes(int $id, array $data);
    public function delete_Reportes(int $id): array;
}
