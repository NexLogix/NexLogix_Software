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

    // muchas entregas pertenecen a una CIUDAD
    public function cuidades() {
        return $this->belongsTo(Cuidades::class, 'idCiudad');
    }
}
