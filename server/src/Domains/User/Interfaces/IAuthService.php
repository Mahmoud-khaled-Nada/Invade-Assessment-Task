<?php 

declare(strict_types=1);

namespace Src\Domains\User\Interfaces;

interface IAuthService
{
    public function login(array $data);
    public function logout();
    public function refresh();
    public function me();
}