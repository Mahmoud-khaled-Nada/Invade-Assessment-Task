<?php

declare(strict_types=1);

namespace Src\Repositories\User;

use App\Models\Profile;
use App\Models\User;


final class UserRegistrationRepository
{
    public function add(&$data)
    {
        $user = User::create($data);
        if ($data['avatar']) {
            $this->createOrUpdateProfile($user, $data['avatar']);
        }
        return  $user;
    }

    public function createOrUpdateProfile(User $user, $avatar): Profile
    {
        return $user->profile()->updateOrCreate([
            'user_id' => $user->id
        ], [
            'avatar' => $avatar
        ]);
    }
}
