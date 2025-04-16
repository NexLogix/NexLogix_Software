<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Envios extends Model
{
    use HasFactory;
    protected $table = 'envios';
    protected $primaryKey = 'idEnvio';
    public $timestamps = false;

    protected $fillable = [
        'nombreRemitente',
        'num_ContactoRemitente',
        'nombreDestinatario',
        'num_ContactoDestinatario ',
        'metodoPago',
        'costosTotal_Envio',
    ];

    // muchos envios solo puede pertenecer a un USER
    public function user()
    {
        return $this->belongsTo(User::class, 'idusuarios');
    }

    // muchos envios solo puede pertenecer a una RECOGIDA
    public function recogidas()
    {
        return $this->belongsTo(Recogidas::class,'idRecogida');
    }

    // muchos envios solo puede pertenecer a una ENTREGA
    public function entregas(){
        return $this->belongsTo(Entregas::class, 'idEntrega');
    }
}
