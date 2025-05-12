<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehiculos extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'vehiculos';
    protected $primaryKey = 'idVehiculo';
    protected $fillable = [
        'marcaVehiculo', 'tipoVehiculo', 'placa',
    ];

}
