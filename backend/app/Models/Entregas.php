<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entregas extends Model
{
    use HasFactory;
    protected $table = 'entregas';
    protected $primaryKey = 'idEntrega';
    public $timestamps = false;

    protected $fillable = [
        'fechaEntregaSeleccionada',
        'fechaEntregaFinal',
        'direccionEntrega',
        'idCiudad',
    ];

    // Una entrega solo pertenece a una CIUDAD
    public function ciudades() {
        return $this->belongsTo(Ciudades::class, 'idCiudad');
    }

    // una entrega tiene muchos envios
    public function envios()
    {
        return $this->hasMany(Envios::class,
        'idEntrega',
        'idEntrega');
    }
}
