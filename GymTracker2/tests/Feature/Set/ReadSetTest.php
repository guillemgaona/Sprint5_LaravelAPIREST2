<?php

namespace Tests\Feature\Set;

use App\Models\Set;
use App\Models\Exercise;
use App\Models\TrainingSession;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class ReadSetTest extends TestCase
{
    use RefreshDatabase;

    protected User $sessionOwner;
    protected User $anotherUser;
    protected User $adminUser;
    protected TrainingSession $ownerSession;
    protected Set $setInOwnerSession;

    protected function setUp(): void
    {
        parent::setUp();
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);

        $this->sessionOwner = User::factory()->create()->assignRole($userRole);
        $this->anotherUser = User::factory()->create()->assignRole($userRole);
        $this->adminUser = User::factory()->create()->assignRole($adminRole);

        $this->ownerSession = TrainingSession::factory()->for($this->sessionOwner)->create();
        $exercise = Exercise::factory()->create();
        Set::factory()->count(3)->for($this->ownerSession)->for($exercise)->create();
        $this->setInOwnerSession = $this->ownerSession->sets()->first();
    }


    public function test_user_can_list_sets_for_their_own_session()
    {
        Passport::actingAs($this->sessionOwner);
        $this->getJson("/api/sessions/{$this->ownerSession->id}/sets")
            ->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_admin_can_list_sets_for_any_session()
    {
        Passport::actingAs($this->adminUser);
        $this->getJson("/api/sessions/{$this->ownerSession->id}/sets")
            ->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    public function test_user_cannot_list_sets_for_another_users_session()
    {
        Passport::actingAs($this->anotherUser);
        $this->getJson("/api/sessions/{$this->ownerSession->id}/sets")
            ->assertStatus(403);
    }

    public function test_user_can_get_their_own_specific_set()
    {
        Passport::actingAs($this->sessionOwner);
        $this->getJson("/api/sets/{$this->setInOwnerSession->id}")
            ->assertStatus(200)
            ->assertJsonPath('data.id', $this->setInOwnerSession->id);
    }

    public function test_admin_can_get_any_specific_set()
    {
        Passport::actingAs($this->adminUser);
        $this->getJson("/api/sets/{$this->setInOwnerSession->id}")
            ->assertStatus(200)
            ->assertJsonPath('data.id', $this->setInOwnerSession->id);
    }

    public function test_user_cannot_get_another_users_specific_set()
    {
        Passport::actingAs($this->anotherUser);
        $this->getJson("/api/sets/{$this->setInOwnerSession->id}")
            ->assertStatus(403); 
    }

    public function test_get_non_existent_set_returns_404()
    {
        Passport::actingAs($this->sessionOwner);
        $this->getJson("/api/sets/9999")
            ->assertStatus(404);
    }


}
