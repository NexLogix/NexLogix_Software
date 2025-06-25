<?php
namespace App\Services\Auditoria;

use App\Models\AuditLog;
use App\Models\Interfaces\Auditoria\IAuditLogService;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AuditLogService implements IAuditLogService
{
    public function getAllAudits(): array
    {
        try {
            $auditoria = AuditLog::all();
            if ($auditoria->isEmpty()) {
                return [
                    'success' => false,
                    'message' => 'No hay auditorías registradas',
                    'status' => 404
                ];
            }
            return [
                'success' => true,
                'message' => 'Historial de auditoría:',
                'data' => $auditoria,
                'status' => 200
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener auditorías: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    public function getAuditoryByID(int $id): array
    {
        try {
            $auditoria = AuditLog::findOrFail($id);
            return [
                'success' => true,
                'data' => $auditoria,
                'message' => 'Auditoría encontrada',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Auditoría con ID $id no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al obtener la auditoría: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    public function updateAuditory(int|string $idOrValue, array $data): array
    {
        try {
            $auditoria = AuditLog::findOrFail($idOrValue);
            if (empty($data)) {
                return [
                    'success' => true,
                    'data' => $auditoria,
                    'message' => 'Auditoría encontrada (sin cambios)',
                    'status' => 200
                ];
            }

            $auditoria->update($data);

            return [
                'success' => true,
                'data' => $auditoria,
                'message' => 'Auditoría actualizada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Auditoría con ID $idOrValue no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al actualizar auditoría: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }

    public function deleteAuditory(int|string $value): array
    {
        try {
            $auditoria = AuditLog::findOrFail($value);
            $auditoria->delete();
            return [
                'success' => true,
                'message' => 'Auditoría eliminada correctamente',
                'status' => 200
            ];
        } catch (ModelNotFoundException $e) {
            return [
                'success' => false,
                'message' => "Auditoría con ID $value no encontrada",
                'status' => 404
            ];
        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => 'Error al eliminar auditoría: ' . $e->getMessage(),
                'status' => 500
            ];
        }
    }
}
