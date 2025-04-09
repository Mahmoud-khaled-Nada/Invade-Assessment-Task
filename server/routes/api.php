<?php

use App\Http\Controllers\Api;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')->group(function () {


    //todo Auth API 
    Route::prefix('auth')->group(function () {
        Route::post('register', [Api\AuthController::class, 'register']);
        Route::middleware('api')->group(function () {
            Route::post('login', [Api\AuthController::class, 'login']);
            Route::post('logout', [Api\AuthController::class, 'logout']);
            Route::post('refresh', [Api\AuthController::class, 'refresh']);
            Route::get('me', [Api\AuthController::class, 'me']);
        });
    });


    //todo Task API
    Route::middleware('api.auth')->group(function () {
        Route::prefix('tasks')->group(function () {
            Route::get('/', [Api\TaskController::class, 'index']);
            Route::get('/search', [Api\TaskController::class, 'search']);
            Route::post('', [Api\TaskController::class, 'create']);
            Route::put('/{task}', [Api\TaskController::class, 'update']);
            Route::delete('/{task}', [Api\TaskController::class, 'destroy']);
            Route::get('/restore', [Api\TaskController::class, 'restore']);
            Route::post('/{task}/complete', [Api\TaskController::class, 'complete'])
                ->withoutMiddleware('throttle:60,1');
                
        });
    });
});
