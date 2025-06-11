<?php
namespace App\Models\Interfaces\Asignacion_Rutas_Por_Ciudades;
interface I_ARPC_Service
{
    public function getAll_ARPC();
    public function get_ARPC_ById(int $id): array;
    public function create_ARPC(array $data): array;
    public function update_ARPC(int $id, array $data);
    public function delete_ARPC(int $id): array;
}
