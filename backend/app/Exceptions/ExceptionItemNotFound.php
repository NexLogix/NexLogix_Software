<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class ExceptionItemNotFound extends Exception
{
    public function render(): JsonResponse
    {
        return response()->json([
            'status' => 404,
            'message' => 'Recurso no encontrado!',
            'error' => $this->getMessage() ?: 'El recurso no existe'
        ], 404);
    }
}
