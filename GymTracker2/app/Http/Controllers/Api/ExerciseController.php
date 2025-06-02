<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Http\Requests\StoreExerciseRequest; 
use App\Http\Requests\UpdateExerciseRequest;
use App\Http\Resources\ExerciseResource;
use Illuminate\Http\Request;

class ExerciseController extends Controller
{

    public function index()
    {
 
        return ExerciseResource::collection(Exercise::paginate(10));
    }


    public function store(StoreExerciseRequest $request)
    {
        $exercise = Exercise::create($request->validated());
        return new ExerciseResource($exercise);
    }

    public function show(Exercise $exercise)
    {
        return new ExerciseResource($exercise);
    }

    public function update(UpdateExerciseRequest $request, Exercise $exercise)
    {
        $exercise->update($request->validated());
        return new ExerciseResource($exercise);
    }

    public function destroy(Exercise $exercise)
    {
        $exercise->delete();
        return response()->json(null, 204);
    }
}