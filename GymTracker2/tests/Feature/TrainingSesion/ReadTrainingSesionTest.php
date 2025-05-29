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




}
