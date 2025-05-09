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
        'horaEntrada',
        'horaSalida',
        'idCiudad',
    ];

    // Relación: muchas rutas pertenecen a una ciudad
    // Se define la relación inversa con el modelo Ciudades usando la clave foránea 'idCiudad'
    public function ciudades() {
        return $this->belongsTo(Ciudades::class, 'idCiudad');
    }
}
