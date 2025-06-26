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
/// GESTION ASIGNACION DE CONDUCTORES POR VEHICULOS
//

use App\Http\Controllers\ACPVController\ACPVController;
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_asignacion_conductores_por_vehiculos'
], function () {
    Route::get('/', [ACPVController::class, 'showAll'])
        ->middleware('role:2');
    Route::get('/{id}', [ACPVController::class, 'showBySearching'])
        ->middleware('role:2');
    Route::post('/', [ACPVController::class, 'create'])
        ->middleware('role:2');
    /*Route::put('/{id}', [ACPVController::class, ''])
        ->middleware('role:2');*/
    Route::patch('/{id}', [ACPVController::class, 'update'])
        ->middleware('role:2');
    Route::delete('/{id}', [ACPVController::class, 'delete'])
        ->middleware('role:2');
});

//
/// GESTION ASIGNACION DE RUTAS POR CIUDADES
//

//
/// GESTION ASIGNACION DE VEHICULOS POR RUTAS
//




//
/*
    La razon por la cual en todas las rutas se pone auth:api, es para que esta ruta solo este funcionando si esta autenticada,
    gracias al middleware que es checkrole, se revisa el role del usuario, si cumple los requerimientos se enruta a su respectivas
    funciones y permisos por el role.
*/
//

//----------------------------------------------------------------------------------------------------------------------------------------

//
/// GESTION USUARIOS
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
        ->middleware('role:2'); // Accede Manager
    Route::get('/{id}', [UsersController::class, 'showByID'])
        ->middleware('role:2'); // Solo accedeManager
    Route::post('/', [UsersController::class, 'createUser'])
        ->middleware('role:2'); // Solo Manager
    Route::patch('/{id}', [UsersController::class, 'updatePartialUser'])
        ->middleware('role:2'); // Solo Manager
    Route::delete('/{id}', [UsersController::class, 'deleteUser'])
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
    Route::post('/', [RoleControllers::class, 'createRole'])
        ->middleware('role:2'); // Solo Manager
    Route::patch('/{id}', [RoleControllers::class, 'updateRole'])
        ->middleware('role:2'); // Solo Manager
    Route::delete('/{id}', [RoleControllers::class, 'deleteRole'])
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
/// REPORTES
//
use App\Http\Controllers\Reportes\ReportesController;

Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix'=> 'gestion_reportes'
], function(){
    Route::get('/', [ReportesController::class, 'getAllReportes'])
        ->middleware('role:2,3'); // Manager y Empleado;
    Route::get('/{id}', [ReportesController::class, 'getAllReportes_ById'])
        ->middleware('role:2,3'); // Manager y Empleado;
    Route::post('/', [ReportesController::class, 'create_Reportes'])
        ->middleware('role:2,3'); // Manager y Empleado;
    Route::patch('/{id}', [ReportesController::class, 'update_Reportes'])
        ->middleware('role:2'); // Manager y Empleado;
    Route::delete('/{id}',[ReportesController::class,'delete_Reportes'])
        ->middleware('role:2'); // Manager y Empleado;
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
    Route::post('/', [EstadoControllers::class, 'createEstado'])
        ->middleware('role:2'); // Solo Manager
    Route::delete('/{id}', [EstadoControllers::class, 'deleteEstado'])
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
    Route::get('/{id}', [EnvioControllers::class, 'showEnvioById'])
        ->middleware('role:2,3');
    Route::post('/', [EnvioControllers::class, 'createEnvio'])
    ->middleware('role:2');
    Route::put('/{id}', [EnvioControllers::class, 'updateEnvio'])
        ->middleware('role:2');
    Route::patch('/{id}', [EnvioControllers::class, 'updateSpecificSection'])
        ->middleware('role:2');
    Route::delete('/{id}', [EnvioControllers::class, 'deleteEnvio'])
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
    Route::get('/{id}', [CE_Controller::class, 'showCEById'])
        ->middleware('role:2,3');
    Route::post('/', [CE_Controller::class, 'createCE'])
    ->middleware('role:2,3');
    Route::put('/{id}', [CE_Controller::class, 'updateCA'])
        ->middleware('role:2');
    Route::patch('/{id}', [CE_Controller::class, 'updateSpecificSectionCE'])
        ->middleware('role:2');
    Route::delete('/{id}', [CE_Controller::class, 'deleteCE'])
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
    Route::get('/{id}', [ControllerCiudades::class, 'showCiudadById'])
        ->middleware('role:2');
    Route::post('/', [ControllerCiudades::class, 'createCiudad'])
    ->middleware('role:2,3');
    Route::put('/{id}', [ControllerCiudades::class, 'updateCiudad'])
        ->middleware('role:2');
    Route::patch('/{id}', [ControllerCiudades::class, 'updateSpecificSection'])
        ->middleware('role:2');
    Route::delete('/{id}', [ControllerCiudades::class, 'deleteCiudades'])
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
    Route::get('/{id}', [RecogidasControllers::class, 'showByIDRecogida'])
        ->middleware('role:2,3');
    Route::post('/', [RecogidasControllers::class, 'createRecogida'])
    ->middleware('role:2,3');
    Route::patch('/{id}', [RecogidasControllers::class, 'updateSpecificSection_R'])
        ->middleware('role:2');
    Route::delete('/{id}', [RecogidasControllers::class, 'deleteRecogida'])
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
    Route::get('/{id}', [EntregasController::class, 'showByIDEntrega'])
        ->middleware('role:2,3');
    Route::post('/', [EntregasController::class, 'createEntrega'])
    ->middleware('role:2,3');
    Route::patch('/{id}', [EntregasController::class, 'updateSpecificSection_E'])
        ->middleware('role:2');
    Route::delete('/{id}', [EntregasController::class, 'deleteEntrega'])
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
    Route::get('/{id}', [RutasController::class, 'getRutaByID'])
        ->middleware('role:2,3');
    Route::post('/', [RutasController::class, 'createRuta'])
    ->middleware('role:2');
    Route::patch('/{id}', [RutasController::class, 'updateRuta'])
        ->middleware('role:2');
    Route::delete('/{id}', [RutasController::class, 'deleteRuta'])
        ->middleware('role:2');
});

//
/// GESTION ASIGNACION VEHICULOS POR RUTAS
//

use App\Http\Controllers\AVPR_controller\Asignacion_Vehiculos_Por_Rutas_Controller;

Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_asignacion_vehiculos_por_rutas'
], function () {
    Route::get('/', action: [Asignacion_Vehiculos_Por_Rutas_Controller::class, 'showAll_AR'])
        ->middleware('role:2');
    Route::get('/{id}', [Asignacion_Vehiculos_Por_Rutas_Controller::class, 'show_AR_ById'])
        ->middleware('role:2,3');
    Route::post('/', [Asignacion_Vehiculos_Por_Rutas_Controller::class, 'create_AR'])
    ->middleware('role:2');
    Route::patch('/{id}', [Asignacion_Vehiculos_Por_Rutas_Controller::class, 'update_AR'])
        ->middleware('role:2');
    Route::delete('/{id}', [Asignacion_Vehiculos_Por_Rutas_Controller::class, 'delete_AR'])
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
    Route::get('/{value}', [VehiculosController::class, 'showVehiculoById'])
        ->middleware('role:2,3');
    Route::post('/', [VehiculosController::class, 'createVehiculo'])
        ->middleware('role:2');
    Route::patch('/{value}', [VehiculosController::class, 'updateVehiculo'])
        ->middleware('role:2');
    Route::delete('/{value}', [VehiculosController::class, 'deleteVehiculo'])
        ->middleware('role:2');
});

//
/// CONDUCTORES
//

use App\Http\Controllers\Conductores\ConductoresController;
Route::group([
    'middleware' => ['api', 'auth:api'],
    'prefix' => 'gestion_conductores'
], function () {
    Route::get('/', [ConductoresController::class, 'showAll'])
        ->middleware('role:2,3');
    // asi se busca en la siguiente api: http://127.0.0.1:8000/api/gestion_conductores/buscar_para_crear_o_actualizar?search=sofi777@gmail.com
    Route::get('/buscar_para_crear_o_actualizar', [ConductoresController::class, 'searchConductorForCreateOrUpdate'])
        ->middleware('role:2,3');
    Route::get('/{id}', [ConductoresController::class, 'showByID'])
        ->middleware('role:2,3');
    Route::post('/', [ConductoresController::class, 'createConductor'])
        ->middleware('role:2');
    Route::put('/{id}', [ConductoresController::class, 'updateConductor'])
        ->middleware('role:2');
    Route::patch('/{id}', [ConductoresController::class, 'updatePartialConductor'])
        ->middleware('role:2');
    Route::delete('/{id}', [ConductoresController::class, 'deleteConductor'])
        ->middleware('role:2');
});
