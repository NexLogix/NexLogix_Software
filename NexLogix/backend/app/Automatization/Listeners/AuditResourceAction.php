<?php

namespace App\Automatization\Listeners;

use App\Automatization\Events\ResourceAction;
use App\Models\AuditLog; // llama al modelo AuditLog que es una tabla en la DB

/*
    Los Listeners se activan automaticamente cuando se dispara el evento ResourceAction.

    Su responsabilidad es **registrar un log de auditoría** en la base de datos con
    la información del evento. Así queda guardado un historial de qué usuario hizo qué cosa,
    sobre qué recurso y cuándo.

    Esta lógica está separada del flujo principal para no sobrecargar el código central,
    y para mantener el principio de responsabilidad única.
*/

class AuditResourceAction
{

    /*
        El método `handle` recibe el evento con todos sus datos y ejecuta la acción correspondiente.

        En este caso, se crea un registro en la tabla `audit_logs` usando el modelo `AuditLog`.
        Esto permite llevar un historial detallado de las acciones del sistema.
    */

    public function handle(ResourceAction $event): void
    {
        AuditLog::create([ // Importa el model de AuditLog
            'user_id' => $event->userId,
            'action' => $event->action,
            'resource_type' => $event->resourceType,
            'resource_id' => $event->resourceId,
            'details' => $event->details,
        ]);
    }
}
