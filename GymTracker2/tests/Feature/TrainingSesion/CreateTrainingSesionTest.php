<?php 

namespace Tests\Feature\TrainingSession;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class TrainingSessionCreateTest extends TestCase
{
    use RefreshDatabase;

    protected User $testUser;

    protected function setUp(): void
    {
        parent::setUp();
        Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        $this->testUser = User::factory()->create()->assignRole('user');
        Passport::actingAs($this->testUser);
    }

    public function test_authenticated_user_can_create_training_session()
    {
        $sessionData = [
            'date' => Carbon::now()->toDateString(),
            'notes' => 'Great leg day session!',
        ];

        $this->postJson('/api/sessions', $sessionData)
            ->assertStatus(201)
            ->assertJsonPath('data.notes', 'Great leg day session!')
            ->assertJsonPath('data.user_id', $this->testUser->id);
        $this->assertDatabaseHas('training_sessions', [
            'user_id' => $this->testUser->id,
            'notes' => 'Great leg day session!',
        ]);
    }

    public function test_create_training_session_fails_without_date()
    {
        $this->postJson('/api/sessions', ['notes' => 'No date'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['date']);
    }

    public function test_create_training_session_fails_with_invalid_date_format()
    {
        $this->postJson('/api/sessions', ['date' => 'not-a-date'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['date']);
    }


}