<?php

namespace Tests\Feature\Exercise;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class ExerciseCreateTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $regularUser;

    protected function setUp(): void
    {
        parent::setUp();
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);

        $this->adminUser = User::factory()->create()->assignRole('admin');
        $this->regularUser = User::factory()->create()->assignRole('user');
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
    
}