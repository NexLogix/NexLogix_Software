<?php
// MAIN MENU // GESION LOGIN // USERS THE MOST IMPORTAN

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Users\UsersController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'gestion_usuarios'
], function () {
    Route::get('/', [UsersController::class, 'showAll']); // GET todos los usuarios
    Route::get('/{id}', [UsersController::class, 'showByID']); // GET por ID
    Route::post('/crear_usuario', [UsersController::class, 'createUser']); // POST crear usuario
    Route::patch('/actualizar_campos_especificos_usuario/{id}', [UsersController::class, 'updatePartialUser']); // PATCH
    Route::delete('/eliminar_usuario/{id}', [UsersController::class, 'deleteUser']); // DELETE
});

// AUTH
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


// ROLES
use App\Http\Controllers\Roles\RoleControllers;

Route::group([
    'middleware' => 'api',
    'prefix' => 'gestion_roles'
], function () {
    Route::get('/', [RoleControllers::class, 'showAll']); // Listar roles
    Route::get('/{id}', [RoleControllers::class, 'showByID']); // Este sí existe
    Route::post('/crear_role', [RoleControllers::class, 'createRole']); // Crear un nuevo rol
    Route::put('editar_role/{id}', [RoleControllers::class, 'updateRole']); // Actualizar completamente un rol
    Route::patch('editar_campos_especificos_role/{id}', [RoleControllers::class, 'updatePartialRole']); // Actualizar parcialmente
    Route::delete('eliminar_role/{id}', [RoleControllers::class, 'deleteRole']); // Eliminar un rol
});

// AREAS

use App\Http\Controllers\Areas\AreasController;

Route::group([
    'middleware' => 'api',
    'prefix' => 'gestion_areas'
], function () {
    Route::get('/', [AreasController::class, 'showAll']);
    Route::get('/{id}', [AreasController::class, 'showByID']);
    Route::post('/crear_area', [AreasController::class, 'createArea']);
    Route::put('/editar_area/{id}', [AreasController::class, 'updateArea']);
    Route::patch('/actualizar_campos_especificos_area/{id}', [AreasController::class, 'updatePartialArea']);
    Route::delete('/eliminar_area/{id}', [AreasController::class, 'deleteArea']);
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


// ESTADO
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

