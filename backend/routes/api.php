<?php
use Illuminate\Support\Facades\Route;

//
/// GESION AUTH
//

use App\Http\Controllers\Auth\AuthAccountController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function () {
    Route::post('/login', [AuthAccountController::class, 'login']);
    Route::post('/logout', [AuthAccountController::class, 'logout'])
        ->middleware('auth:api');
    Route::get('/mostrar_perfil_auth', [AuthAccountController::class, 'getProfile'])
        ->middleware('auth:api');
    Route::post('/refresh_token', [AuthAccountController::class,'refreshToken'])
        ->middleware('auth:api');
});

//
/// USERS THE MOST IMPORTAN
//

use App\Http\Controllers\Users\UsersController;
/*
    Se modigica de esta manera GESTION USUARIOS para que cuando se haga login /api:auth/ solo los usuarios
    autenticados puedes hacer las acciones de gestion_usuarios, con esto se llama al idRole, con esto se sabe
    que role tiene Manager/2, Empleadp/3, despues por medio de Middleware se valida si tiene permiso o no.
*/
Route::group([
    'middleware' => ['api', 'auth:api'], // el usuario debe estar autenticado para hacer estas funciones
    'prefix' => 'gestion_usuarios'
], function () {
    Route::get('/', [UsersController::class, 'showAll'])
        ->middleware('role:2,3'); // Accede Manager y Empleado
    Route::get('/{id}', [UsersController::class, 'showByID'])
        ->middleware('role:2'); // Solo accedeManager
    Route::post('/crear_usuario', [UsersController::class, 'createUser'])
        ->middleware('role:2'); // Solo Manager
    Route::patch('/actualizar_campos_especificos_usuario/{id}', [UsersController::class, 'updatePartialUser'])
        ->middleware('role:2'); // Solo Manager
    Route::delete('/eliminar_usuario/{id}', [UsersController::class, 'deleteUser'])
        ->middleware('role:2'); // Solo Manage
});


//
/// ROLES
//
use App\Http\Controllers\Roles\RoleControllers;

Route::group([
    'middleware' => ['api', 'auth:api'], // solo autenticados pueden acceder
    'prefix' => 'gestion_roles'
], function () {
    Route::get('/', [RoleControllers::class, 'showAll'])
        ->middleware('role:2'); // Solo Manager
    Route::get('/{id}', [RoleControllers::class, 'showByID'])
        ->middleware('role:2'); // Solo Manager
    Route::post('/crear_role', [RoleControllers::class, 'createRole'])
        ->middleware('role:2'); // Solo Manager
    Route::put('editar_role/{id}', [RoleControllers::class, 'updateRole'])
        ->middleware('role:2'); // Solo Manager
    Route::patch('editar_campos_especificos_role/{id}', [RoleControllers::class, 'updatePartialRole'])
        ->middleware('role:2'); // Solo Manager
    Route::delete('eliminar_role/{id}', [RoleControllers::class, 'deleteRole'])
        ->middleware('role:2'); // Solo Manager
});

//
/// AREAS
//

use App\Http\Controllers\Areas\AreasController;

Route::group([
    'middleware' => ['api', 'auth:api'], // solo autenticados pueden acceder
    'prefix' => 'gestion_areas'
], function () {
    Route::get('/', [AreasController::class, 'showAll'])
        ->middleware('role:2,3'); // Manager y Empleado
    Route::get('/{id}', [AreasController::class, 'showByID'])
        ->middleware('role:2,3'); // Manager y Empleado
    Route::post('/crear_area', [AreasController::class, 'createArea'])
        ->middleware('role:2'); // Solo Manager
    Route::put('/editar_area/{id}', [AreasController::class, 'updateArea'])
        ->middleware('role:2'); // Solo Manager
    Route::patch('/actualizar_campos_especificos_area/{id}', [AreasController::class, 'updatePartialArea'])
        ->middleware('role:2'); // Solo Manager
    Route::delete('/eliminar_area/{id}', [AreasController::class, 'deleteArea'])
        ->middleware('role:2'); // Solo Manager
});


// PUESTOS

use App\Http\Controllers\Puestos\PuestosController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'gestion_puestos'
], function () {
    Route::get('/', [PuestosController::class, 'showAll']);
    Route::get('/{id}', [PuestosController::class, 'showByID']);
    Route::post('/crear_puesto', [PuestosController::class, 'createPuesto']);
    Route::put('/editar_puesto/{id}', [PuestosController::class, 'updatePuesto']);
    Route::patch('/actualizar_campos_especificos_puesto/{id}', [PuestosController::class, 'updatePartialPuesto']);
    Route::delete('/eliminar_puesto/{id}', [PuestosController::class, 'deletePuesto']);
});

//
/// REPORTES
//
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

//
/// ESTADO
//

use App\Http\Controllers\Estado\EstadoControllers;

Route::group([
    'middleware' => 'api',
    'prefix' => 'gestion_estados'
], function() {
    Route::get('/', [EstadoControllers::class, 'showAll']);
    Route::get('/{id}', [EstadoControllers::class, 'showOne']);
    Route::post('/crear_estado', [EstadoControllers::class, 'createEstado']);
    Route::delete('/eliminar_estado/{id}', [EstadoControllers::class, 'deleteEstado']);
});

