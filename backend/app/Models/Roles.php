<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    use HasFactory;

    protected $table = 'roles';

    protected $fillable = [
        'nombreRole',
        'descripcionRole',
        'fechaAsignacionRole',
    ];

    public function generalPermissions() {
        return $this->hasMany(PermisosGenerales::class, 'role_id', 'id');
    }

    public function permisosGenerales() {
        return $this->belongsToMany(
            PermisosGenerales::class,
            'permisosgeneralespor_role',
            'idRole',
            'idPermisosGenerales'
        );
    }

}
