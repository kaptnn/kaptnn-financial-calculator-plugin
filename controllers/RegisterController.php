<?php

namespace Controllers;

use Utils\ApiClient;

class RegisterController
{
    public static function handleRequest($data)
    {
        try {
            if (empty($data['name']) || empty($data['email']) || empty($data['company']) || empty($data['password'])) {
                wp_send_json_error([
                    'error' => 'All fields (name, email, company, password) are required.'
                ], 400);
                return;
            }

            $requestData = [
                'name' => sanitize_text_field($data['name']),
                'email' => sanitize_email($data['email']),
                'company' => sanitize_text_field($data['company']),
                'password' => $data['password'],
            ];

            $result = ApiClient::post('/auth/register', $requestData);

            if (!isset($data['_wpnonce']) || !wp_verify_nonce($data['_wpnonce'], 'auth_nonce')) {
                wp_send_json_error(['error' => 'Invalid nonce.'], 403);
                return;
            }

            if (isset($result['fallback']) && $result['fallback'] === true) {
                wp_send_json_error($result, 400);
                return;
            }

            wp_send_json_success($result, 200);
        } catch (\Exception $e) {
            wp_send_json_error([
                'error' => 'An error occurred during registration.',
                'details' => $e->getMessage(),
            ], 500);
        }
    }
}
