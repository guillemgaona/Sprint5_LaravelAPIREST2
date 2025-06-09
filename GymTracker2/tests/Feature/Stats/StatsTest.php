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

        
        $chestExercise = Exercise::factory()->create(['muscle_group' => 'chest']);
        $legsExercise = Exercise::factory()->create(['muscle_group' => 'legs']);

        // Session 1 (today)
        $session1 = TrainingSession::factory()->for($this->targetUser)->create(['date' => Carbon::today()]);
        Set::factory()->for($session1)->for($chestExercise)->create(['repetitions' => 10, 'weight' => 100]); // Volume: 1000
        Set::factory()->for($session1)->for($legsExercise)->create(['repetitions' => 8, 'weight' => 150]);  

        // Session 2 (yesterday)
        $session2 = TrainingSession::factory()->for($this->targetUser)->create(['date' => Carbon::yesterday()]);
        Set::factory()->for($session2)->for($chestExercise)->create(['repetitions' => 12, 'weight' => 90]); 

        // Session 3 (last week)
        TrainingSession::factory()->for($this->targetUser)->create(['date' => Carbon::today()->subWeek()]);
    }

   
    public function test_user_can_get_their_total_volume_per_muscle_group()
    {
        Passport::actingAs($this->requestingUser);
        $response = $this->getJson("/api/users/{$this->targetUser->id}/stats/volume");

        $response->assertStatus(200)
             ->assertJsonFragment(['muscle_group' => 'chest', 'total_volume' => "2080.00"])
             ->assertJsonFragment(['muscle_group' => 'legs', 'total_volume' => "1200.00"]);
    }

    
    public function test_user_can_get_their_session_frequency_per_week()
{
    Passport::actingAs($this->requestingUser);
    $response = $this->getJson("/api/users/{$this->targetUser->id}/stats/frequency");
    
    $response->assertStatus(200)
             ->assertJsonStructure([
                 'data' => [
                     '*' => [
                         'week_start_date',
                         'week_end_date',
                         'session_count'
                     ]
                 ]
             ]);
}



    public function test_user_can_get_their_personal_bests_per_exercise()
    {
        Passport::actingAs($this->requestingUser);

        $chestExerciseId = Exercise::where('muscle_group', 'chest')->first()->id;
        $legsExerciseId = Exercise::where('muscle_group', 'legs')->first()->id;

        $response = $this->getJson("/api/users/{$this->targetUser->id}/stats/personal-bests");

        $response->assertStatus(200)
            ->assertJsonFragment(['exercise_id' => $chestExerciseId, 'max_weight' => "100.00"]) 
            ->assertJsonFragment(['exercise_id' => $legsExerciseId, 'max_weight' => "150.00"]);
    }

    public function test_admin_can_get_stats_for_another_user()
    {
        Passport::actingAs($this->adminUser);
        $this->getJson("/api/users/{$this->targetUser->id}/stats/volume")->assertStatus(200);
        $this->getJson("/api/users/{$this->targetUser->id}/stats/frequency")->assertStatus(200);
        $this->getJson("/api/users/{$this->targetUser->id}/stats/personal-bests")->assertStatus(200);
    }

    public function test_user_cannot_get_stats_for_another_user_if_restricted()
    {
        $userRole = Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        $anotherUser = User::factory()->create()->assignRole($userRole);
        Passport::actingAs($anotherUser);
        $this->getJson("/api/users/{$this->targetUser->id}/stats/volume")->assertStatus(403);
        $this->getJson("/api/users/{$this->targetUser->id}/stats/frequency")->assertStatus(403);
        $this->getJson("/api/users/{$this->targetUser->id}/stats/personal-bests")->assertStatus(403);
    }

    public function test_get_stats_for_non_existent_user_returns_404()
    {
        Passport::actingAs($this->adminUser);
        $this->getJson("/api/users/9999/stats/volume")->assertStatus(404);
    }
}