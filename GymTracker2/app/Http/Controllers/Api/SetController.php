<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Set;
use App\Models\TrainingSession;
use App\Http\Requests\StoreSetRequest;   
use App\Http\Requests\UpdateSetRequest;
use App\Http\Resources\SetResource;
use Illuminate\Http\Request;

class SetController extends Controller
{

    public function index(TrainingSession $trainingSession)
    {
        $this->authorize('view', $trainingSession);

        return SetResource::collection($trainingSession->sets()->with('exercise')->paginate(15));
    }

    public function store(StoreSetRequest $request, TrainingSession $trainingSession)
    {
        $this->authorize('addSet', $trainingSession);

        $validatedData = $request->validated();
        $set = $trainingSession->sets()->create($validatedData);
        $set->load('exercise');

        return new SetResource($set);
    }

    public function show(Set $set)
    {
        $this->authorize('view', $set); 

        $set->load('exercise', 'trainingSession.user');
        return new SetResource($set);
    }

    public function update(UpdateSetRequest $request, Set $set)
    {
        $this->authorize('update', $set);

        $set->update($request->validated());
        $set->load('exercise');
        return new SetResource($set);
    }

    public function destroy(Set $set)
    {
        $this->authorize('delete', $set);
        $set->delete();
        return response()->json(null, 204);
    }
}