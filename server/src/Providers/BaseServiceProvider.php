<?php

namespace Src\Providers;

use Illuminate\Support\ServiceProvider;
use Src\Domains\Task\Interfaces\ITasksService;
use Src\Domains\Task\Services\TasksService;
use Src\Domains\User\Interfaces\{IRegisterService,IAuthService};
use Src\Domains\User\Services\{AuthService,RegisterService};
use Src\Repositories\Taske\TesksRepository;

class BaseServiceProvider extends ServiceProvider
{

    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(IRegisterService::class, fn () => new RegisterService());
        $this->app->singleton(IAuthService::class, fn () => new AuthService());

        $this->app->singleton(ITasksService::class, fn ($app) => new TasksService($app->make(TesksRepository::class)));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
