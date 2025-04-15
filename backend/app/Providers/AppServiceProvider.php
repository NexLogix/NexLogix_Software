<?php

namespace App\Providers;

use App\Models\Interfaces\Users\IUserService;
use App\Models\Interfaces\Users\IUserUseCase;
use App\Services\Users\UserService;
use App\UseCases\Users\UserUseCase;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    // Manejo de las inyecciones de dependecias
    public function register(): void
    {
        // 1. Cuando alguien pida un IUserService, Laravel devolverá una instancia de UserService
        $this->app->bind(IUserService::class, UserService::class);

        /*
            2. Cuando alguien pida un IUserUseCase, Laravel construye un UserUseCase
               y automáticamente le inyecta el UserService que ya sabe cómo crear
        */
        $this->app->bind(IUserUseCase::class, function ($app) {
            return new UserUseCase($app->make(IUserService::class));
        });
    }


    // Este arreglo registra que el Listener AuditResourceAction debe ejecutarse cada vez que ocurra el evento ResourceAction
    protected $listen = [
        \App\Events\ResourceAction::class => [
            \App\Listeners\AuditResourceAction::class,
        ],
    ];

    public function boot(): void
    {
        //
    }
}
