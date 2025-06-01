<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ExerciseController;
use App\Http\Controllers\Api\TrainingSessionController;
use App\Http\Controllers\Api\SetController;
use App\Http\Controllers\Api\StatsController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');
