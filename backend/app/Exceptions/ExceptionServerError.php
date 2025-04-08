<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class ExceptionServerError extends Exception
{
    public function render(): JsonResponse
    {
        return response()->json([
            'status'  => 500,
            'mensaje' => 'Error al conectarse al servidor',
            'error'   => $this->getMessage() ?: 'Ocurrió un error inesperado. Intente nuevamente más tarde.'
        ], 500);
    }
}
