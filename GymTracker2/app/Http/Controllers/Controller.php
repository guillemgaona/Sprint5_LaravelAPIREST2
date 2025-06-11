<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

/**
 * @OA\Info(
 * version="1.0.0",
 * title="GymTracker API Documentation",
 * description="A RESTful API for tracking gym workouts, including exercises, training sessions, sets, and user performance statistics.",
 * @OA\Contact(
 * email="your-email@example.com"
 * )
 * )
 *
 * @OA\Server(
 * url=L5_SWAGGER_CONST_HOST,
 * description="GymTracker API Server"
 * )
 *
 * @OA\SecurityScheme(
 * securityScheme="BearerAuth",
 * type="http",
 * scheme="bearer",
 * bearerFormat="JWT",
 * description="Enter token in format (Bearer <token>)"
 * )
 *
 * @OA\Tag(name="Authentication", description="User Registration and Login")
 * @OA\Tag(name="Exercises", description="Managing and viewing exercises")
 * @OA\Tag(name="Training Sessions", description="Endpoints for tracking workout sessions")
 * @OA\Tag(name="Sets", description="Endpoints for tracking sets within a session")
 * @OA\Tag(name="User Stats", description="Endpoints for user performance statistics")
 */

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;
}