<?php

use App\Http\Middleware\CheckRole;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Desde aqui se configura y llama a los Roles para verificacion en las rutas protegidas
        // Rutas protegidas
        $middleware->alias([
            'role' => CheckRole::class, // Por esta razon ponemos 'role' en api.php, asi se llama la variable que verifica el idRole de los usuarios autenticados.
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
