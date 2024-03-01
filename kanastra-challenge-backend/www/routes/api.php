<?php

use App\Http\Controllers\BoletosFilesController;
use Illuminate\Support\Facades\DB;
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

Route::get('/mongodb/ping', function () {
    $connection = DB::connection('mongodb');
    $msg = 'MongoDB is accessible!';
    try {
        $connection->command(['ping' => 1]);
    } catch (\Exception  $e) {
        $msg = 'MongoDB is not accessible. Error: ' . $e->getMessage();
    }
    return ['msg' => $msg];
});
