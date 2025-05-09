<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Puestos extends Model
{
    use HasFactory;
    protected $table = 'puestos';
    protected $primaryKey = 'idPuestos';
    public $timestamps = false;

    protected $fillable = [
        'nombrePuesto',
        'fechaAsignacionPuesto',
        'descripcionPuesto',
        'idArea',
    ];

    // Relación: Un Puesto pertenece a una sola Área
    public function areas()
    {
        return $this->belongsTo(Areas::class, 'idArea', 'idArea');
    }
}
