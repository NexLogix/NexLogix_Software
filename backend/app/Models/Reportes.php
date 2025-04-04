<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reportes extends Model
{
    use HasFactory;

    protected $table = 'reportes';
    protected $primaryKey = 'idReporte';

    public $timestamps = false;

    public $fillable = [
        'tipoReporte',
        'descripción',
        'fechaCreacion',
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'idusuarios');
    }
}
