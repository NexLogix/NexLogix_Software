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

    // Un Vehiculo puede tener varios usuarios asignados
    public function users()
    {
        return $this->hasMany(User::class,
        'idusuarios',
        'idusuarios');
    }

    // Muchos vehiculos están relacionados con AsignacionRuta
    public function asignacionRutas()
    {
        return $this->hasMany(AsignacionRutas::class,
            'idAsignacionRuta',
            'idAsignacionRuta',
        );
    }

}
