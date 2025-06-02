<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SetResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'training_session_id' => $this->training_session_id,
            'set_number' => $this->set_number,
            'repetitions' => $this->repetitions,
            'weight' => (float) $this->weight,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),


            'exercise' => new ExerciseResource($this->whenLoaded('exercise')),

            'training_session' => new TrainingSessionResource($this->whenLoaded('trainingSession')),
        ];
    }
}