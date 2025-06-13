<?php

namespace Tests\Feature\Exercise;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class CreateExerciseTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $regularUser;

    protected function setUp(): void
    {
        parent::setUp();

        // Create Roles for the 'api' guard and store them in variables
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);

        // Create users and assign the role *objects* directly.
        // This ensures the correct guard ('api') is used.
        $this->adminUser = User::factory()->create()->assignRole($adminRole);
        $this->regularUser = User::factory()->create()->assignRole($userRole);
    }

    public function test_admin_can_create_exercise()
    {
        Passport::actingAs($this->adminUser);
        $exerciseData = [
            'name' => 'Overhead Press',
            'muscle_group' => 'shoulders',
            'description' => 'A shoulder workout.',
            'demo_image_url' => 'http://example.com/ohp.jpg',
        ];

        $this->postJson('/api/exercises', $exerciseData)
            ->assertStatus(201)
            ->assertJsonPath('data.name', 'Overhead Press')
            ->assertJsonPath('data.muscle_group', 'shoulders');
        $this->assertDatabaseHas('exercises', ['name' => 'Overhead Press']);
    }

    public function test_regular_user_cannot_create_exercise()
    {
        Passport::actingAs($this->regularUser);
        $this->postJson('/api/exercises', ['name' => 'Test', 'muscle_group' => 'arms'])
            ->assertStatus(403);
    }

    public function test_unauthenticated_user_cannot_create_exercise()
    {
        $this->postJson('/api/exercises', ['name' => 'Test', 'muscle_group' => 'arms'])
            ->assertStatus(401);
    }

    public function test_create_exercise_fails_with_missing_required_fields()
    {
        Passport::actingAs($this->adminUser);
        $this->postJson('/api/exercises', ['name' => 'Only Name'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['muscle_group']);
    }

    public function test_create_exercise_fails_with_invalid_muscle_group()
    {
        Passport::actingAs($this->adminUser);
        $exerciseData = ['name' => 'Invalid Exercise', 'muscle_group' => 'invalid_group'];
        $this->postJson('/api/exercises', $exerciseData)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['muscle_group']);
    }
}