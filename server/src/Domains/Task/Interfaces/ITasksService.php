<?php

declare(strict_types=1);

namespace Src\Domains\Task\Interfaces;

use App\Models\Task;
use Illuminate\Support\Collection;

interface ITasksService
{
    public function all(): Collection;

    public function add(array $data): Task;

    public function update(Task $task, array $data);

    public function delete(Task $task);

    public function find(int $id);

    public function restore(): mixed;
    public function complete(Task $task): bool;
}
