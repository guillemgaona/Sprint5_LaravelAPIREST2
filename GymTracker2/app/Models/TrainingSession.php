<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
/**
 * @OA\Schema(
 * schema="TrainingSessionResource",
 * type="object",
 * title="Training Session Resource",
 * @OA\Property(property="id", type="integer", example=1),
 * @OA\Property(property="user_id", type="integer", example=1),
 * @OA\Property(property="date", type="string", format="date", example="2025-06-11"),
 * @OA\Property(property="notes", type="string", nullable=true, example="Good energy today.")
 * )
 */
class TrainingSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'notes',
    ];

    protected $casts = [
        'date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sets()
    {
        return $this->hasMany(Set::class);
    }
}