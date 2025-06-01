<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ExerciseController;
use App\Http\Controllers\Api\TrainingSessionController;
use App\Http\Controllers\Api\SetController;
use App\Http\Controllers\Api\StatsController;


Route::post('/register', [AuthController::class, 'register'])->name('api.register');
Route::post('/login', [AuthController::class, 'login'])->name('api.login');


Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('api.logout');
    Route::get('/user', [AuthController::class, 'user'])->name('api.auth.user');

    Route::get('/users/{user}', [UserController::class, 'show'])->name('api.users.show');

    Route::get('/exercises', [ExerciseController::class, 'index'])->name('api.exercises.index');
    Route::get('/exercises/{exercise}', [ExerciseController::class, 'show'])->name('api.exercises.show');
    Route::post('/exercises', [ExerciseController::class, 'store'])->name('api.exercises.store')->middleware('role:admin');
    Route::put('/exercises/{exercise}', [ExerciseController::class, 'update'])->name('api.exercises.update')->middleware('role:admin');
    Route::delete('/exercises/{exercise}', [ExerciseController::class, 'destroy'])->name('api.exercises.destroy')->middleware('role:admin');
  
});