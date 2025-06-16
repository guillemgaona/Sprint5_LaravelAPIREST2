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


    Route::get('/sessions', [TrainingSessionController::class, 'index'])->name('api.sessions.index.authuser');
    Route::post('/sessions', [TrainingSessionController::class, 'store'])->name('api.sessions.store');

  
    Route::get('/users/{user}/sessions', [TrainingSessionController::class, 'indexByUser'])->name('api.users.sessions.index');

    
    Route::get('/sessions/{trainingSession}', [TrainingSessionController::class, 'show'])->name('api.sessions.show');
    Route::put('/sessions/{trainingSession}', [TrainingSessionController::class, 'update'])->name('api.sessions.update');
    Route::delete('/sessions/{trainingSession}', [TrainingSessionController::class, 'destroy'])->name('api.sessions.destroy');


    Route::get('/sessions/{trainingSession}/sets', [SetController::class, 'index'])->name('api.sessions.sets.index');
    Route::post('/sessions/{trainingSession}/sets', [SetController::class, 'store'])->name('api.sessions.sets.store');

    Route::get('/sets/{set}', [SetController::class, 'show'])->name('api.sets.show');
    Route::put('/sets/{set}', [SetController::class, 'update'])->name('api.sets.update');
    Route::delete('/sets/{set}', [SetController::class, 'destroy'])->name('api.sets.destroy');

    Route::get('/users/{user}/stats/volume', [StatsController::class, 'volume'])->name('api.users.stats.volume');
    Route::get('/users/{user}/stats/frequency', [StatsController::class, 'frequency'])->name('api.users.stats.frequency');
    Route::get('/users/{user}/personal-bests', [StatsController::class, 'personalBests'])->name('api.users.stats.personal_bests');
});