<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
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

    protected $hidden = [
        'contrasena', 'remember_token',
    ];

    public function cats(): array
    {
        return [
            'email_verified_at' => 'datetime',
        ];
    }

    // SE OBTIENE EL TOKEN
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    //
    public function getJWTCustomClaims()
    {
        return [];
    }

// FUNCIONES Y RELACIONES DE LA BASE DE DATOS

    // Un usuario pertenece a un estado (1:N)
    public function estado()
    {
        return $this->belongsTo(Estado::class, 'idestado');
    }

    // Un usuario pertenece a un rol (1:N)
    public function roles()
    {
        return $this->belongsTo(Roles::class, 'idRole');
    }

    // Un usuario puede tener y pertenecer a múltiples puestos (1:N)
    public function usuariosPorPuesto()
    {
        return $this->hasMany(UsuariosPorPuesto::class, 'idusuarios');
    }

    public function reportes(){
        return $this->hasMany(Reportes::class,'idReporte');
    }

    // Un usuario puede tener y hacer muchos envíos (1:N)
    public function envios()
    {
        return $this->hasMany(Envios::class, 'idusuarios');
    }
}
