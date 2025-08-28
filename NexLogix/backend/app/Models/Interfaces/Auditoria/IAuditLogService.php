<?php
namespace App\Models\Interfaces\Auditoria;
interface IAuditLogService
{
    public function getAllAudits();
    public function getAuditoryByID(int $id): array;
    public function updateAuditory(int|string $idOrValue, array $data): array;
    public function deleteAuditory(int|string $value): array;
}
