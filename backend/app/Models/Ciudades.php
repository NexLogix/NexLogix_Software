<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ciudades extends Model
{
    use HasFactory;
    protected $table = 'ciudades';
    protected $primaryKey = 'idCiudad';
    public $timestamps = false;
    protected $fillable = [
        'nombreCiudad',
        'costoPor_Ciudad',
    ];

    public function recogida()
    { 
        return $this->hasMany(Ciudades::class,
            'idCiudad',
            'idCiudad'
        );
    }

    public function entregas()
    {
        return $this->hasMany(Ciudades::class,
            'idCiudad',
            'idCiudad'
        );
    }
}
