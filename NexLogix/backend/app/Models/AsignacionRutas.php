<?php
namespace App\Models;

//RELACION N:1 con vehiculos y rutas
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AsignacionRutas extends Model
{
    use HasFactory;
    public $timestamps = 'false';
    protected $table = 'asignacionrutas';
    protected $primaryKey = 'idAsignacionRuta';
    protected $fillable = [
        'idVehiculo', 'idRuta',
    ];

    public function vehiculos()
    {
        return $this->hasMany(Vehiculos::class,
        'idVehiculo',
        'idVehiculo');
    }

    public function rutas()
    {
        return $this->hasMany(Rutas::class,
        'idRuta',
        'idRuta');
    }
}
