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

// RELACIONES DE MUCHOS A MUCHOS PERO AQUI MISMO SE HACEN LAS TABLAS INTERMEDIAS

    // Tabla intermedia areasporpuesto entre AREAS y PUESTOS
    public function areas()
    {
        return $this->belongsToMany(
         Areas::class,'areasporpuesto',
         'idPuestos',
         'idArea'
        );
    }

    // Tabla intermedia
    public function puestos()
    {
        return $this->belongsToMany(PermisosEspeciales::class,
        'PermisosEspeciales_Por_Puesto',
        'idPuestos',
        'idPermisosEspeciales',
        );
    }
}
