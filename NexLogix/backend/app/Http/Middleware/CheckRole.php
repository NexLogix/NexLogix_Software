<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

/*
  1. Middleware personalizado para verificar si un usuario autenticado
    tiene el rol necesario para acceder a rutas protegidas.

  2. Se usa en rutas tipo:
    Route::middleware('role:2,3')->get(...);

  3. Donde:
    2 = Manager
    3 = Empleado
 */
class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Obtiene el usuario autenticado a través del sistema de autenticación de Laravel
        $user = Auth::user();

        /**
         * Validación:
         * - Si no hay usuario autenticado
         * - O si el rol del usuario (idRole) no está en la lista de roles permitidos
         * => entonces se deniega el acceso con un error 403 (Forbidden)
         */
        if (!$user || !in_array($user->idRole, $roles)) {
            return response()->json([
                'error' => 'No tienes permisos para acceder a esta ruta'
            ], 403);
        }

        // Si el usuario está autenticado y tiene el rol correcto, continúa a la siguiente capa
        return $next($request);
    }
}
