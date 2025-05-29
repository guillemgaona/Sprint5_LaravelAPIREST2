<?php

namespace Tests\Feature\Exercise;

use App\Models\Exercise;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class ExerciseDeleteTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $regularUser;
    protected Exercise $exercise;

    protected function setUp(): void
    {
        parent::setUp();
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);

        $this->adminUser = User::factory()->create()->assignRole('admin');
        $this->regularUser = User::factory()->create()->assignRole('user');
        $this->exercise = Exercise::factory()->create();
    }

    public function test_admin_can_delete_exercise()
    {
        Passport::actingAs($this->adminUser);
        $this->deleteJson("/api/exercises/{$this->exercise->id}")
            ->assertStatus(204); 
        $this->assertDatabaseMissing('exercises', ['id' => $this->exercise->id]);
    }

    public function test_regular_user_cannot_delete_exercise()
    {
        Passport::actingAs($this->regularUser);
        $this->deleteJson("/api/exercises/{$this->exercise->id}")
            ->assertStatus(403);
    }

    public function test_unauthenticated_user_cannot_delete_exercise()
    {
        $this->deleteJson("/api/exercises/{$this->exercise->id}")
            ->assertStatus(401);
    }

    public function test_delete_non_existent_exercise_returns_404()
    {
        Passport::actingAs($this->adminUser);
        $this->deleteJson("/api/exercises/9999")
            ->assertStatus(404);
    }
}