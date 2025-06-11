<?php

namespace App\Policies;

use App\Models\TrainingSession;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TrainingSessionPolicy
{
    use HandlesAuthorization;


    public function viewAny(User $user): bool
    {

        return true;
    }

    public function view(User $user, TrainingSession $trainingSession): bool
    {
        return $user->id === $trainingSession->user_id || $user->hasRole('admin');
    }

    public function create(User $user): bool
    {
        return true;
    }

    public function update(User $user, TrainingSession $trainingSession): bool
    {
        return $user->id === $trainingSession->user_id || $user->hasRole('admin');
    }

    public function delete(User $user, TrainingSession $trainingSession): bool
    {
        return $user->id === $trainingSession->user_id || $user->hasRole('admin');
    }

    public function addSet(User $user, TrainingSession $trainingSession): bool
    {
        return $user->id === $trainingSession->user_id || $user->hasRole('admin');
    }
}