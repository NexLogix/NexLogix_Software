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

    public function user()
    {
        return $this->belongsTo(User::class, 'idusuarios');
    }
}
