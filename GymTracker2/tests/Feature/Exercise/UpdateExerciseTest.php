<?php

namespace Tests\Feature\Exercise;

use App\Models\Exercise;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UpdateExerciseTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $regularUser;
    protected Exercise $exercise;

    protected function setUp(): void
    {
        parent::setUp();
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);


        $this->adminUser = User::factory()->create()->assignRole($adminRole);
        $this->regularUser = User::factory()->create()->assignRole($userRole);
        $this->exercise = Exercise::factory()->create(['name' => 'Old Name']);
    }


    public function test_admin_can_update_exercise()
    {
        Passport::actingAs($this->adminUser);
        $updateData = ['name' => 'Updated Exercise Name', 'muscle_group' => 'legs'];

        $this->putJson("/api/exercises/{$this->exercise->id}", $updateData)
            ->assertStatus(200)
            ->assertJsonPath('data.name', 'Updated Exercise Name')
            ->assertJsonPath('data.muscle_group', 'legs');
        $this->assertDatabaseHas('exercises', ['id' => $this->exercise->id, 'name' => 'Updated Exercise Name']);
    }

    public function test_regular_user_cannot_update_exercise()
    {
        Passport::actingAs($this->regularUser);
        $this->putJson("/api/exercises/{$this->exercise->id}", ['name' => 'Attempted Update'])
            ->assertStatus(403);
    }

    public function test_unauthenticated_user_cannot_update_exercise()
    {
        $this->putJson("/api/exercises/{$this->exercise->id}", ['name' => 'Attempted Update'])
            ->assertStatus(401);
    }
    
    public function test_update_exercise_fails_with_invalid_data()
    {
        Passport::actingAs($this->adminUser);
        $this->putJson("/api/exercises/{$this->exercise->id}", ['muscle_group' => 'invalid_group'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['muscle_group']);
    }

    public function test_update_non_existent_exercise_returns_404()
    {
        Passport::actingAs($this->adminUser);
        $this->putJson("/api/exercises/9999", ['name' => 'No Such Exercise'])
            ->assertStatus(404);
    }

}