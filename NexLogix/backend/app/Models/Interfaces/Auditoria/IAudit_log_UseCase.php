<?php
namespace App\Models\Interfaces\Auditoria;

interface IAudit_log_UseCase
{
    public function handleUpdateAuditory(int|string $idOrValue, array $data): array;
}
