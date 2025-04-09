<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Envios extends Model
{
    use HasFactory;

    protected $table = 'envios';
    protected $primaryKey = 'idEnvios';
    public $timestamps = false;

    protected $fillable = [
        'nombreDestinatario',
        'num_ContactoRemitente',
        'nombreDestinatario ',
        'num_ContactoDestinatario ',
        'metodoPago',
        'costosTotal_Envio',
        'costosTotal_Envio ',
    ];

    // muchos envios solo puede pertenecer a un USER
    public function user()
    {
        return $this->belongsTo(User::class, 'idusuarios');
    }

    // un envio puede tener muchos PRODUCTOS
    public function productos()
    {
        return $this->hasMany(Productos::class,
        'idProducto',
        'idProducto');
    }
}
