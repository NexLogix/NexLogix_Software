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
    public function usuariosPorPuesto()
    {
        return $this->hasMany(UsuariosPorPuesto::class, 'idPuestos');
    }

    public function areas()
    {
        return $this->belongsToMany(
         Areas::class,
         'areasporpuesto',
         'idPuestos',
         'idArea'
        );
    }
}
