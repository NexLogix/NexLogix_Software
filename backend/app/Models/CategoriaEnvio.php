<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoriaEnvio extends Model
{
    use HasFactory;
    protected $table = 'CategoriaEnvios';
    protected $primaryKey = 'idCategoria';
    public $timestamps = false;
    protected $fillable = [
        'nombreCategoria',
        'precioCategoria',
        'descripcion',
    ];

    // relacion con envios
    public function envios()
    {
        return $this->hasMany(Envios::class,
            'idCategoria',
            'idCategoria',
        );
    }
}
