<?php
namespace App\UseCases\Auditorias;
use App\Models\Interfaces\Auditoria\IAuditLogService;
use App\Models\Interfaces\Auditoria\IAudit_log_UseCase;
use Illuminate\Support\Facades\Validator;


class AuditoriasUseCase implements IAudit_log_UseCase
{
    protected IAuditLogService  $audit_log_service;

    public function __construct(IAuditLogService $audit_log_service)
    {
        $this->audit_log_service = $audit_log_service;
    }

    function handleUpdateAuditory(int $id, array $data): array
    {
        $validator = Validator::make($data, [
            "action"         => "sometimes|required|string|max:255",
            "resource_type"  => "sometimes|nullable|string|max:255",
            "resource_id"    => "sometimes|nullable|numeric|min:0",
            "details"        => "sometimes|nullable|array",
            "updated_at"     => "sometimes|nullable|date",
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'message' => 'Datos inválidos',
                'errors'  => $validator->errors(),
                'status'  => 400
            ];
        }

        // Si pasa la validación, se delega al servicio para actualizar
        return $this->audit_log_service->updateAuditory($id, $validator->validated());
    }
}
