<?php

declare(strict_types=1);

namespace Src\Domains\User\Services;

use App\Http\Resources\UserResource;
use Src\Domains\User\Interfaces\IAuthService;

final class AuthService implements IAuthService
{
    public function login(array $data)
    {
        $credentials = [
            'email' => $data['email'],
            'password' => $data['password']
        ];

        if (! $token = auth()->attempt($credentials)) {
            return false;
        }

        return $this->respondWithToken($token);
    }

    public function logout()
    {
        return auth()->logout();
    }

    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function me()
    {
        return UserResource::make(auth()->user());
    }

    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ];
    }
}
