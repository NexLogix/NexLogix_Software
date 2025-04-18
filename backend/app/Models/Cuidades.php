<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cuidades extends Model
{
    use HasFactory;
    protected $table = 'ciudades';
    protected $primaryKey = 'idCiudad';
    public $timestamps = false;
    protected $fillable = [
        'nombreCiudad',
        'costoPor_Ciudad',
    ];

}
