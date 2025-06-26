<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculos extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'vehiculos';
    protected $primaryKey = 'idVehiculo';

    protected $fillable = [
        'marcaVehiculo',
        'placa',
        'tipoVehiculo',
        'capacidad',
        'estadoVehiculo',
        'ultimoMantenimiento',
    ];

    // Un vehiculo puede estar asignado a muchos usuarios
    public function users()
    {
        return $this->hasMany(User::class, 'vehiculo_id', 'idVehiculo');
    }

    // Un vehiculo puede tener muchas asignaciones de rutas
    public function asignacionRutas()
    {
        return $this->hasMany(Asignacion_Vehiculos_Por_Rutas::class, 'vehiculo_id', 'idVehiculo');
    }

    // Un vehiculo puede tener una asignación de conductor
    public function asignacionConductor()
    {
        return $this->hasMany(Asignacion_conductor_por_vehiculos::class,
        'idVehiculo',
        'idVehiculo'
        );
    }
}
