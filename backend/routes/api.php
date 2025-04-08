<?php
// MAIN MENU // GESION LOGIN
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'middleware'=> 'api',
    'prefix' => 'login'
], function(){
    Route::group([
        'prefix' =>'auth',
    ], function(){
        // Route::post('register', [::class, 'register']);
        // Route::post('login', [ ::clas, 'register']);
        //Route::post('login', [::class, 'login']);
        // Route::post('logout', [::class, 'logout'])
            // ->middleware('auth:student');
        // Route::get('profile', [::class, 'profile'])
            // ->middleware('auth:student');
        // Route::post('refresh', [::class,'refresh'])
            // ->middleware('auth:student');
    });
});


// REPORTES
use App\Http\Controllers\Reportes\GetReportesController;
use App\Http\Controllers\Reportes\GetByIDReportesController;
use App\Http\Controllers\Reportes\PostReportesController;
use App\Http\Controllers\Reportes\UpdateReporteController;
use App\Http\Controllers\Reportes\DeleteReporteController;
use App\Http\Controllers\Reportes\PatchReportesController;

Route::group([
    'middleware' => 'api',
    'prefix'=> 'gestion_reportes'
], function(){
    Route::get('/', [GetReportesController::class, 'verReportes']);
    Route::get('{id}', [GetByIDReportesController::class, 'showReporte']);
    Route::post('/crear_reporte', [PostReportesController::class, 'handle']);
    Route::put('/editar_reporte/{id}', [UpdateReporteController::class, 'updateReporte']);
    Route::patch('/actualizar_campos_especificos_reportes/{id}', [PatchReportesController::class, 'updateReporte']);
    Route::delete('/eliminar_reporte/{id}', action: [DeleteReporteController::class,'deleteReporte']);
});


// PERMISOS GENERALES
use App\Http\Controllers\Permisos\PermisosGenerales\GetPermisoGeneralController;
use App\Http\Controllers\Permisos\PermisosGenerales\GetByIDPermisoGeneralController;
use App\Http\Controllers\Permisos\PermisosGenerales\PostPGController;
use App\Http\Controllers\Permisos\PermisosGenerales\PutPGController;
use App\Http\Controllers\Permisos\PermisosGenerales\DeletePGController;


Route::group([
    'middleware' => 'api',
    'prefix'=> 'gestion_permisos_generales'
], function() {
    Route::get('/', [GetPermisoGeneralController::class, 'showPermisosGenerales']);
    Route::get('{id}', [GetByIDPermisoGeneralController::class, 'show_PG_ByID']);
    Route::post('crear_pg', [PostPGController::class,'createPG']);
    Route::put('/editar_pg/{id}', [PutPGController::class, 'updatePG']);
    Route::delete('/delete_pg/{id}', [DeletePGController::class,'deletePG']);

});

