<?php

namespace Controllers;

use Utils\ApiClient;

class DepreciationCalculatorController
{
    public static function handleRequest($data)
    {
        try {
            $params = [
                'harga_perolehan' => floatval($data['harga_perolehan']),
                'estimasi_umur' => floatval($data['estimasi_umur']),
                'estimasi_nilai_sisa' => floatval($data['estimasi_nilai_sisa']),
                'metode' => sanitize_text_field($data['metode']),
            ];

            $result = ApiClient::get('/calculator/penyusutan', $params);

            if (isset($result['fallback']) && $result['fallback'] === true) {
                wp_send_json_error($result);
            }

            wp_send_json_success($result);
        } catch (\Exception $e) {
            wp_send_json_error(['error' => $e->getMessage()]);
        }
    }
}
