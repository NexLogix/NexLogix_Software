<?php
namespace App\Models\Interfaces\AsignacionRutas;

// se pone AR por Aasignacion Rutas
interface IAsignacionRutasService
{
    public function getAll_AR();
    public function get_AR_ById(int $id): array;
    public function create_AR(array $data): array;
    public function update_AR(int $id, array $data);
    public function delete_AR(int $id): array;
}
