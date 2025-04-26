<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// modelo y tabla hecha para registrar accionesy eventos por, por user_id
class AuditLog extends Model
{
    use HasFactory;
    protected $table = 'audit_logs';

    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = ['user_id', 'action', 'resource_type', 'resource_id', 'details'];
    protected $casts = ['details' => 'array'];
}
