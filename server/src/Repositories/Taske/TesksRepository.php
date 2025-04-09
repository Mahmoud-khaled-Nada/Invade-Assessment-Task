<?php

declare(strict_types=1);

namespace Src\Repositories\Taske;

use App\Models\Task;
use Illuminate\Support\Collection;

final class TesksRepository
{
    public function all(): Collection
    {
        return Task::select('id', 'task', 'completed', 'created_at', 'updated_at')
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function add(array &$data): Task
    {
        return Task::create($data);
    }

    public function update(Task $task, &$data): Task
    {
        $task->update($data);
        return $task;
    }

    public function delete(Task $task): bool
    {
        return $task->delete();
    }

    public function find(int $id)
    {
        return Task::find($id);
    }

    public function restore(): mixed
    {
        return Task::onlyTrashed()->restore();
    }

    public function complete(Task $task): bool
    {
        if ($task->completed)
            return $this->notComplete($task);

        return $task->update(['completed' => true]);
    }

    public function notComplete(Task $task): bool
    {
        return $task->update(['completed' => false]);
    }
}
