<?php

namespace App\Models;

//RELACION N:1 con vehiculos y rutas
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsignacionRutas extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $table = 'asignacionrutas';
    protected $primaryKey = 'idAsignacionRuta';

    protected $fillable = [
        'idVehiculo', 'idRuta',
    ];

    // Cada asignación pertenece a un vehículo
    public function vehiculo()
    {
        return $this->belongsTo(Vehiculos::class, 'idVehiculo', 'idVehiculo');
    }

    // Cada asignación pertenece a una ruta
    public function ruta()
    {
        return $this->belongsTo(Rutas::class, 'idRuta', 'idRuta');
    }
}
