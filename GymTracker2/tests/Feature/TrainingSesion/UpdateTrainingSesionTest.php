<?php

namespace Tests\Feature\TrainingSession;

use App\Models\TrainingSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class TrainingSessionUpdateTest extends TestCase
{
    use RefreshDatabase;

    protected User $ownerUser;
    protected User $anotherUser;
    protected User $adminUser;
    protected TrainingSession $ownerSession;

    protected function setUp(): void
    {
        parent::setUp();
        Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);

        $this->ownerUser = User::factory()->create()->assignRole('user');
        $this->anotherUser = User::factory()->create()->assignRole('user');
        $this->adminUser = User::factory()->create()->assignRole('admin');
        $this->ownerSession = TrainingSession::factory()->for($this->ownerUser)->create(['notes' => 'Initial notes']);
    }


    public function test_user_can_update_their_own_session()
    {
        Passport::actingAs($this->ownerUser);
        $updateData = ['notes' => 'Updated notes', 'date' => Carbon::yesterday()->toDateString()];

        $this->putJson("/api/sessions/{$this->ownerSession->id}", $updateData)
            ->assertStatus(200)
            ->assertJsonPath('data.notes', 'Updated notes');
        $this->assertDatabaseHas('training_sessions', ['id' => $this->ownerSession->id, 'notes' => 'Updated notes']);
    }

    public function test_admin_can_update_any_session()
    {
        Passport::actingAs($this->adminUser);
        $updateData = ['notes' => 'Admin updated notes'];
        $this->putJson("/api/sessions/{$this->ownerSession->id}", $updateData)
            ->assertStatus(200)
            ->assertJsonPath('data.notes', 'Admin updated notes');
    }

    public function test_user_cannot_update_another_users_session()
    {
        Passport::actingAs($this->anotherUser); 
        $this->putJson("/api/sessions/{$this->ownerSession->id}", ['notes' => 'Attempted update'])
            ->assertStatus(403); 
    }

    public function test_update_session_fails_with_invalid_data()
    {
        Passport::actingAs($this->ownerUser);
        $this->putJson("/api/sessions/{$this->ownerSession->id}", ['date' => 'not-a-date'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['date']);
    }

    public function test_update_non_existent_session_returns_404()
    {
        Passport::actingAs($this->ownerUser);
        $this->putJson("/api/sessions/9999", ['notes' => 'No such session'])
            ->assertStatus(404);
    }

}