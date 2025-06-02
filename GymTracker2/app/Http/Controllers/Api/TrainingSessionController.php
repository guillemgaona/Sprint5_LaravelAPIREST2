<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TrainingSession;
use App\Models\User;
use App\Http\Requests\StoreTrainingSessionRequest; // Crea este FormRequest
use App\Http\Requests\UpdateTrainingSessionRequest; // Crea este FormRequest
use App\Http\Resources\TrainingSessionResource;   // Crea este API Resource
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TrainingSessionController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $sessions = TrainingSession::where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->paginate(10);
        return TrainingSessionResource::collection($sessions);
    }


    public function indexByUser(User $user)
    {

        $this->authorize('viewSessionsOf', $user); 

        $sessions = TrainingSession::where('user_id', $user->id)
            ->orderBy('date', 'desc')
            ->paginate(10);
        return TrainingSessionResource::collection($sessions);
    }

    public function store(StoreTrainingSessionRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['user_id'] = Auth::id();

        $trainingSession = TrainingSession::create($validatedData);
        return new TrainingSessionResource($trainingSession);
    }


    public function show(TrainingSession $trainingSession)
    {
        $this->authorize('view', $trainingSession); 
        return new TrainingSessionResource($trainingSession);
    }

 
}