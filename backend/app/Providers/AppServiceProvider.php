<?php

namespace App\Providers;

// Importacion de Interfaces
use App\Models\Interfaces\Areas\IAreaService;
use App\Models\Interfaces\Areas\IAreaUseCase;
use App\Models\Interfaces\CategoriaEnvios\ICategoriaEnviosService;
use App\Models\Interfaces\CategoriaEnvios\ICategoriaEnviosUseCase;
use App\Models\Interfaces\Envios\IEnviosService;
use App\Models\Interfaces\Envios\IEnviosUseCase;
use App\Models\Interfaces\Users\IUserService;
use App\Models\Interfaces\Users\IUserUseCase;
// Importacion de services
use App\Services\Areas\AreasService;
use App\Services\CategoriaEnvios\CategoriaEnvioService;
use App\Services\Envios\EnvioService;
use App\Services\Users\UserService;
// importaciones casos de uso/ UseCases
use App\UseCases\CategoriaEnvios\CategoriaEnvioUseCase;
use App\UseCases\Users\UserUseCase;
use App\UseCases\Areas\AreasUseCase;
use App\UseCases\Envios\EnvioUseCase;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    // Manejo de las inyecciones de dependecias
    public function register(): void
    {
    /*
        1. Cuando alguien pida un IUserService, Laravel devolverá una instancia de UserService
        2. Cuando alguien pida un IUserUseCase, Laravel construye un UserUseCase
           y automáticamente le inyecta el UserService que ya sabe cómo crear
    */
        // USERS
        $this->app->bind(IUserService::class, UserService::class);
        $this->app->bind(IUserUseCase::class, function ($app) {
            return new UserUseCase($app->make(IUserService::class));
        });

        // AREAS
        $this->app->bind(IAreaService::class, AreasService::class);
        $this->app->bind(IAreaUseCase::class, function ($app){
            return new AreasUseCase($app->make(IAreaService::class));
        });

        // ENVIOS
        $this->app->bind(IEnviosService::class, EnvioService::class);
        $this->app->bind(IEnviosUseCase::class, function ($app) {
            return new EnvioUseCase($app->make(IEnviosService::class));
        });
        // CATEGORIA ENVIOS
        $this->app->bind(ICategoriaEnviosService::class, CategoriaEnvioService::class);
        $this->app->bind(ICategoriaEnviosUseCase::class, function ($app) {
            return new CategoriaEnvioUseCase($app->make(ICategoriaEnviosService::class));
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
