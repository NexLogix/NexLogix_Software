<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Areas extends Model
{
    use HasFactory;

    protected $table = 'areas';
    protected $primaryKey = 'idArea';
    public $timestamps = false;

    protected $fillable = [
        'nombreArea',
        'descripcionArea',
    ];

    public function puestos()
    {
        return $this->belongsToMany(
            Puestos::class,
            'areasporpuesto',
            'idArea',
            'idPuestos',
        );
    }
}
