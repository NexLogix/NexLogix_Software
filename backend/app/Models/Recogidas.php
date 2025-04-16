<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recogidas extends Model
{
    use HasFactory;
    protected $table = 'recogidas';
    protected $primaryKey = 'idRecogida';
    public $timestamps = false;

    protected $fillable = [
        'fechaRecogidaSeleccionada',
        'fechaRecogidaFinal',
        'direccionRecogida',
        'idCiudad',
    ];

    // muchas recogidas pertenecen a una CIUDAD
    public function cuidades() {
        return $this->belongsTo(Cuidades::class, 'idCiudad');
    }
}
