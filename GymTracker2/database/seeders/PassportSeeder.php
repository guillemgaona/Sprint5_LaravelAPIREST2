<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PassportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('oauth_clients')->insert([
            [
                'id' => '9c50e79c-85e6-425d-a0c3-a9d45e12a4a9',
                'owner_id' => null,
                'owner_type' => null,
                'name' => 'Personal Access Client',
                'secret' => 'aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBcDeFgHiJkLmNoPqRsTuVwXyZ1234567890aBcDeFgHiJkLmNoPqRsTuVwXyZ1',
                'provider' => null,
                'redirect_uris' => 'http://localhost',
                // --- LA CORRECCIÓN CLAVE ---
                // Se guarda como una cadena de texto en formato JSON
                'grant_types' => json_encode(['personal_access']),
                'revoked' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => '9c50e7f7-b1a2-4a94-8840-27f999f6634b',
                'owner_id' => null,
                'owner_type' => null,
                'name' => 'Password Grant Client',
                'secret' => '0987654321ZyXwVuTsRqPoNmLkJiHgFeDcBa0987654321ZyXwVuTsRqPoNmLkJiHgFeDcBa0987654321ZyXwVuTsRqPoNm',
                'provider' => 'users',
                'redirect_uris' => 'http://localhost',
                // --- LA CORRECCIÓN CLAVE ---
                // Se guarda como una cadena de texto en formato JSON
                'grant_types' => json_encode(['password']),
                'revoked' => false,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        DB::table('oauth_personal_access_clients')->insert([
            'client_id' => '9c50e79c-85e6-425d-a0c3-a9d45e12a4a9',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}