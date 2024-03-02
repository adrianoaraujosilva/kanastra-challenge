<?php

use App\Http\Controllers\Api\BoletosFilesController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::prefix('boletos')
    ->name("boletos.")
    ->group(
        function () {
            Route::get('/', [BoletosFilesController::class, 'index']);
            Route::post('/', [BoletosFilesController::class, 'store']);
        }
    );
