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

class UpdateSetTest extends TestCase
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
        $this->ownerSet = Set::factory()->for($session)->for($exercise)->create(['repetitions' => 8, 'weight' => 50.00]);
    }

  
    public function test_user_can_update_set_in_their_own_session()
    {
        Passport::actingAs($this->setOwner);
        $updateData = ['repetitions' => 12, 'weight' => 55.75];

        $this->putJson("/api/sets/{$this->ownerSet->id}", $updateData)
            ->assertStatus(200)
            ->assertJsonPath('data.repetitions', 12)
            ->assertJsonPath('data.weight', '55.75'); 
        $this->assertDatabaseHas('sets', ['id' => $this->ownerSet->id, 'repetitions' => 12, 'weight' => 55.75]);
    }

    public function test_admin_can_update_any_set()
    {
        Passport::actingAs($this->adminUser);
        $updateData = ['repetitions' => 5, 'weight' => 100.00];
        $this->putJson("/api/sets/{$this->ownerSet->id}", $updateData)
            ->assertStatus(200)
            ->assertJsonPath('data.weight', '100.00');
    }

    public function test_user_cannot_update_set_in_another_users_session()
    {
        Passport::actingAs($this->anotherUser);
        $this->putJson("/api/sets/{$this->ownerSet->id}", ['repetitions' => 6])
            ->assertStatus(403); 
    }

    public function test_update_set_fails_with_invalid_data()
    {
        Passport::actingAs($this->setOwner);
        $this->putJson("/api/sets/{$this->ownerSet->id}", ['repetitions' => 'not-a-number'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['repetitions']);
    }

    public function test_update_non_existent_set_returns_404()
    {
        Passport::actingAs($this->setOwner);
        $this->putJson("/api/sets/9999", ['repetitions' => 10])
            ->assertStatus(404);
    }

}