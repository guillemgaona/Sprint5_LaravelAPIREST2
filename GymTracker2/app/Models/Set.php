<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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