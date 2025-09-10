<?php

namespace App\Http\Controllers\Auditorias;

use App\Automatization\Events\ResourceAction;
use App\Http\Controllers\Controller;
use App\Models\Interfaces\Auditoria\IAudit_log_UseCase;
use App\Models\Interfaces\Auditoria\IAuditLogService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuditoriaController extends Controller
{
    protected IAuditLogService $audit_log_service;
    protected IAudit_log_UseCase $audit_log_use_case;

    // constructor de las imterfaces de Auditorias, aqui las llamamos
    public function __construct(IAuditLogService $audit_log_service, IAudit_log_UseCase $audit_log_use_case)
    {
        $this->audit_log_service = $audit_log_service;
        $this->audit_log_use_case = $audit_log_use_case;
    }

    //  CONTROLLER GET
    public function showAllAuditorias()
    {
        $response = $this->audit_log_service->getAllAudits();// llama al metodo asignado de auditorias desde su interface service
        return response()->json($response, $response['status']);
    }

    // CONTROLLER BY ID
    public function showAuditoriaByID(int $id)
    {
        $response = $this->audit_log_service->getAuditoryByID($id);// llama al metodo asignado de auditorias desde su interface service
        return response()->json($response, $response['status']);
    }

    // CONTROLLER PATCH
    public function updateAuditoria(Request $request, int $id)
    {
        $response = $this->audit_log_use_case->handleUpdateAuditory($id, $request->all());
        if ($response['success']) {
            $user_id = Auth::id(); // se rerifica si el usuario esta autenticado con JWT
            if($user_id) {
                // Dispara evento de auditoria de quien la edito e informacion al respecto a ella.
                event(new ResourceAction(
                    $user_id,
                    'Solicitud PATCH',
                    'Gestion Auditorias',
                    $response['data']['id'],
                    ['data' => $request->all()]
                ));
            }
        }
        return response()->json($response, $response['status']);
    }

    // DELETE CONTROLLER
    public function deleteAuditoria(int $id)
    {
        $response = $this->audit_log_service->deleteAuditory($id);// llama al metodo asignado de auditorias desde su interface service
        if ($response['success']) {
            $user_id = Auth::id(); // se rerifica si el usuario esta autenticado con JWT
            if($user_id) {
                // Dispara evento de auditoria de quien la edito e informacion al respecto a ella.
                event(new ResourceAction(
                    $user_id,
                    'Solicitud DELETE',
                    'Gestion Auditorias',
                    $id,
                    []
                ));
            }
        }
        return response()->json($response, $response['status']);
    }
}
