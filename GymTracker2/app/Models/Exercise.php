<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 * schema="ExerciseResource",
 * type="object",
 * title="Exercise Resource",
 * @OA\Property(property="id", type="integer", example=1),
 * @OA\Property(property="name", type="string", example="Bench Press"),
 * @OA\Property(property="muscle_group", type="string", example="chest"),
 * @OA\Property(property="description", type="string", nullable=true, example="A compound exercise for the chest."),
 * @OA\Property(property="demo_image_url", type="string", format="url", nullable=true, example="http://example.com/bench.jpg")
 * )
 */

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'muscle_group',
        'description',
        'demo_image_url',
    ];

    public function sets()
    {
        return $this->hasMany(Set::class);
    }
}