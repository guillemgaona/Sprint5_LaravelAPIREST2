<?php

namespace Tests\Feature\Set;

use App\Models\Exercise;
use App\Models\TrainingSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class CreateSetTest extends TestCase
{
    use RefreshDatabase;

    protected User $sessionOwner;
    protected User $anotherUser;
    protected TrainingSession $ownerSession;
    protected Exercise $exercise;

    protected function setUp(): void
    {
        parent::setUp();
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        
        $this->sessionOwner = User::factory()->create()->assignRole($userRole);
        $this->anotherUser = User::factory()->create()->assignRole($userRole); 

        $this->ownerSession = TrainingSession::factory()->for($this->sessionOwner)->create();
        $this->exercise = Exercise::factory()->create();
    }

  
    public function test_user_can_add_set_to_their_own_session()
    {
        Passport::actingAs($this->sessionOwner);
        $setData = [
            'exercise_id' => $this->exercise->id,
            'set_number' => 1,
            'repetitions' => 10,
            'weight' => 50.5,
        ];

        $this->postJson("/api/sessions/{$this->ownerSession->id}/sets", $setData)
            ->assertStatus(201)
            ->assertJsonPath('data.repetitions', 10)
            ->assertJsonPath('data.exercise.id', $this->exercise->id);
        $this->assertDatabaseHas('sets', [
            'training_session_id' => $this->ownerSession->id,
            'exercise_id' => $this->exercise->id,
            'repetitions' => 10,
        ]);
    }

    public function test_user_cannot_add_set_to_another_users_session()
    {
        Passport::actingAs($this->anotherUser); 
        $setData = ['exercise_id' => $this->exercise->id, 'set_number' => 1, 'repetitions' => 5, 'weight' => 20];
        $this->postJson("/api/sessions/{$this->ownerSession->id}/sets", $setData)
            ->assertStatus(403); 
    }

    public function test_add_set_fails_with_missing_required_fields()
    {
        Passport::actingAs($this->sessionOwner);
        $this->postJson("/api/sessions/{$this->ownerSession->id}/sets", ['weight' => 50])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['exercise_id', 'set_number', 'repetitions']);
    }

    public function test_add_set_fails_with_non_existent_exercise()
    {
        Passport::actingAs($this->sessionOwner);
        $setData = ['exercise_id' => 9999, 'set_number' => 1, 'repetitions' => 5, 'weight' => 20];
        $this->postJson("/api/sessions/{$this->ownerSession->id}/sets", $setData)
            ->assertStatus(422) 
            ->assertJsonValidationErrors(['exercise_id']);
    }

}