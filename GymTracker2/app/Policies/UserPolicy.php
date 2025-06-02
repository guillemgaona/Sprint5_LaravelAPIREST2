<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return $user->hasRole('admin');
    }

    public function view(User $authenticatedUser, User $userToView): bool
    {
        return $authenticatedUser->id === $userToView->id || $authenticatedUser->hasRole('admin');
    }

    public function create(User $user): bool
    {
        return $user->hasRole('admin');
    }

    public function update(User $authenticatedUser, User $userToUpdate): bool
    {
        return $authenticatedUser->id === $userToUpdate->id || $authenticatedUser->hasRole('admin');
    }

    public function delete(User $authenticatedUser, User $userToDelete): bool
    {
        if ($authenticatedUser->hasRole('admin')) {

            return $authenticatedUser->id !== $userToDelete->id;
        }
        return $authenticatedUser->id === $userToDelete->id;
    }

    public function viewSessionsOf(User $authenticatedUser, User $targetUser): bool
    {
        return $authenticatedUser->id === $targetUser->id || $authenticatedUser->hasRole('admin');
    }


    public function viewStatsOf(User $authenticatedUser, User $targetUser): bool
    {

        return $authenticatedUser->id === $targetUser->id || $authenticatedUser->hasRole('admin');
    }
}