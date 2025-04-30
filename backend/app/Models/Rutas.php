<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rutas extends Model
{
    use HasFactory;
    protected $table = 'rutas';
    protected $primaryKey = 'idRuta';
    public $timestamps = false;
    protected $fillable = [
        'nombreRuta',
        'horaEntrada',
        'horaSalida',
        'idCiudad',
    ];

     // muchas Rutas pertenecen a una CIUDAD
     public function ciudades() {
        return $this->belongsTo(Ciudades::class, 'idCiudad');
    }
}
