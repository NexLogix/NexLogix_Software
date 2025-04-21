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

    // un area puede tener muchos PUESTOS
    public function puestos()
    {
        return $this->hasMany(Puestos::class, 'idArea', 'idArea');
    }
}
