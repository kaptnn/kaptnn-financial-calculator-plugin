<?php

function restrict_page_access()
{
    $protected_pages = ['dashboard', 'goal-seeking-of-weighted-average'];

    global $wp_query;
    $current_page = $wp_query->query['pagename'] ?? '';

    if (in_array($current_page, $protected_pages)) {
        if (!isset($_COOKIE['access_token'])) {
            wp_redirect('/login');
            exit;
        }

        $decoded_payload = validate_jwt_token($_COOKIE['access_token']);

        if ($decoded_payload['membership_status'] !== 'pro') {
            wp_redirect('/error?message=membership_status_basic');
            exit;
        }
    }
}

function validate_jwt_token($token)
{
    $secret_key = 'secret';
    $parts = explode('.', $token);

    if (count($parts) !== 3) {
        wp_redirect('/error?message=invalid_token_structure');
        exit;
    }

    list($header, $payload, $signature) = $parts;

    $calculated_signature = base64_encode(hash_hmac('sha256', "$header.$payload", $secret_key, true));
    $calculated_signature = rtrim(strtr($calculated_signature, '+/', '-_'), '=');

    if ($signature !== $calculated_signature) {
        wp_redirect('/error?message=invalid_token_signature');
        exit;
    }

    $payload_decoded = json_decode(base64_decode($payload), true);
    if (!$payload_decoded) {
        wp_redirect('/error?message=invalid_token_payload');
        exit;
    }

    if (isset($payload_decoded['exp']) && time() > $payload_decoded['exp']) {
        wp_redirect('/error?message=token_expired');
        exit;
    }

    return $payload_decoded;
}
