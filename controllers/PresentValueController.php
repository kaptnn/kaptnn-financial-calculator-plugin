<?php

namespace Controllers;

use Utils\ApiClient;

class PresentValueController
{
    public static function handleRequest($data)
    {
        try {
            $params = [
                'future_value' => floatval($data['future_value']),
                'rate' => floatval($data['rate']),
                'period' => floatval($data['period']),
            ];

            $result = ApiClient::get('/calculator/present-value', $params);

            if (isset($result['fallback']) && $result['fallback'] === true) {
                wp_send_json_error($result);
            }

            wp_send_json_success($result);
        } catch (\Exception $e) {
            wp_send_json_error(['error' => $e->getMessage()]);
        }
    }
}
