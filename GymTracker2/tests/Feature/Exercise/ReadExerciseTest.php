<?php

namespace Tests\Feature\Exercise;

use App\Models\Exercise;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class ReadExerciseTest extends TestCase
{
    use RefreshDatabase;

    protected User $testUser;

    protected function setUp(): void
    {
        parent::setUp();
        $testUser = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']); 
        $this->testUser = User::factory()->create()->assignRole($testUser);
        Passport::actingAs($this->testUser);
    }

    public function test_can_get_paginated_list_of_exercises()
    {
        Exercise::factory()->count(15)->create();
        $this->getJson('/api/exercises?page=1')
            ->assertStatus(200)
            ->assertJsonStructure(['data', 'links', 'meta'])
            ->assertJsonCount(10, 'data'); 
    }

    public function test_can_get_specific_page_of_exercises()
    {
        Exercise::factory()->count(15)->create();
        $this->getJson('/api/exercises?page=2')
            ->assertStatus(200)
            ->assertJsonCount(5, 'data'); 
    }

    public function test_can_get_specific_exercise_details()
    {
        $exercise = Exercise::factory()->create(['name' => 'Specific Exercise']);
        $this->getJson("/api/exercises/{$exercise->id}")
            ->assertStatus(200)
            ->assertJsonPath('data.name', 'Specific Exercise');
    }

    public function test_get_non_existent_exercise_returns_404()
    {
        $this->getJson('/api/exercises/9999')
            ->assertStatus(404);
    }

    public function test_unauthenticated_user_cannot_get_exercise_details()
    {
        $exercise = Exercise::factory()->create();
        
        $this->refreshApplication();
        
        $this->getJson("/api/exercises/{$exercise->id}")
            ->assertStatus(401);
    }

}