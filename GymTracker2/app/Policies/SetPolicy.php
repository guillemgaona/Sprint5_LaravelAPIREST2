<?php

namespace App\Policies;

use App\Models\Set;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SetPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true;
    }


    public function view(User $user, Set $set): bool
    {
        return $user->id === $set->trainingSession->user_id || $user->hasRole('admin');
    }


    public function create(User $user): bool
    {
        return true;
    }


    public function update(User $user, Set $set): bool
    {
        return $user->id === $set->trainingSession->user_id || $user->hasRole('admin');
    }

    public function delete(User $user, Set $set): bool
    {
        return $user->id === $set->trainingSession->user_id || $user->hasRole('admin');
    }

}