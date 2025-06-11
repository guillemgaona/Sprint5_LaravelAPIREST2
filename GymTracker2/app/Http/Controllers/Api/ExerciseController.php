<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Http\Requests\StoreExerciseRequest; 
use App\Http\Requests\UpdateExerciseRequest;
use App\Http\Resources\ExerciseResource;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Exercises",
 *     description="API Endpoints for managing exercises"
 * )
 */
class ExerciseController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/exercises",
     *     summary="List all exercises",
     *     tags={"Exercises"},
     *     @OA\Parameter(
     *         name="page",
     *         in="query",
     *         description="Page number for pagination",
     *         required=false,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of exercises retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="name", type="string"),
     *                     @OA\Property(property="description", type="string", nullable=true),
     *                     @OA\Property(property="muscle_group", type="string"),
     *                     @OA\Property(property="equipment", type="string", nullable=true)
     *                 )
     *             ),
     *             @OA\Property(property="links", type="object"),
     *             @OA\Property(property="meta", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
    public function index()
    {
 
        return ExerciseResource::collection(Exercise::paginate(10));
    }

    /**
     * @OA\Post(
     *     path="/api/exercises",
     *     summary="Create a new exercise",
     *     description="Create a new exercise (Admin Only)",
     *     tags={"Exercises"},
     *     security={{"bearerAuth": {}}},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"name", "muscle_group"},
     *             @OA\Property(property="name", type="string", description="Name of the exercise"),
     *             @OA\Property(property="description", type="string", nullable=true, description="Description of the exercise"),
     *             @OA\Property(property="muscle_group", type="string", description="Primary muscle group targeted"),
     *             @OA\Property(property="equipment", type="string", nullable=true, description="Equipment needed for the exercise")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Exercise created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="description", type="string", nullable=true),
     *                 @OA\Property(property="muscle_group", type="string"),
     *                 @OA\Property(property="equipment", type="string", nullable=true)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden - User is not admin"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function store(StoreExerciseRequest $request)
    {
        $exercise = Exercise::create($request->validated());
        return new ExerciseResource($exercise);
    }

    /**
     * @OA\Get(
     *     path="/api/exercises/{exercise}",
     *     summary="Get details of a specific exercise",
     *     tags={"Exercises"},
     *     @OA\Parameter(
     *         name="exercise",
     *         in="path",
     *         required=true,
     *         description="Exercise ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Exercise details retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="description", type="string", nullable=true),
     *                 @OA\Property(property="muscle_group", type="string"),
     *                 @OA\Property(property="equipment", type="string", nullable=true)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Exercise not found"
     *     )
     * )
     */
    public function show(Exercise $exercise)
    {
        return new ExerciseResource($exercise);
    }

    /**
     * @OA\Put(
     *     path="/api/exercises/{exercise}",
     *     summary="Update an exercise",
     *     description="Update an existing exercise (Admin Only)",
     *     tags={"Exercises"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="exercise",
     *         in="path",
     *         required=true,
     *         description="Exercise ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="name", type="string", description="Name of the exercise"),
     *             @OA\Property(property="description", type="string", nullable=true, description="Description of the exercise"),
     *             @OA\Property(property="muscle_group", type="string", description="Primary muscle group targeted"),
     *             @OA\Property(property="equipment", type="string", nullable=true, description="Equipment needed for the exercise")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Exercise updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="name", type="string"),
     *                 @OA\Property(property="description", type="string", nullable=true),
     *                 @OA\Property(property="muscle_group", type="string"),
     *                 @OA\Property(property="equipment", type="string", nullable=true)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden - User is not admin"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Exercise not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function update(UpdateExerciseRequest $request, Exercise $exercise)
    {
        $exercise->update($request->validated());
        return new ExerciseResource($exercise);
    }

    /**
     * @OA\Delete(
     *     path="/api/exercises/{exercise}",
     *     summary="Delete an exercise",
     *     description="Delete an exercise (Admin Only)",
     *     tags={"Exercises"},
     *     security={{"bearerAuth": {}}},
     *     @OA\Parameter(
     *         name="exercise",
     *         in="path",
     *         required=true,
     *         description="Exercise ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Exercise deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Forbidden - User is not admin"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Exercise not found"
     *     )
     * )
     */
    public function destroy(Exercise $exercise)
    {
        $exercise->delete();
        return response()->json(null, 204);
    }
}