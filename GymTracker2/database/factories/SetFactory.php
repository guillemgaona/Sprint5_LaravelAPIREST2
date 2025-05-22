<?php

namespace Database\Factories;

use App\Models\Exercise;
use App\Models\TrainingSession;
use Illuminate\Database\Eloquent\Factories\Factory;

class SetFactory extends Factory
{
    public function definition(): array
    {
        return [
            'training_session_id' => TrainingSession::factory(),
            'exercise_id' => Exercise::factory(),
            'set_number' => $this->faker->numberBetween(1, 5),
            'repetitions' => $this->faker->numberBetween(5, 15),
            'weight' => $this->faker->randomFloat(2, 5, 200),
        ];
    }
}