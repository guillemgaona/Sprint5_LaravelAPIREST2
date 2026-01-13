<?php

namespace App\Providers;

use App\Models\TrainingSession;
use App\Policies\TrainingSessionPolicy;
use App\Models\User; 
use App\Policies\UserPolicy; 
use App\Models\Set; 
use App\Policies\SetPolicy; 

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate; 
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{

    protected $policies = [
        TrainingSession::class => TrainingSessionPolicy::class,
        Set::class => SetPolicy::class,
        User::class => UserPolicy::class, 

    ];

    public function boot(): void
    {
        $this->registerPolicies();
        
        Passport::tokensExpireIn(now()->addDays(15));
        Passport::refreshTokensExpireIn(now()->addDays(30));
        Passport::personalAccessTokensExpireIn(now()->addMonths(6));

    }
}