<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermisosEspeciales extends Model
{
    use HasFactory;

    protected $table = 'PermisosEspeciales';
    protected $primaryKey = 'idPermisosEspeciales';
    public $timestamps = false;
    protected $fillable = [
        'nombrePermisoEspecial',
        'fechaAsignacionPermisoEspecial',
        'descripcionPermisoEspecial',
    ];

    public function puestos()
    {
        return $this->belongsToMany(Puestos::class,
            'PermisosEspeciales_Por_Puesto',
            'idPermisosEspeciales',
            'idPuestos',
        );
    }
}
