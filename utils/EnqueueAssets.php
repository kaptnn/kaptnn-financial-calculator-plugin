<?php

namespace Utils;

class EnqueueAssets
{
    public static function init()
    {
        add_action('wp_enqueue_scripts', [__CLASS__, 'loadAssets']);
    }

    public static function loadAssets()
    {
        wp_enqueue_script(
            'depreciation-calculator-js',
            plugin_dir_url(__FILE__) . '../assets/js/depreciation_calc.js',
            ['jquery'],
            '1.0',
            true
        );

        wp_localize_script('depreciation-calculator-js', 'depreciationCalcVars', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('depreciation_calc_nonce'),
        ]);

        wp_enqueue_script(
            'present-value-calculator-js',
            plugin_dir_url(__FILE__) . '../assets/js/present_value_calc.js',
            ['jquery'],
            '1.0',
            true
        );

        wp_localize_script('present-value-calculator-js', 'presentValueCalcVars', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('present_value_calc_nonce'),
        ]);
    }
}
