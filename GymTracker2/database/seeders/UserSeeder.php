<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::findByName('admin', 'api');
        $userRole = Role::findByName('user', 'api');

        // Crea Admin
        User::factory()->create([
            'name' => 'Admin User',
            'username' => 'admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), 
        ])->assignRole($adminRole);

        // Crea Usuario Normal
        User::factory()->create([
            'name' => 'Test User',
            'username' => 'testuser',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
        ])->assignRole($userRole);

        // Crea Usuarios Adicionales con el Factory
        User::factory()->count(5)->create()->each(function ($user) use ($userRole) {
            $user->assignRole($userRole);
        });
    }
}