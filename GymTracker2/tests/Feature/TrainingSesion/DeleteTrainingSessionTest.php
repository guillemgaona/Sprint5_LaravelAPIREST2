<?php

namespace Tests\Feature\TrainingSession;

use App\Models\TrainingSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class TrainingSessionDeleteTest extends TestCase
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
        $this->ownerSession = TrainingSession::factory()->for($this->ownerUser)->create();
    }

  
    public function test_user_can_delete_their_own_session()
    {
        Passport::actingAs($this->ownerUser);
        $this->deleteJson("/api/sessions/{$this->ownerSession->id}")
            ->assertStatus(204);
        $this->assertDatabaseMissing('training_sessions', ['id' => $this->ownerSession->id]);
        
    }

    public function test_admin_can_delete_any_session()
    {
        Passport::actingAs($this->adminUser);
        $sessionToDelete = TrainingSession::factory()->for($this->anotherUser)->create();
        $this->deleteJson("/api/sessions/{$sessionToDelete->id}")
            ->assertStatus(204);
        $this->assertDatabaseMissing('training_sessions', ['id' => $sessionToDelete->id]);
    }

    public function test_user_cannot_delete_another_users_session()
    {
        Passport::actingAs($this->anotherUser);
        $this->deleteJson("/api/sessions/{$this->ownerSession->id}")
            ->assertStatus(403); 
    }

    public function test_delete_non_existent_session_returns_404()
    {
        Passport::actingAs($this->ownerUser);
        $this->deleteJson("/api/sessions/9999")
            ->assertStatus(404);
    }


}