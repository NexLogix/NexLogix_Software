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
        'fechaAsignacionRuta',
        'horaEntrada',
        'horaSalida',
        'idCiudad',
    ];

     // muchas Rutas pertenecen a una CIUDAD
     public function cuidades() {
        return $this->belongsTo(Cuidades::class, 'idCiudad');
    }
}
