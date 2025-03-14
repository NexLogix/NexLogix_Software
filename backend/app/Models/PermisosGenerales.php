<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermisosGenerales extends Model
{
    use HasFactory;

    protected $table = 'permisos_generales'; // Asegúrate que coincida con tu base de datos

    protected $fillable = [
        'nombrePermisoGeneral',
        'fechaAsignacionPermisoGeneral',
        'descripcionPermisoGeneral',
    ];

    public function Roles()  {
        return $this->belongsToMany(
            Roles::class,
            'permisos_generales_roles',
            'permisosGenerales_id',
            'roles_id'
        );
    }
}
