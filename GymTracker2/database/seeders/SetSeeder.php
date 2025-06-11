<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\TrainingSession;
use App\Models\Exercise;
use App\Models\Set;

class SetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $sessions = TrainingSession::all();
        $exercises = Exercise::all();

        if ($sessions->isEmpty() || $exercises->isEmpty()) {
            $this->command->info('No training sessions or exercises found. Skipping SetSeeder.');
            return;
        }
        
        $this->command->info('Creating sets for each training session...');

        foreach ($sessions as $session) {
            $exercisesForThisSession = $exercises->random(rand(3, 5));

            foreach ($exercisesForThisSession as $exercise) {
               
                for ($setNumber = 1; $setNumber <= rand(3, 4); $setNumber++) {
                    Set::factory()->create([
                        'training_session_id' => $session->id,
                        'exercise_id' => $exercise->id,
                        'set_number' => $setNumber,
                    ]);
                }
            }
        }
    }
}