<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiAuthentication
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken(); // automatically parses Bearer from Authorization header

        if (!auth()->check() && !$token) {
            return response()->json([
                'error' => 'Unauthorized',
            ], 401);
        }

        return $next($request);
    }
}
