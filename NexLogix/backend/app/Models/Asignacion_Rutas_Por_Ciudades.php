<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asignacion_Rutas_Por_Ciudades extends Model
{
    use HasFactory;

    protected $table = 'Asignacion_Rutas_Por_Ciudades';
    protected $primaryKey = 'idasignacion_rutas_por_ciudades';

    public $timestamps = false;

    // Se especifican los campos que pueden ser asignados de forma masiva
    protected $fillable = [
        'idRuta','idCiudad',
    ];

    public function ciudades()
    {
        return $this->belongsTo(Ciudades::class);
    }

    public function rutas()
    {
        return $this->belongsTo(Rutas::class);
    }
}
