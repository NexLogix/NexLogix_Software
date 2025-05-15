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
/*
    La razon por la cual en todas las rutas se pone auth:api, es para que esta ruta solo este funcionando si esta autenticada,
    gracias al middleware que es checkrole, se revisa el role del usuario, si cumple los requerimientos se enruta a su respectivas
    funciones y permisos por el role.
*/
//
//----------------------------------------------------------------------------------------------------------------------------------------

//
/// USERS, con rutas
//

use App\Http\Controllers\Users\UsersController;
/*
    Se modifica de esta manera GESTION USUARIOS para que cuando se haga login /api:auth/ solo los usuarios
    autenticados puedes hacer las acciones de gestion_usuarios, con esto se llama al idRole, con esto se sabe
    que role tiene Manager/2, Empleado/3, despues por medio de Middleware se valida si tiene permiso o no.
*/

Route::group([
    'middleware' => ['api', 'auth:api'], // el usuario debe estar autenticado para hacer estas funciones
    'prefix' => 'gestion_usuarios'
], function () {
    Route::get('/', [UsersController::class, 'showAll'])
        ->middleware('role:2'); // Accede Manager y Empleado
    Route::get('buscar_usuario/{id}', [UsersController::class, 'showByID'])
        ->middleware('role:2'); // Solo accedeManager
    Route::post('/crear_usuario', [UsersController::class, 'createUser'])
        ->middleware('role:2'); // Solo Manager
    Route::patch('/actualizar_campos_especificos_usuario/{id}', [UsersController::class, 'updatePartialUser'])
        ->middleware('role:2'); // Solo Manager
    Route::delete('/eliminar_usuario/{id}', [UsersController::class, 'deleteUser'])
        ->middleware('role:2'); // Solo Manage
});

//
/// AUDITORIAS
//

use App\Http\Controllers\Auditorias\AuditoriaController;
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_auditorias'
], function () {
    Route::get('/', action: [AuditoriaController::class, 'showAllAuditorias'])
        ->middleware('role:2');
    Route::get('/buscar_auditoria/{id}', [AuditoriaController::class, 'showAuditoriaByID'])
        ->middleware('role:2');
    Route::patch('/editar_auditoria/{id}', [AuditoriaController::class, 'updateAuditoria'])
        ->middleware('role:2');
    Route::delete('/eliminar_auditoria/{id}', [AuditoriaController::class, 'deleteAuditoria'])
        ->middleware('role:2');
});

//
/// ROLES // RUTAS PROTEGIDAS PERO SIN AUDITORIA, pediente..
//
use App\Http\Controllers\Roles\RoleControllers;

Route::group([
    'middleware' => ['api', 'auth:api'], // solo autenticados pueden acceder
    'prefix' => 'gestion_roles'
], function () {
    Route::get('/', [RoleControllers::class, 'showAll'])
        ->middleware('role:2,3'); //  Manager y Empleado
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
/// AREAS // Rutas Protegidas y con Auditoria
//

use App\Http\Controllers\Areas\AreasController;

Route::group([
    'middleware' => ['api', 'auth:api'], // solo autenticados pueden acceder
    'prefix' => 'gestion_areas'
], function () {
    Route::get('/', [AreasController::class, 'showAll'])
        ->middleware('role:2'); // Manager y Empleado
    Route::get('/{id}', [AreasController::class, 'showByID'])
        ->middleware('role:2'); // Manager y Empleado
    Route::post('/crear_area', [AreasController::class, 'createArea'])
        ->middleware('role:2'); // Solo Manager
    Route::put('/editar_area/{id}', [AreasController::class, 'updateArea'])
        ->middleware('role:2'); // Solo Manager
    Route::patch('/actualizar_campos_especificos_area/{id}', [AreasController::class, 'updatePartialArea'])
        ->middleware('role:2'); // Solo Manager
    Route::delete('/eliminar_area/{id}', [AreasController::class, 'deleteArea'])
        ->middleware('role:2'); // Solo Manager
});


// PUESTOS // RUTAS PROTEGIDAS,  pero SIN AUDITORIA, pendiente....

use App\Http\Controllers\Puestos\PuestosController;

Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_puestos'
], function () {
    Route::get('/', [PuestosController::class, 'showAll'])
        ->middleware('role:2,3'); // Manager y Empleado
    Route::get('/buscar_puesto/{id}', [PuestosController::class, 'showByID'])
        ->middleware('role:2,3'); // Manager y Empleado
    Route::post('/crear_puesto', [PuestosController::class, 'createPuesto'])
        ->middleware('role:2'); // Solo Manager
    Route::put('/editar_puesto/{id}', [PuestosController::class, 'updatePuesto'])
        ->middleware('role:2'); // Solo Manager
    Route::patch('/actualizar_campos_especificos_puesto/{id}', [PuestosController::class, 'updatePartialPuesto'])
        ->middleware('role:2'); // Solo Manager
    Route::delete('/eliminar_puesto/{id}', [PuestosController::class, 'deletePuesto'])
        ->middleware('role:2'); // Solo Manager
});


//
/// REPORTES // SIN RUTAS PROTEGIDAS Y SIN AUDITORIA, pendiente migrar a services, usecase y controller con sis interfaces
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
/// ESTADO // RUTAS PROTEGIDAS, pero  SIN AUDITORIA, pendiente....
//

use App\Http\Controllers\Estado\EstadoControllers;

Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_estados'
], function() {
    Route::get('/', [EstadoControllers::class, 'showAll'])
        ->middleware('role:2,3'); // Manager y Empleado
    Route::get('/{id}', [EstadoControllers::class, 'showOne'])
        ->middleware('role:2,3'); // Manager y Empleado
    Route::post('/crear_estado', [EstadoControllers::class, 'createEstado'])
        ->middleware('role:2'); // Solo Manager
    Route::delete('/eliminar_estado/{id}', [EstadoControllers::class, 'deleteEstado'])
        ->middleware('role:2'); // Solo Manager
});



/*
| | NOTA |
| * Se espera que con el tiempo se haga mas rutas protegidas explicitas usando PUESTOS, ya que como se hizo
|   anteriormente con roles, que aunque sea Manager/2 si cierto puesto no esta en la ruta protegida no podra
|   acceder.
|
|   Se espera migrar esto con el tiempo pero ya usando Clean Architecture
*/

// -------------------------------------------------------------------------------------------------------

//
/// ENVIOS
//
use App\Http\Controllers\Envios\EnvioControllers;
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_envios'
], function () {
    Route::get('/', [EnvioControllers::class, 'showAllEnvios'])
        ->middleware('role:2,3');
    Route::get('/buscar_envio/{id}', [EnvioControllers::class, 'showEnvioById'])
        ->middleware('role:2,3');
    Route::post('/crear_envio', [EnvioControllers::class, 'createEnvio'])
    ->middleware('role:2');
    Route::put('/editar_envio/{id}', [EnvioControllers::class, 'updateEnvio'])
        ->middleware('role:2');
    Route::patch('/actualizar_campos_especificos_envio/{id}', [EnvioControllers::class, 'updateSpecificSection'])
        ->middleware('role:2');
    Route::delete('/eliminar_envio/{id}', [EnvioControllers::class, 'deleteEnvio'])
        ->middleware('role:2');
});


//
/// Categoria Envios
//
use App\Http\Controllers\CategoriaEnvios\CE_Controller;

Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_categoria_envios'
], function () {
    Route::get('/', action: [CE_Controller::class, 'showAllCE'])
        ->middleware('role:2,3');
    Route::get('/buscar_ce/{id}', [CE_Controller::class, 'showCEById'])
        ->middleware('role:2,3');
    Route::post('/crear_ce', [CE_Controller::class, 'createCE'])
    ->middleware('role:2,3');
    Route::put('/editar_ce/{id}', [CE_Controller::class, 'updateCA'])
        ->middleware('role:2');
    Route::patch('/actualizar_campos_especificos_ce/{id}', [CE_Controller::class, 'updateSpecificSectionCE'])
        ->middleware('role:2');
    Route::delete('/eliminar_ce/{id}', [CE_Controller::class, 'deleteCE'])
        ->middleware('role:2');
});

//
/// CUIDADES
//

use App\Http\Controllers\Ciudades\ControllerCiudades;
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_ciudades'
], function () {
    Route::get('/', action: [ControllerCiudades::class, 'showAllCiudades'])
        ->middleware('role:2');
    Route::get('/buscar_ciudad/{id}', [ControllerCiudades::class, 'showCiudadById'])
        ->middleware('role:2');
    Route::post('/crear_ciudad', [ControllerCiudades::class, 'createCiudad'])
    ->middleware('role:2,3');
    Route::put('/editar_ciudad/{id}', [ControllerCiudades::class, 'updateCiudad'])
        ->middleware('role:2');
    Route::patch('/editar_parcial_ciudad/{id}', [ControllerCiudades::class, 'updateSpecificSection'])
        ->middleware('role:2');
    Route::delete('/eliminar_ciudad/{id}', [ControllerCiudades::class, 'deleteCiudades'])
        ->middleware('role:2');
});

//
/// RECOGIDAS
//

use App\Http\Controllers\Recogidas\RecogidasControllers;
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_recogidas'
], function () {
    Route::get('/', action: [RecogidasControllers::class, 'showAllRecogidas'])
        ->middleware('role:2,3');
    Route::get('/buscar_recogida/{id}', [RecogidasControllers::class, 'showByIDRecogida'])
        ->middleware('role:2,3');
    Route::post('/crear_recogida', [RecogidasControllers::class, 'createRecogida'])
    ->middleware('role:2,3');
    Route::patch('/editar_recogida/{id}', [RecogidasControllers::class, 'updateSpecificSection_R'])
        ->middleware('role:2');
    Route::delete('/eliminar_recogida/{id}', [RecogidasControllers::class, 'deleteRecogida'])
        ->middleware('role:2');
});

//
/// ENTREGAS
//

use App\Http\Controllers\Entregas\EntregasController;
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_entregas'
], function () {
    Route::get('/', action: [EntregasController::class, 'showAllEntregas'])
        ->middleware('role:2,3');
    Route::get('/buscar_entrega/{id}', [EntregasController::class, 'showByIDEntrega'])
        ->middleware('role:2,3');
    Route::post('/crear_entrega', [EntregasController::class, 'createEntrega'])
    ->middleware('role:2,3');
    Route::patch('/editar_entrega/{id}', [EntregasController::class, 'updateSpecificSection_E'])
        ->middleware('role:2');
    Route::delete('/eliminar_entrega/{id}', [EntregasController::class, 'deleteEntrega'])
        ->middleware('role:2');
});


//
/// RUTAS
//
use App\Http\Controllers\Rutas\RutasController;

Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_rutas'
], function () {
    Route::get('/', action: [RutasController::class, 'getAllRutas'])
        ->middleware('role:2');
    Route::get('/buscar_ruta/{id}', [RutasController::class, 'getRutaByID'])
        ->middleware('role:2,3');
    Route::post('/crear_ruta', [RutasController::class, 'createRuta'])
    ->middleware('role:2');
    Route::patch('/editar_ruta/{id}', [RutasController::class, 'updateRuta'])
        ->middleware('role:2');
    Route::delete('/eliminar_ruta/{id}', [RutasController::class, 'deleteRuta'])
        ->middleware('role:2');
});

//
/// GESTION ASIGNACION DE RUTAS
//

use App\Http\Controllers\AsignacionRutas\AR_controller;

Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_asignacio_rutas'
], function () {
    Route::get('/', action: [AR_controller::class, 'showAll_AR'])
        ->middleware('role:2');
    Route::get('/buscar_AR/{id}', [AR_controller::class, 'show_AR_ById'])
        ->middleware('role:2,3');
    Route::post('/crear_AR', [AR_controller::class, 'create_AR'])
    ->middleware('role:2');
    Route::patch('/editar_AR/{id}', [AR_controller::class, 'update_AR'])
        ->middleware('role:2');
    Route::delete('/eliminar_AR/{id}', [AR_controller::class, 'delete_AR'])
        ->middleware('role:2');
});

//
/// VEHICULOS
//

use App\Http\Controllers\vehiculos\VehiculosController;

Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_vehiculos'
], function () {
    Route::get('/', [VehiculosController::class, 'showAllVehiculos'])
        ->middleware('role:2,3');
    Route::get('/buscar_vehiculo/{id}', [VehiculosController::class, 'showVehiculoById'])
        ->middleware('role:2,3');
    Route::post('/crear_vehiculo', [VehiculosController::class, 'createVehiculo'])
        ->middleware('role:2');
    Route::patch('/editar_vehiculo/{id}', [VehiculosController::class, 'updateVehiculo'])
        ->middleware('role:2');
    Route::delete('/eliminar_vehiculo/{id}', [VehiculosController::class, 'deleteVehiculo'])
        ->middleware('role:2');
});

