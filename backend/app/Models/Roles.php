<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    use HasFactory;

    protected $table = 'roles';
    protected $primaryKey = 'idRole';

    protected $fillable = [
        'nombreRole',
        'descripcionRole',
        'fechaAsignacionRole',
    ];

    public function users()
    {
        return $this->hasMany(
            User::class, 'idRole','idRoles',
        );
    }

    // Relación muchos a muchos con la tabla intermedia permisosgeneralespor_role
    public function permisosGenerales() {
        return $this->belongsToMany(
            PermisosGenerales::class,
            'permisosgeneralespor_role',
            'idRole',
            'idPermisosGenerales'
        );
    }
}
