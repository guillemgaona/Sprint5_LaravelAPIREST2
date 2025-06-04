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

class DeleteSetTest extends TestCase
{
    use RefreshDatabase;

    protected User $setOwner;
    protected User $anotherUser;
    protected User $adminUser;
    protected Set $ownerSet;

    protected function setUp(): void
    {
        parent::setUp();
        Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);

        $this->setOwner = User::factory()->create()->assignRole('user');
        $this->anotherUser = User::factory()->create()->assignRole('user');
        $this->adminUser = User::factory()->create()->assignRole('admin');

        $session = TrainingSession::factory()->for($this->setOwner)->create();
        $exercise = Exercise::factory()->create();
        $this->ownerSet = Set::factory()->for($session)->for($exercise)->create();
    }

 
    public function test_user_can_delete_set_from_their_own_session()
    {
        Passport::actingAs($this->setOwner);
        $this->deleteJson("/api/sets/{$this->ownerSet->id}")
            ->assertStatus(204);
        $this->assertDatabaseMissing('sets', ['id' => $this->ownerSet->id]);
    }

    public function test_admin_can_delete_any_set()
    {
        Passport::actingAs($this->adminUser);
        $this->deleteJson("/api/sets/{$this->ownerSet->id}")
            ->assertStatus(204);
    }

    public function test_user_cannot_delete_set_from_another_users_session()
    {
        Passport::actingAs($this->anotherUser);
        $this->deleteJson("/api/sets/{$this->ownerSet->id}")
            ->assertStatus(403); 
    }

    public function test_delete_non_existent_set_returns_404()
    {
        Passport::actingAs($this->setOwner);
        $this->deleteJson("/api/sets/9999")
            ->assertStatus(404);
    }
}
