<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Exercise::factory()->count(20)->create();

   
        Exercise::firstOrCreate(
            ['name' => 'Press de Banca'],
            [
                'muscle_group' => 'chest',
                'description' => 'Ejercicio compuesto para el desarrollo del pectoral, hombros y tríceps.',
                'demo_image_url' => 'https://example.com/images/bench_press.jpg'
            ]
        );

        Exercise::firstOrCreate(
            ['name' => 'Sentadilla Trasera'],
            [
                'muscle_group' => 'legs',
                'description' => 'Ejercicio fundamental para el desarrollo de las piernas y glúteos.',
                'demo_image_url' => 'https://example.com/images/squat.jpg'
            ]
        );

        Exercise::firstOrCreate(
            ['name' => 'Peso Muerto Convencional'],
            [
                'muscle_group' => 'back',
                'description' => 'Ejercicio compuesto que trabaja múltiples grupos musculares, especialmente la espalda baja, isquiotibiales y glúteos.',
                'demo_image_url' => 'https://example.com/images/deadlift.jpg'
            ]
        );

        Exercise::firstOrCreate(
            ['name' => 'Dominadas'],
            [
                'muscle_group' => 'back',
                'description' => 'Ejercicio de peso corporal para el desarrollo de la espalda alta y bíceps.',
                'demo_image_url' => 'https://example.com/images/pullups.jpg' 
            ]
        );
    }
}