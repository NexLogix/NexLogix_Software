<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class ExceptionBadRequest extends Exception
{
    public function render(): JsonResponse
    {
        return response()->json([
            'status'  => 400,
            'mensaje' => 'Solicitud inválida o mal formada',
            'error'   => $this->getMessage() ?: 'Revise los parámetros enviados.'
        ], 400);
    }
}
