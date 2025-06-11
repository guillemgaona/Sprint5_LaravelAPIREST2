<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\TrainingSession;

class TrainingSessionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Así se obtiene todos los users que no son administradores
        $users = User::whereHas('roles', function ($query) {
            $query->where('name', '!=', 'admin');
        })->get();

        if ($users->isEmpty()) {
            $this->command->info('No users found to create training sessions for. Skipping TrainingSessionSeeder.');
            return;
        }

        $this->command->info('Creating training sessions for users...');

        foreach ($users as $user) {
            TrainingSession::factory()->count(rand(5, 15))->create([
                'user_id' => $user->id,
            ]);
        }
    }
}