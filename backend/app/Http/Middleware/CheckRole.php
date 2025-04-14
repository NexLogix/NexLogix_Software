<?php
/// aqui se imponten el chequeo de roles y sus permisos con rutas protegidas
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = Auth::user();
        // Si no hay usuario y tampoco tiene role, idRole, no puede hacer nada
        if (!$user || !in_array($user->idRole, $roles)) {
            return response()->json(['error' => 'No tienes permisos para acceder a esta ruta'], 403);
        }
        return $next($request);
    }
}
