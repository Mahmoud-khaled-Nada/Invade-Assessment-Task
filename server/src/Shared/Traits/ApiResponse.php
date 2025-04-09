<?php

namespace Src\Shared\Traits;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    /**
     * Return a successful JSON response.
     *
     * @param array|object|null $data
     * @param string|null $message
     * @param int $statusCode
     * @return JsonResponse
     */
    public function success($data = [], string $message = null, int $statusCode = 200): JsonResponse
    {
        $response = [];

        if (!empty($data)) {
            $response['data'] = (object) $data;
        }

        if (!is_null($message)) {
            $response['message'] = $message;
        }

        return response()->json([
            'success' => true,
            'data' => $response['data'] ?? null,
            'message' => $response['message'] ?? null,
        ], $statusCode);
    }

    /**
     * Return an error JSON response.
     *
     * @param array|object|null $data
     * @param string|null $message
     * @param int $statusCode
     * @return JsonResponse
     */
    public function error($data = null, string $message = null, int $statusCode = 500): JsonResponse
    {
        $response = [];

        if (!empty($data)) {
            $response['data'] = (object) $data;
        }

        if (!is_null($message)) {
            $response['message'] = $message;
        }

        return response()->json([
            'success' => false,
            $response,
            // 'data' => $response['data'] ?? null,
            // 'message' => $response['message'] ?? null,
        ], $statusCode);
    }
}