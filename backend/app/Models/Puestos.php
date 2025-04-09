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
    ];

    // Relación con UsuariosPorPuesto (Uno a Muchos)
    public function areas()
    {
        return $this->hasMany(Areas::class,
        'idPuestos',
        'idPuestos');
    }
}
