<?php

declare(strict_types=1);

namespace Src\Domains\User\Services;

use Illuminate\Support\Facades\Storage;
use Src\Domains\User\Interfaces\IRegisterService;
use Src\Repositories\User\UserRegistrationRepository;

final class RegisterService implements IRegisterService
{
    public function __construct(
        // private readonly UserRegistrationRepository $repository
    ) {}
    public function register(array &$data)
    {
        return app(UserRegistrationRepository::class)->add($data);
    }
    
}

//UserRegistrationRepository