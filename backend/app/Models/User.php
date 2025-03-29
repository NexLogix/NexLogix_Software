<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'usuarios'; // Nombre correcto de la tabla
    protected $primaryKey = 'idusuarios'; // Nombre correcto de la clave primaria
    public $timestamps = false; // No tiene `updated_at` ni `created_at`

    protected $fillable = [
        'documentoIdentidad',
        'nombreCompleto',
        'email',
        'numContacto',
        'direccionResidencia',
        'fechaCreacion',
        'contrasena',
        'idestado',  // FK de estado
        'idRole', // FK de roles
    ];

    public function estado() {
        return $this->belongsTo(Estado::class, 'idestado');
    }

    public function role() {
        return $this->belongsTo(Roles::class, 'idRole');
    }

     // Relación con UsuariosPorPuesto (Uno a Muchos)
     public function usuariosPorPuesto()
     {
        return $this->hasMany(UsuariosPorPuesto::class, 'idusuarios');
     }
}
