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
        'marcaVehiculo', 'tipoVehiculo', 'placa',
    ];

    // Un vehiculo puede estar asignado a muchos usuarios
    public function users()
    {
        return $this->hasMany(User::class, 'vehiculo_id', 'idVehiculo');
        // 'vehiculo_id' = foreign key en la tabla users
        // 'idVehiculo' = local key en esta tabla
    }

    // Un vehiculo puede tener muchas asignaciones de rutas
    public function asignacionRutas()
    {
        return $this->hasMany(AsignacionRutas::class, 'vehiculo_id', 'idVehiculo');
        // 'vehiculo_id' = foreign key en AsignacionRutas
    }
}
