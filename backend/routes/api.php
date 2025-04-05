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
