<?php 

declare(strict_types=1);

namespace Src\Domains\User\Interfaces;

interface IRegisterService
{
    public function register(array &$data);
}