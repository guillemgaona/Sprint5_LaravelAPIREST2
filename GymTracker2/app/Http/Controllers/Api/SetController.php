<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Set;
use App\Models\TrainingSession;
use App\Http\Requests\StoreSetRequest;   
use App\Http\Requests\UpdateSetRequest;
use App\Http\Resources\SetResource;
use Illuminate\Http\Request;

/**
 * @OA\Tag(
 *     name="Sets",
 *     description="API Endpoints for managing exercise sets in training sessions"
 * )
 */
class SetController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/training-sessions/{trainingSession}/sets",
     *     summary="Get all sets for a specific training session",
     *     tags={"Sets"},
     *     @OA\Parameter(
     *         name="trainingSession",
     *         in="path",
     *         required=true,
     *         description="Training Session ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of sets for the training session",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="reps", type="integer"),
     *                     @OA\Property(property="weight", type="number"),
     *                     @OA\Property(property="exercise", type="object")
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized access"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Training session not found"
     *     )
     * )
     */
    public function index(TrainingSession $trainingSession)
    {
        $this->authorize('view', $trainingSession);

        return SetResource::collection($trainingSession->sets()->with('exercise')->paginate(15));
    }

    /**
     * @OA\Post(
     *     path="/api/training-sessions/{trainingSession}/sets",
     *     summary="Create a new set in a training session",
     *     tags={"Sets"},
     *     @OA\Parameter(
     *         name="trainingSession",
     *         in="path",
     *         required=true,
     *         description="Training Session ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"exercise_id", "reps", "weight"},
     *             @OA\Property(property="exercise_id", type="integer", description="ID of the exercise"),
     *             @OA\Property(property="reps", type="integer", description="Number of repetitions"),
     *             @OA\Property(property="weight", type="number", format="float", description="Weight used in the set"),
     *             @OA\Property(property="notes", type="string", description="Optional notes for the set")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Set created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="reps", type="integer"),
     *                 @OA\Property(property="weight", type="number"),
     *                 @OA\Property(property="exercise", type="object")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized access"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function store(StoreSetRequest $request, TrainingSession $trainingSession)
    {
        $this->authorize('addSet', $trainingSession);

        $validatedData = $request->validated();
        $set = $trainingSession->sets()->create($validatedData);
        $set->load('exercise');

        return new SetResource($set);
    }

    /**
     * @OA\Get(
     *     path="/api/sets/{set}",
     *     summary="Get detailed information about a specific set",
     *     tags={"Sets"},
     *     @OA\Parameter(
     *         name="set",
     *         in="path",
     *         required=true,
     *         description="Set ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Set details retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="reps", type="integer"),
     *                 @OA\Property(property="weight", type="number"),
     *                 @OA\Property(property="exercise", type="object"),
     *                 @OA\Property(property="training_session", type="object")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized access"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Set not found"
     *     )
     * )
     */
    public function show(Set $set)
    {
        $this->authorize('view', $set); 

        $set->load('exercise', 'trainingSession.user');
        return new SetResource($set);
    }

    /**
     * @OA\Put(
     *     path="/api/sets/{set}",
     *     summary="Update a specific set",
     *     tags={"Sets"},
     *     @OA\Parameter(
     *         name="set",
     *         in="path",
     *         required=true,
     *         description="Set ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             @OA\Property(property="exercise_id", type="integer", description="ID of the exercise"),
     *             @OA\Property(property="reps", type="integer", description="Number of repetitions"),
     *             @OA\Property(property="weight", type="number", format="float", description="Weight used in the set"),
     *             @OA\Property(property="notes", type="string", description="Optional notes for the set")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Set updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="reps", type="integer"),
     *                 @OA\Property(property="weight", type="number"),
     *                 @OA\Property(property="exercise", type="object")
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized access"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Set not found"
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function update(UpdateSetRequest $request, Set $set)
    {
        $this->authorize('update', $set);

        $set->update($request->validated());
        $set->load('exercise');
        return new SetResource($set);
    }

    /**
     * @OA\Delete(
     *     path="/api/sets/{set}",
     *     summary="Delete a specific set",
     *     tags={"Sets"},
     *     @OA\Parameter(
     *         name="set",
     *         in="path",
     *         required=true,
     *         description="Set ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Set deleted successfully"
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized access"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Set not found"
     *     )
     * )
     */
    public function destroy(Set $set)
    {
        $this->authorize('delete', $set);
        $set->delete();
        return response()->json(null, 204);
    }
}