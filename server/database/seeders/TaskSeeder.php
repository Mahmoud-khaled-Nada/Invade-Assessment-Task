<?php

namespace Database\Seeders;

use App\Models\Task;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tasks = [
            [
                'user_id' => 1,
                'task' => 'Task 1',
                'completed' => false,
            ],
            [
                'user_id' => 1,
                'task' => 'Task 2',
                'completed' => true,
            ],
            [
                'user_id' => 1,
                'task' => 'Task 3',
                'completed' => false,
            ],
            [
                'user_id' => 1,
                'task' => 'Task 4',
                'completed' => true,
            ],
            [
                'user_id' => 1,
                'task' => 'Task 5',
                'completed' => false,
            ],
            [
                'user_id' => 1,
                'task' => 'Task 6',
                'completed' => true,
            ],
            [
                'user_id' => 1,
                'task' => 'Task 7',
                'completed' => false,
            ],
            [
                'user_id' => 1,
                'task' => 'Task 8',
                'completed' => true,
            ],
            [
                'user_id' => 1,
                'task' => 'Task 9',
                'completed' => false,
            ],
            [
                'user_id' => 1,
                'task' => 'Task 10',
                'completed' => true,
            ],
        ];

        foreach ($tasks as $task) {
            // array_merge($task, ['created_at' => now(), 'updated_at' => now()]);
            Task::create($task);
        }
    }
}
