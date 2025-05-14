<?php

namespace App\Providers;

// Importacion de Interfaces
use App\Models\Interfaces\Areas\IAreaService;
use App\Models\Interfaces\Areas\IAreaUseCase;
use App\Models\Interfaces\CategoriaEnvios\ICategoriaEnviosService;
use App\Models\Interfaces\CategoriaEnvios\ICategoriaEnviosUseCase;
use App\Models\Interfaces\Ciudades\ICiudadesService;
use App\Models\Interfaces\Ciudades\ICiudadesUseCase;
use App\Models\Interfaces\Entregas\IEntregaService;
use App\Models\Interfaces\Entregas\IEntregaUseCase;
use App\Models\Interfaces\Envios\IEnviosService;
use App\Models\Interfaces\Envios\IEnviosUseCase;
use App\Models\Interfaces\Recogidas\IRecogidaService;
use App\Models\Interfaces\Recogidas\IRecogidaUseCase;
use App\Models\Interfaces\Users\IUserService;
use App\Models\Interfaces\Users\IUserUseCase;

// Importacion de services
use App\Services\Areas\AreasService;
use App\Services\CategoriaEnvios\CategoriaEnvioService;
use App\Services\Ciudades\CiudadesService;
use App\Services\Entregas\EntregasService;
use App\Services\Envios\EnvioService;
use App\Services\Recogidas\RecogidasService;
use App\Services\Users\UserService;

// importaciones casos de uso/ UseCases
use App\UseCases\CategoriaEnvios\CategoriaEnvioUseCase;
use App\UseCases\Users\UserUseCase;
use App\UseCases\Areas\AreasUseCase;
use App\UseCases\Ciudades\CiudadesUseCase;
use App\UseCases\Entregas\EntregasUseCase;
use App\UseCases\Envios\EnvioUseCase;
use App\UseCases\Recogidas\RecogidaUseCase;
use App\UseCases\Vehiculos\VehiculosUseCase;
use Illuminate\Support\ServiceProvider;

// GESTION AUDITORIAS
use App\Services\Auditoria\AuditLogService;
use App\UseCases\Auditorias\AuditoriasUseCase;
use App\Models\Interfaces\Auditoria\IAudit_log_UseCase;
use App\Models\Interfaces\Auditoria\IAuditLogService;
use App\Models\Interfaces\Rutas\IRutasService;
use App\Models\Interfaces\Rutas\IRutasUseCase;
use App\Models\Interfaces\Vehiculos\IVehiculoService;
use App\Models\Interfaces\Vehiculos\IVehiculoUseCase;
use App\Services\Rutas\RutasService;
use App\Services\Vehiculos\VehiculoService;
use App\UseCases\Rutas\RutasUseCase;

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

        // CIUDADES
        $this->app->bind(ICiudadesService::class, CiudadesService::class);
        $this->app->bind(ICiudadesUseCase::class, function ($app) {
            return new CiudadesUseCase($app->make(ICiudadesService::class));
        });

        // RECOGIDAS
        $this->app->bind(IRecogidaService::class, RecogidasService::class);
        $this->app->bind(IRecogidaUseCase::class, function ($app) {
            return new RecogidaUseCase($app->make(IRecogidaService::class));
        });

        // ENTREGAS
        $this->app->bind(IEntregaService::class, EntregasService::class);
        $this->app->bind(IEntregaUseCase::class, function ($app) {
            return new EntregasUseCase($app->make(IEntregaService::class));
        });

        // AUDITORIAS
        $this->app->bind(IAuditLogService::class, AuditLogService::class);
        $this->app->bind(IAudit_log_UseCase::class, function($app){
            return new AuditoriasUseCase($app->make(IAuditLogService::class));
        });

        // RUTAS
        $this->app->bind(IRutasService::class, RutasService::class);
        $this->app->bind(IRutasUseCase::class, function ($app){
            return new RutasUseCase($app->make(IRutasService::class));
        });

        // VEHICULOS
        $this->app->bind(IVehiculoService::class, VehiculoService::class);
        $this->app->bind(IVehiculoUseCase::class, function($app){
            return new VehiculosUseCase($app->make(IVehiculoService::class));
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
