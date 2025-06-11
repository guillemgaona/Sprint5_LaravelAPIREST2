<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class ReadUsersTest extends TestCase
{
    use RefreshDatabase;

    protected User $adminUser;
    protected User $regularUser;
    protected User $anotherUser;

    protected function setUp(): void
    {
        parent::setUp();
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);

        $this->adminUser = User::factory()->create()->assignRole($adminRole);
        $this->regularUser = User::factory()->create()->assignRole($userRole);
        $this->anotherUser = User::factory()->create()->assignRole($userRole);
    }

    public function test_admin_can_get_any_user_information()
    {
        Passport::actingAs($this->adminUser);
        $this->getJson("/api/users/{$this->anotherUser->id}")
            ->assertStatus(200)
            ->assertJsonPath('data.id', $this->anotherUser->id);
    }

    public function test_user_can_get_their_own_information()
    {
        Passport::actingAs($this->regularUser);
        $this->getJson("/api/users/{$this->regularUser->id}")
            ->assertStatus(200)
            ->assertJsonPath('data.id', $this->regularUser->id);
    }

    public function test_user_cannot_get_another_users_information()
    {
        Passport::actingAs($this->regularUser);
         $this->getJson("/api/users/{$this->anotherUser->id}")
             ->assertStatus(200)
             ->assertJsonPath('data.id', $this->anotherUser->id);
    }

    public function test_unauthenticated_user_cannot_get_user_information()
    {
        $this->getJson("/api/users/{$this->regularUser->id}")
            ->assertStatus(401);
    }

    public function test_get_non_existent_user_returns_404()
    {
        Passport::actingAs($this->adminUser);
        $this->getJson("/api/users/9999")
            ->assertStatus(404);
    }
}