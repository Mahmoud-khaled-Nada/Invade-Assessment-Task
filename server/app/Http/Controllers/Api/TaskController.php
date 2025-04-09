<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Src\Domains\Task\Interfaces\ITasksService;

class TaskController extends Controller
{
    public function __construct(
        private readonly ITasksService $tasksService
    ) {}
    public function index()
    {
        try {
            $tasks = $this->tasksService->all();
            return response()->json($tasks, 200);
        } catch (\Throwable $th) {
            return $this->error([], $th->getMessage());
        }
    }

    public function search(Request $request)
    {
        try {
            $query = $request->get('query');
            $tasks = $this->tasksService->search($query );
            return response()->json($tasks, 200);
        } catch (\Throwable $th) {
            return $this->error([], $th->getMessage());
        }
    }

    public function create(TaskRequest $request)
    {
        try {
            $params = $request->all();
            // $params["user_id"] = auth()->id();
            $tasks = $this->tasksService->add($params);
            return $this->success($tasks, 'Tasks created successfully', 200);
        } catch (\Throwable $th) {
            return $this->error([], $th->getMessage());
        }
    }

    public function update(UpdateTaskRequest $request, Task $task)
    {
        try {
            $params = $request->all();
            $tasks = $this->tasksService->update($task, $params);
            return $this->success($tasks, 'Tasks updated successfully', 200);
        } catch (\Throwable $th) {
            return $this->error([], $th->getMessage());
        }
    }

    public function destroy(Task $task)
    {
        try {
            $tasks = $this->tasksService->delete($task);
            return $this->success($tasks, 'Tasks deleted successfully', 200);
        } catch (\Throwable $th) {
            return $this->error([], $th->getMessage());
        }
    }

    public function restore()
    {
        try {
             $this->tasksService->restore();
            return $this->success([], 'Tasks restored successfully', 200);
        } catch (\Throwable $th) {
            return $this->error([], $th->getMessage());
        }
    }

    public function complete(Task $task)
    {
        try {
            $tasks = $this->tasksService->complete($task);
            return $this->success([], 'checked successfully', 200);
        } catch (\Throwable $th) {
            return $this->error([], $th->getMessage());
        }
    }
}
