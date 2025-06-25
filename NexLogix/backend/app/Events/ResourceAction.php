<?php

namespace App\Events;

// eventos por cada accion
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ResourceAction
{
    /*
        Los eventos funcionan como un **orquestador** de procesos en segundo plano.
        Su función es **anunciar que ocurrió una acción** relevante en el sistema,
        como una creación, modificación o eliminación de recursos.

        No ejecuta lógica por sí mismo, solo envía los datos necesarios para que
        los Listeners reaccionen según lo que ocurrió.

        En este caso, este evento notifica que un usuario realizó una acción sobre
        un recurso (por ejemplo: crear un producto, eliminar un envío, etc.).
    */

    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $userId;
    public $action;
    public $resourceType;
    public $resourceId;
    public $details;

    /*
        Constructor del evento: recibe los datos clave sobre la acción del usuario:
        - ID del usuario que hizo la acción
        - Tipo de acción (crear, actualizar, eliminar, etc.)
        - Tipo de recurso (producto, cliente, etc.)
        - ID del recurso afectado (opcional)
        - Detalles adicionales (opcional, como observaciones, IP, etc.)
    */


    public function __construct(int $userId, string $action, string $resourceType, ?string $resourceId = null, array $details = [])
    {
        $this->userId = $userId;
        $this->action = $action;
        $this->resourceType = $resourceType;
        $this->resourceId = $resourceId;
        $this->details = $details;
    }
}