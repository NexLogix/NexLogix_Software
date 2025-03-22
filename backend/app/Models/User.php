<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $table = 'usuarios'; // Indicar que la tabla en MySQL se llama "usuarios"
    protected $fillable = [
        'documentoIdentidad',
        'nombreCompleto',
        'email',
        'numContacto',
        'direccionResidencia',
        'fechaCreacion',
        'contrasena',
        'estado_id',
        'role_id',
    ];

    public function state() {
        return $this->belongsTo(Estado::class, 'estadoId');
    }

    public function Role() {
        return $this->belongsTo( Roles::class, 'roleId');
    }

}
