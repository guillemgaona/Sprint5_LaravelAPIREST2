<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TrainingSessionResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'date' => $this->date->toDateString(),
            'notes' => $this->notes,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),


            'user' => new UserResource($this->whenLoaded('user')),

            'sets' => SetResource::collection($this->whenLoaded('sets')),
            'sets_count' => $this->whenCounted('sets'),
        ];
    }
}