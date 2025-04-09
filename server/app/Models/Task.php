<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;

class Task extends Model
{
    // soft delete
    use SoftDeletes;
    protected $dates = ['deleted_at'];
    protected $table = 'tasks';
    protected $keyType = 'string';

    protected $fillable = [
        'user_id',
        'task',
        'completed',
    ];

    protected static function booted()
    {
        static::creating(function (Task $task) {
            if (empty($task->id)) {
                $task->id = Str::uuid();
            }
    
            // Always set the user_id (when authenticated)
            if (auth()->check()) {
                $task->user_id = auth()->id();
            }
        });
    
        static::addGlobalScope('user', function ($query) {
            if (auth()->check()) {
                $query->where('user_id', auth()->id());
            }
        });
    }
    


    public function scopeCompleted($query)
    {
        return $query->where('completed', true);
    }

    public function scopeNotCompleted($query)
    {
        return $query->where('completed', false);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
