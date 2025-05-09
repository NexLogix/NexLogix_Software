<?php
namespace App\Models\Interfaces\Auditoria;
interface IAuditLogService
{
    public function getAllAudits();
    public function getAuditoryByID(int $id): array;
    public function updateAuditory(int $id, array $data): array;
    public function deleteAuditory(int $id): array;
}
