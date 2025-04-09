<?php

declare(strict_types=1);

namespace Src\Repositories\Taske;

use App\Models\Task;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

final class TesksRepository
{
    public function all(): LengthAwarePaginator
    {
        return Task::select('id', 'task', 'completed', 'created_at', 'updated_at')
            ->orderBy('created_at', 'desc')
            ->paginate(5);
    }


    public function search(string $query): Collection
    {
        return Task::query()
            ->where('task', 'like', '%' . trim($query) . '%')
            ->orderByDesc('created_at')
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
