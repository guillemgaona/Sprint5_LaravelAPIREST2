<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\TrainingSession;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Carbon;

class StatsController extends Controller
{
  
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