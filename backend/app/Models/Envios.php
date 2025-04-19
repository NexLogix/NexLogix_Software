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
        'num_ContactoDestinatario',
        'metodoPago',
        'costosTotal_Envio',
        'fechaEnvio',
        'idCategoria',
        'idusuarios',
        'idRecogida',
        'idEntrega',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'idusuarios', 'idusuarios');
    }

    public function recogidas()
    {
        return $this->belongsTo(Recogidas::class, 'idRecogida', 'idRecogida');
    }

    public function entregas()
    {
        return $this->belongsTo(Entregas::class, 'idEntrega', 'idEntrega');
    }

    public function categoriaEnvio()
    {
        return $this->belongsTo(CategoriaEnvio::class, 'idCategoria', 'idCategoria');
    }
}
