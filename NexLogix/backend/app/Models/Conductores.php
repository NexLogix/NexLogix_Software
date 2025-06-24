<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Conductores extends Model
{
    use HasFactory;

    protected $table = 'conductores';
    protected $primaryKey = 'idConductor';
    public $timestamps = false;

    protected $fillable = [
        'licencia',
        'tipoLicencia',
        'vigenciaLicencia',
        'estado',
        'idUsuario',
    ];

    // Un conductor pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(User::class, 'idUsuario', 'idusuarios');
    }

    // Un conductor puede tener muchas asignaciones de vehículos
    public function asignacionesVehiculos()
    {
        return $this->hasMany(asignacion_conductor_por_vehiculos::class, 'idConductor', 'idConductor');
    }
}