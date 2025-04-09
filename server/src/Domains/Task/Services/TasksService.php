<?php

declare(strict_types=1);

namespace Src\Domains\Task\Services;

use App\Models\Task;
use Src\Domains\Task\Interfaces\ITasksService;
use Src\Repositories\Taske\TesksRepository;
use Illuminate\Support\Collection;

final class TasksService implements ITasksService
{
    public function __construct(
        private readonly TesksRepository $repository
    ) {}

    public function all(): Collection
    {
        return $this->repository->all();
    }

    public function add(array $data): Task
    {
        return $this->repository->add($data);
    }

    public function update(Task $task, array $data)
    {
        return $this->repository->update($task, $data);
    }

    public function delete(Task $task): bool
    {
        return $this->repository->delete($task);
    }

    public function find(int $id)
    {
        return $this->repository->find($id);
    }

    public function restore(): mixed
    {
        return $this->repository->restore();
    }

    public function complete(Task $task): bool
    {
        return $this->repository->complete($task);
    }
}
