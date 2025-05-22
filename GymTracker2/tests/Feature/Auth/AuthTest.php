<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Laravel\Passport\Passport;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Role::firstOrCreate(['name' => 'user', 'guard_name' => 'api']);
        Role::firstOrCreate(['name' => 'admin', 'guard_name' => 'api']);
    }

    // REGISTRATION TESTS
    public function test_user_can_register_successfully()
    {
        $payload = [
            'username' => 'newuser',
            'name' => 'New User',
            'email' => 'newuser@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];

        $this->postJson('/api/register', $payload)
            ->assertStatus(201)
            ->assertJsonStructure(['message', 'user' => ['id', 'username', 'name', 'email']])
            ->assertJsonPath('user.email', 'newuser@example.com');

        $this->assertDatabaseHas('users', ['email' => 'newuser@example.com']);
        $user = User::whereEmail('newuser@example.com')->first();
        $this->assertTrue($user->hasRole('user'));
    }

    public function test_registration_fails_with_missing_fields()
    {
        $this->postJson('/api/register', ['email' => 'test@example.com'])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['username', 'name', 'password']);
    }

    public function test_registration_fails_with_duplicate_email()
    {
        User::factory()->create(['email' => 'existing@example.com']);
        $payload = [
            'username' => 'anotheruser',
            'name' => 'Another User',
            'email' => 'existing@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ];
        $this->postJson('/api/register', $payload)
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    // LOGIN TESTS
    public function test_user_can_login_with_correct_credentials()
    {
        $user = User::factory()->create([
            'email' => 'testlogin@example.com',
            'password' => Hash::make('securepassword'),
        ]);

        $this->postJson('/api/login', ['email' => 'testlogin@example.com', 'password' => 'securepassword'])
            ->assertStatus(200)
            ->assertJsonStructure(['access_token', 'token_type', 'expires_at', 'user']);
    }

    public function test_login_fails_with_incorrect_credentials()
    {
        User::factory()->create(['email' => 'testlogin@example.com']);
        $this->postJson('/api/login', ['email' => 'testlogin@example.com', 'password' => 'wrongpassword'])
            ->assertStatus(401)
            ->assertJson(['error' => 'Unauthenticated']);
    }

    // LOGOUT TESTS
    public function test_authenticated_user_can_logout()
    {
        $user = User::factory()->create();
        Passport::actingAs($user);

        $this->postJson('/api/logout')
            ->assertStatus(200)
            ->assertJson(['message' => 'Successfully logged out']);
    }

    public function test_unauthenticated_user_cannot_logout()
    {
        $this->postJson('/api/logout')
            ->assertStatus(401); 
    }

    // GET AUTHENTICATED USER
    public function test_authenticated_user_can_fetch_their_details()
    {
        $user = User::factory()->create();
        Passport::actingAs($user);

        $this->getJson('/api/user')
            ->assertStatus(200)
            ->assertJsonPath('data.id', $user->id)
            ->assertJsonPath('data.email', $user->email);
    }
}