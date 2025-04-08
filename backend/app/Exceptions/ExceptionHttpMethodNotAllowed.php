<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\JsonResponse;

class ExceptionHttpMethodNotAllowed extends Exception
{
    public function render(): JsonResponse
    {
        return response()->json([
            'status' => 405,
            'message' => 'Metodo HTTP incorrecto, selecione el adecuado',
            'error' => $this->getMessage() ?: 'Metodo HTTP incorrecto'
        ], 405);
    }
}
