<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rutas extends Model
{
    // Incluye el trait HasFactory para permitir la generación de factories en pruebas
    use HasFactory;

    // Se especifica el nombre exacto de la tabla en la base de datos
    protected $table = 'rutas';

    // Se define la clave primaria personalizada de la tabla
    protected $primaryKey = 'idRuta';

    // Se desactiva el manejo automático de timestamps (created_at, updated_at)
    public $timestamps = false;

    // Se especifican los campos que pueden ser asignados de forma masiva
    protected $fillable = [
        'nombreRuta',
        'fechaSalida',
        'fechaLlegada',
        'estadoTrayecto',
        'novedades',
        'fechaCreacionRuta',
    ];

    public function Asignacion_Rutas()
    {
        return $this->hasMany(Asignacion_Vehiculos_Por_Rutas::class,
            'idAsignacionRuta',
            'idAsignacionRuta',
        );
    }

    public function Asignacion_Rutas_Por_Ciudades()
    {
        return $this->hasMany(Asignacion_Rutas_Por_Ciudades::class,
            'idAsignacionRuta',
            'idAsignacionRuta',
        );
    }
}
