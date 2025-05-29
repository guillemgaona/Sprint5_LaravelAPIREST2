<?php

namespace Tests\Feature\TrainingSession;

use App\Models\TrainingSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class TrainingSessionReadTest extends TestCase
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
        TrainingSession::factory()->count(2)->for($this->ownerUser)->create();
        TrainingSession::factory()->count(3)->for($this->anotherUser)->create();
    }


    public function test_authenticated_user_can_list_their_own_sessions()
    {
        Passport::actingAs($this->ownerUser);
        $this->getJson('/api/sessions')
            ->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }
    
    public function test_admin_can_list_sessions_for_any_user()
    {
        Passport::actingAs($this->adminUser);
        $this->getJson("/api/users/{$this->anotherUser->id}/sessions")
            ->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_user_can_list_their_own_sessions_via_user_endpoint()
    {
        Passport::actingAs($this->ownerUser);
        $this->getJson("/api/users/{$this->ownerUser->id}/sessions")
            ->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_user_can_get_their_own_specific_session()
    {
        Passport::actingAs($this->ownerUser);
        $this->getJson("/api/sessions/{$this->ownerSession->id}")
            ->assertStatus(200)
            ->assertJsonPath('data.id', $this->ownerSession->id);
    }

    public function test_admin_can_get_any_specific_session()
    {
        Passport::actingAs($this->adminUser);
        $anotherUserSession = TrainingSession::factory()->for($this->anotherUser)->create();
        $this->getJson("/api/sessions/{$anotherUserSession->id}")
            ->assertStatus(200)
            ->assertJsonPath('data.id', $anotherUserSession->id);
    }

    public function test_user_cannot_get_another_users_specific_session()
    {
        Passport::actingAs($this->ownerUser);
        $anotherUserSession = TrainingSession::factory()->for($this->anotherUser)->create();
        $this->getJson("/api/sessions/{$anotherUserSession->id}")
            ->assertStatus(403); 
    }

    public function test_get_non_existent_session_returns_404()
    {
        Passport::actingAs($this->ownerUser);
        $this->getJson("/api/sessions/9999")
            ->assertStatus(404);
    }



}
