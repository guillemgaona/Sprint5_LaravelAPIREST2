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

     public function update(UpdateTrainingSessionRequest $request, TrainingSession $trainingSession)
    {
        
        $this->authorize('update', $trainingSession); 
        $trainingSession->update($request->validated());
        return new TrainingSessionResource($trainingSession);
    }

        public function destroy(TrainingSession $trainingSession)
    {
        $this->authorize('delete', $trainingSession);
        $trainingSession->delete();
        return response()->json(null, 204);
    }
}