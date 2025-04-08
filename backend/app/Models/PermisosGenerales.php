<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermisosGenerales extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'permisosgenerales'; // tabla PermisosGenerales en MySQL
    protected $primaryKey = 'idPermisosGenerales';
    protected $fillable = [
        'nombrePermisoGeneral',
        'fechaAsignacionPermisoGeneral',
        'descripcionPermisoGeneral',
    ];

    // Relación muchos a muchos con Roles
    public function roles() {
        return $this->belongsToMany(
            Roles::class, // Modelo relacionado
            'permisosgeneralespor_role', // Tabla intermedia
            'idPermisosGenerales', // Clave en la tabla intermedia que referencia a esta tabla
            'idRole' // Clave en la tabla intermedia que referencia a la tabla roles
        );
    }
}
