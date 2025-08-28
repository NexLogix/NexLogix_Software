<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Roles extends Model
{
    use HasFactory;
    public $timestamps = false;


    protected $table = 'roles';
    protected $primaryKey = 'idRole';

    protected $fillable = [
        'nombreRole',
        'descripcionRole',
        'fechaAsignacionRole',
    ];

    public function users()
    {
        return $this->hasMany(
            User::class,
            'idRole', // FK de la tabla Users
            'idRoles', // PK de la tabla Roles, cuando dice localKey es a la PK de la tabla Roles
        );
    }
}
