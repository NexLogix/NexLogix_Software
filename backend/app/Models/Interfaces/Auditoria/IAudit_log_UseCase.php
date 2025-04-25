<?php
namespace App\Models\Interfaces\Auditoria;

interface IAudit_log_UseCase
{
    public function handleUpdateAuditory(int $id, array $data): array;
}
