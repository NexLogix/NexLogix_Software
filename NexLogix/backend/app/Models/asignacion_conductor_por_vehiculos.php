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