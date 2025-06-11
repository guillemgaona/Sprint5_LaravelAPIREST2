<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 * schema="SetResource",
 * type="object",
 * title="Set Resource",
 * @OA\Property(property="id", type="integer", example=1),
 * @OA\Property(property="training_session_id", type="integer", example=1),
 * @OA\Property(property="set_number", type="integer", example=1),
 * @OA\Property(property="repetitions", type="integer", example=10),
 * @OA\Property(property="weight", type="number", format="float", example=80.5)
 * )
 */

class Set extends Model
{
    use HasFactory;

    protected $fillable = [
        'training_session_id',
        'exercise_id',
        'set_number',
        'repetitions',
        'weight',
    ];

    protected $casts = [
        'weight' => 'decimal:2',
    ];

    public function trainingSession()
    {
        return $this->belongsTo(TrainingSession::class);
    }

    public function exercise()
    {
        return $this->belongsTo(Exercise::class);
    }
}