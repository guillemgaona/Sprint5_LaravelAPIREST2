<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Passport\Client;

class CreatePassportClients extends Command
{
    protected $signature = 'app:create-passport-clients';
    protected $description = 'Crea los clientes de Passport y los muestra por consola';

    public function handle()
    {
    /*
    Ejecuta los comandos de creacion de personal client
    y password client, que graban en la tabla oauth_client 
    los dos clientes
    */

        // Create Password Grant Client
        $this->call('passport:client', [
            '--password' => true,
            '--name' => 'Password Grant Client',
            '--provider' => 'users',
            '--no-interaction' => true,
        ]);

        // Create Personal Access Client
        $this->call('passport:client', [
            '--personal' => true,
            '--name' => 'Personal Access Client',
            '--provider' => 'users',
            '--no-interaction' => true,
        ]);

        $this->info("\n¡Passport and personal clients successfully created!");
    }
}