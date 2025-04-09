<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\{LoginRequest, RegisterRequest};
use Src\Domains\User\Interfaces\{IRegisterService, IAuthService};

class AuthController extends Controller
{
    public function __construct(
        private readonly IRegisterService $registerService,
        private readonly IAuthService $authService,
    ) {}

    public function register(RegisterRequest $request)
    {
        try {
            $params = $request->all();

            if ($request->hasFile('avatar')) {
                $params['avatar'] = $request->file('avatar')->store('avatars', 'public');
            }

           $user =  $this->registerService->register($params);
           $attempted = $this->authService->login(['email' => $user->email, 'password' => $params['password']]);

            if (!$attempted)
                return $this->error([], 'Invalid credentials', 401);

            return $this->success( $attempted, 'User created successfully', 201);
        } catch (\Exception $e) {
            \Log::error("Error from register: " . $e->getMessage());
            return $this->error([], $e->getMessage());
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $params = $request->all();
            $attempted = $this->authService->login($params);

            if (!$attempted)
                return $this->error([], 'Invalid credentials', 401);

            return $this->success($attempted, 'User logged successfully', 201);
        } catch (\Exception $e) {
            \Log::error("Error from register: " . $e->getMessage());
            return $this->error([], $e->getMessage());
        }
    }

    public function me(Request $request)
    {
        return $this->success($this->authService->me(), 'User logged successfully', 201);
    }

    public function logout(Request $request)
    {
        return $this->success($this->authService->logout(), 'User logout successfully', 201);
    }

    public function refresh(Request $request)
    {
        return; // $this->success($this->authService->refresh(), 'User logged successfully', 201);
    }
}
