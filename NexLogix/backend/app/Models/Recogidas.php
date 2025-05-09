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

    // una recogida pertenece solo a una  CIUDAD, N:1
    public function ciudades() {
        return $this->belongsTo(Ciudades::class, 'idCiudad');
    }
 
    // Una recogida tiene muchos envios
    public function envios()
    {
        return $this->hasMany(Envios::class,
            'idRecogida',
            'idRecogida',
        );
    }
}
