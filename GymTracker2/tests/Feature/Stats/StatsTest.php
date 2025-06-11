<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Exercise;
use App\Models\TrainingSession;
use App\Models\Set;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class StatsTest extends TestCase
{
    use RefreshDatabase;

    protected User $targetUser;
    protected User $requestingUser; 
    protected User $adminUser;

    protected function setUp(): void
    {
        parent::setUp();
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        $adminRole = Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);

        $this->targetUser = User::factory()->create()->assignRole($userRole);
        $this->requestingUser = $this->targetUser; 
        $this->adminUser = User::factory()->create()->assignRole($adminRole);

    }

    public function test_get_stats_for_non_existent_user_returns_404()
    {
        Passport::actingAs($this->adminUser);
        $this->getJson("/api/users/9999/stats/volume")->assertStatus(404);
    }
}