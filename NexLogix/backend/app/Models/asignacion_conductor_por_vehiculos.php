<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class asignacion_conductor_por_vehiculos extends Model
{
    use HasFactory;

    protected $table = 'asignacion_conductor_por_vehiculos';
    protected $primaryKey = 'idAsignacion';
    public $timestamps = false;

    protected $fillable = [
        'fecha_asignacion_vehiculo',
        'fecha_entrega_vehiculo',
        'idConductor',
        'idVehiculo',
    ];

    // Una asignación pertenece a un conductor
    public function conductor()
    {
        return $this->belongsTo(Conductores::class, 'idConductor', 'idConductor');
    }

    // Una asignación pertenece a un vehículo
    public function vehiculo()
    {
        return $this->belongsTo(Vehiculos::class, 'idVehiculo', 'idVehiculo');
    }
}
/*
|--------------------------------------------------------------------------
| Lógica de negocio para la asignación de conductores a vehículos
|--------------------------------------------------------------------------
|
| Relación:
| - Muchos a muchos entre conductores y vehículos mediante la tabla
|   asignacion_conductor_por_vehiculos.
|
| Reglas de negocio:
|
| 1. Un conductor solo puede ser asignado a un vehículo si:
|    - El vehículo está en estado 'disponible'.
|    - El conductor tiene una licencia válida (no expirada).
|    - El tipo de licencia del conductor es compatible con el tipo de vehículo.
|    - El estado del usuario asociado al conductor es 'activo'.
|
| 2. Si no hay vehículos disponibles:
|    - Se puede poner en cola para los que estén en estado 'en_ruta'.
|    - No se puede asignar a vehículos en 'mantenimiento' o 'fuera_de_servicio'.
|
| 3. Compatibilidad de licencias:
|    - C1 solo puede conducir vehículos que requieren C1.
|    - C2 requiere licencia C2.
|    - C3 requiere licencia C3.
|    - No se puede asignar un vehículo de categoría C si el conductor solo tiene B1, B2, etc.
|
| 4. Validación del conductor:
|    - El usuario relacionado (relación conductor → usuario) debe tener estado 'activo'.
|    - Se verifica la vigencia de la licencia con respecto a la fecha actual.
|
*/
