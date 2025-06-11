<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\TrainingSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

/**
 * @OA\Tag(
 *     name="Statistics",
 *     description="API Endpoints for retrieving user training statistics"
 * )
 */
class StatsController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/users/{user}/stats/volume",
     *     summary="Get volume statistics by muscle group for a user",
     *     tags={"Statistics"},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Volume statistics retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(type="object",
     *                     @OA\Property(property="muscle_group", type="string", description="Name of the muscle group"),
     *                     @OA\Property(property="total_volume", type="number", format="float", description="Total volume (reps × weight)")
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
     *         description="User not found"
     *     )
     * )
     */
    public function volume(User $user)
    {
        $this->authorize('viewStatsOf', $user);

        $volumeStats = DB::table('sets')
            ->join('exercises', 'sets.exercise_id', '=', 'exercises.id')
            ->join('training_sessions', 'sets.training_session_id', '=', 'training_sessions.id')
            ->where('training_sessions.user_id', $user->id)
            ->select(
                'exercises.muscle_group',
                DB::raw('SUM(sets.repetitions * sets.weight) as total_volume')
            )
            ->groupBy('exercises.muscle_group')
            ->orderBy('total_volume', 'desc')
            ->get();

        return response()->json(['data' => $volumeStats]);
    }

    /**
     * @OA\Get(
     *     path="/api/users/{user}/stats/frequency",
     *     summary="Get training frequency statistics for a user",
     *     tags={"Statistics"},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Parameter(
     *         name="weeks",
     *         in="query",
     *         required=false,
     *         description="Number of weeks to show (default: 12)",
     *         @OA\Schema(type="integer", default=12)
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Training frequency statistics retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(type="object",
     *                     @OA\Property(property="year", type="integer", description="Year of the week"),
     *                     @OA\Property(property="week_number", type="integer", description="Week number (1-52)"),
     *                     @OA\Property(property="week_start_date", type="string", format="date", description="Start date of the week"),
     *                     @OA\Property(property="week_end_date", type="string", format="date", description="End date of the week"),
     *                     @OA\Property(property="session_count", type="integer", description="Number of training sessions in the week")
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
     *         description="User not found"
     *     )
     * )
     */
    public function frequency(User $user, Request $request)
    {
   
        $this->authorize('viewStatsOf', $user);

        $weeksToShow = $request->query('weeks', 12); 
        $endDate = Carbon::now()->endOfWeek(Carbon::SUNDAY);
        $startDate = Carbon::now()->subWeeks($weeksToShow - 1)->startOfWeek(Carbon::MONDAY);

        $sessions = TrainingSession::where('user_id', $user->id)
            ->whereBetween('date', [$startDate->toDateString(), $endDate->toDateString()])
            ->select(
                DB::raw('YEAR(date) as year'),
                DB::raw('WEEK(date, 1) as week_number'),
                DB::raw('DATE_FORMAT(MIN(date), "%Y-%m-%d") as week_start_date'), 
                DB::raw('DATE_FORMAT(MAX(date), "%Y-%m-%d") as week_end_date'),
                DB::raw('COUNT(id) as session_count')
            )
            ->groupBy('year', 'week_number')
            ->orderBy('year', 'desc')
            ->orderBy('week_number', 'desc')
            ->get();

        return response()->json(['data' => $sessions]);
    }

    /**
     * @OA\Get(
     *     path="/api/users/{user}/stats/personal-bests",
     *     summary="Get personal best weights for each exercise",
     *     tags={"Statistics"},
     *     @OA\Parameter(
     *         name="user",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Personal bests retrieved successfully",
     *         @OA\JsonContent(
     *             @OA\Property(property="data", type="array",
     *                 @OA\Items(type="object",
     *                     @OA\Property(property="exercise_id", type="integer", description="ID of the exercise"),
     *                     @OA\Property(property="exercise_name", type="string", description="Name of the exercise"),
     *                     @OA\Property(property="max_weight", type="number", format="float", description="Maximum weight lifted for this exercise")
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
     *         description="User not found"
     *     )
     * )
     */
    public function personalBests(User $user)
    {
        $this->authorize('viewStatsOf', $user);

        $personalBests = DB::table('sets')
            ->join('training_sessions', 'sets.training_session_id', '=', 'training_sessions.id')
            ->join('exercises', 'sets.exercise_id', '=', 'exercises.id')
            ->where('training_sessions.user_id', $user->id)
            ->select(
                'sets.exercise_id',
                'exercises.name as exercise_name',
                DB::raw('MAX(sets.weight) as max_weight')
            )
            ->groupBy('sets.exercise_id', 'exercises.name')
            ->orderBy('exercises.name')
            ->get();

        return response()->json(['data' => $personalBests]);
    }
}