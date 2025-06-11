<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TrainingSession;
use App\Models\User;
use App\Http\Requests\StoreTrainingSessionRequest;
use App\Http\Requests\UpdateTrainingSessionRequest;
use App\Http\Resources\TrainingSessionResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/**
 * @OA\Tag(
 *     name="Training Sessions",
 *     description="API Endpoints for managing training sessions"
 * )
 */
class TrainingSessionController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/training-sessions",
     *     summary="Get authenticated user's training sessions",
     *     tags={"Training Sessions"},
     *     @OA\Response(
     *         response=200,
     *         description="List of training sessions",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="user_id", type="integer"),
     *                     @OA\Property(property="date", type="string", format="date"),
     *                     @OA\Property(property="notes", type="string", nullable=true)
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
        $user = Auth::user();
        $sessions = TrainingSession::where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->paginate(10);
        return TrainingSessionResource::collection($sessions);
    }

    /**
     * @OA\Get(
     *     path="/api/users/{user}/training-sessions",
     *     summary="Get training sessions for a specific user",
     *     tags={"Training Sessions"},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="List of user's training sessions",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(type="object",
     *                     @OA\Property(property="id", type="integer"),
     *                     @OA\Property(property="user_id", type="integer"),
     *                     @OA\Property(property="date", type="string", format="date"),
     *                     @OA\Property(property="notes", type="string", nullable=true)
     *                 )
     *             ),
     *             @OA\Property(property="links", type="object"),
     *             @OA\Property(property="meta", type="object")
     *         )
     *     ),
     *     @OA\Response(
     *         response=403,
     *         description="Unauthorized access"
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="User not found"
     *     )
     * )
     */
    public function indexByUser(User $user)
    {
        $this->authorize('viewSessionsOf', $user); 

        $sessions = TrainingSession::where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->paginate(10);
        return TrainingSessionResource::collection($sessions);
    }

    /**
     * @OA\Post(
     *     path="/api/training-sessions",
     *     summary="Create a new training session",
     *     tags={"Training Sessions"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"date"},
     *             @OA\Property(property="date", type="string", format="date", description="Date of the training session"),
     *             @OA\Property(property="notes", type="string", nullable=true, description="Optional notes for the session")
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Training session created successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="user_id", type="integer"),
     *                 @OA\Property(property="date", type="string", format="date"),
     *                 @OA\Property(property="notes", type="string", nullable=true)
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthenticated"
     *     )
     * )
     */
    public function store(StoreTrainingSessionRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['user_id'] = Auth::id();

        $trainingSession = TrainingSession::create($validatedData);
        return new TrainingSessionResource($trainingSession);
    }

    /**
     * @OA\Get(
     *     path="/api/training-sessions/{trainingSession}",
     *     summary="Get details of a specific training session",
     *     tags={"Training Sessions"},
     *     @OA\Parameter(
     *         name="trainingSession",
     *         in="path",
     *         required=true,
     *         description="Training Session ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Training session details",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="user_id", type="integer"),
     *                 @OA\Property(property="date", type="string", format="date"),
     *                 @OA\Property(property="notes", type="string", nullable=true)
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
    public function show(TrainingSession $trainingSession)
    {
        $this->authorize('view', $trainingSession); 
        return new TrainingSessionResource($trainingSession);
    }

    /**
     * @OA\Put(
     *     path="/api/training-sessions/{trainingSession}",
     *     summary="Update a training session",
     *     tags={"Training Sessions"},
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
     *             @OA\Property(property="date", type="string", format="date", description="Date of the training session"),
     *             @OA\Property(property="notes", type="string", nullable=true, description="Optional notes for the session")
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Training session updated successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="object",
     *                 @OA\Property(property="id", type="integer"),
     *                 @OA\Property(property="user_id", type="integer"),
     *                 @OA\Property(property="date", type="string", format="date"),
     *                 @OA\Property(property="notes", type="string", nullable=true)
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
     *     ),
     *     @OA\Response(
     *         response=422,
     *         description="Validation error"
     *     )
     * )
     */
    public function update(UpdateTrainingSessionRequest $request, TrainingSession $trainingSession)
    {
        $this->authorize('update', $trainingSession); 
        $trainingSession->update($request->validated());
        return new TrainingSessionResource($trainingSession);
    }

    /**
     * @OA\Delete(
     *     path="/api/training-sessions/{trainingSession}",
     *     summary="Delete a training session",
     *     tags={"Training Sessions"},
     *     @OA\Parameter(
     *         name="trainingSession",
     *         in="path",
     *         required=true,
     *         description="Training Session ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=204,
     *         description="Training session deleted successfully"
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
    public function destroy(TrainingSession $trainingSession)
    {
        $this->authorize('delete', $trainingSession);
        $trainingSession->delete();
        return response()->json(null, 204);
    }
}