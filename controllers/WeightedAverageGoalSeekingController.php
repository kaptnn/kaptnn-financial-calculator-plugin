<?php

namespace Controllers;

use Utils\ApiClient;

class WeightedAverageGoalSeekingController
{
    public static function handleRequest($data)
    {
        try {
            $n_total = intval($data['n_total']);
            $goal = isset($data['goal']) ? floatval($data['goal']) : null;
            $weight_array = isset($data['weight_array']) ? array_map('floatval', (array) $data['weight_array']) : [];
            $loss_rate_array = isset($data['loss_rate_array']) ? array_map('floatval', (array) $data['loss_rate_array']) : null;

            if ($n_total !== count($weight_array)) {
                throw new \Exception('The number of weights must match n_total.');
            }

            $params = [
                'n_total' => $n_total,
            ];

            if (!empty($goal)) {
                $params['goal'] = $goal;
            }

            foreach ($weight_array as $weight) {
                $params['weight_array'][] = $weight;
            }

            if ($loss_rate_array !== null) {
                foreach ($loss_rate_array as $loss_rate) {
                    $params['loss_rate_array'][] = $loss_rate;
                }
            }

            $endpoint = $goal ? '/goal-seeking/weighted-average' : '/weighted-average';

            $result = ApiClient::get($endpoint, $params);

            if (isset($result['fallback']) && $result['fallback'] === true) {
                wp_send_json_error($result);
            }

            wp_send_json_success($result);
        } catch (\Exception $e) {
            wp_send_json_error(['error' => $e->getMessage()]);
        }
    }
}
