<?php

namespace Utils;

class ApiClient
{
    // Base URL Public
    private static $base_url = 'https://api.sempoa.my.id/api/v1';
    
    // Base URL Local
    // private static $base_url = 'http://127.0.0.1:8000/api/v1';

    public static function get($endpoint, $params = [])
    {
        $url = self::$base_url . $endpoint . '?' . http_build_query($params);

        $response = wp_remote_get($url, [
            'headers' => [
                'Accept' => 'application/json',
            ],
        ]);

        if (!is_wp_error($response)) {
            $body = wp_remote_retrieve_body($response);
            $data = json_decode($body, true);

            if ($data) {
                return $data;
            }
        }

        if (is_wp_error($response)) {
            error_log("Server-side request failed: " . $response->get_error_message());
        } else {
            $status_code = wp_remote_retrieve_response_code($response);
            error_log("Server-side request failed with status code: " . $status_code);
        }

        return self::clientSideFallback($endpoint, $params);
    }

    private static function clientSideFallback($endpoint, $params = [])
    {
        $url = self::$base_url . $endpoint . '?' . http_build_query($params);

        return [
            'fallback' => true,
            'url' => $url,
            'message' => 'Server-side proxy failed, fallback to client-side API call.',
        ];
    }

    public static function post($endpoint, $data)
    {
        $response = wp_remote_post(self::$base_url . $endpoint, [
            'body' => json_encode($data),
            'headers' => [
                'Content-Type' => 'application/json',
                'Accept' => 'application/json',
            ],
        ]);

        if (is_wp_error($response)) {
            throw new \Exception($response->get_error_message());
        }

        $body = wp_remote_retrieve_body($response);
        return json_decode($body, true);
    }
}
