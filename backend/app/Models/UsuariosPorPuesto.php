<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsuariosPorPuesto extends Model
{
    use HasFactory;

    protected $table = 'usuariosporpuesto';
    protected $primaryKey = 'idUsuariosPorPuesto';
    public $timestamps = false; // No tiene `updated_at` ni `created_at`

    protected $fillable = [
        'fechaAsignacion',
        'fechaFin',
        'idusuarios',
        'idArea'
    ];


    // Relación con Usuario (Cada registro pertenece a un Usuario)
    public function usuario()
    {
        return $this->belongsTo(User::class, 'idusuarios');
    }

    // Relación con Puesto (Cada registro pertenece a un Puesto)
    public function puesto()
    {
        return $this->belongsTo(Puestos::class, 'idPuestos');
    }

}
