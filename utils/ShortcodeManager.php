<?php

namespace Utils;

class ShortcodeManager
{
    public static function init()
    {
        // Every a new feature add one shortcode below, so you can show the code (html) in the wordpress
        add_shortcode('depreciation_calculator', [__CLASS__, 'renderDepreciationCalculator']);
        add_shortcode('present_value_calculator', [__CLASS__, 'renderPresentValueCalculator']);
        add_shortcode('weighted_average_goal_seeking_calculator', [__CLASS__, 'renderWeightedAverageCalculator']);
        add_shortcode('kaptnn_login', [__CLASS__, 'render_login_form']);
        add_shortcode('kaptnn_register', [__CLASS__, 'render_registration_form']);
        add_shortcode('plugin_error_message', [__CLASS__, 'my_plugin_error_message_shortcode']);
    }

    // After done added the shortcode please write the render functions below
    public static function renderDepreciationCalculator()
    {
        ob_start();
        include plugin_dir_path(__FILE__) . '../views/DepreciationCalculatorForm.php';
        return ob_get_clean();
    }

    public static function renderPresentValueCalculator()
    {
        ob_start();
        include plugin_dir_path(__FILE__) . '../views/PresentValueForm.php';
        return ob_get_clean();
    }

    public static function renderWeightedAverageCalculator()
    {
        ob_start();
        include plugin_dir_path(__FILE__) . '../views/WeightedAverageForm.php';
        return ob_get_clean();
    }

    public static function render_login_form()
    {
        ob_start();
        include plugin_dir_path(__FILE__) . '../views/LoginForm.php';
        return ob_get_clean();
    }

    public static function render_registration_form()
    {
        ob_start();
        include plugin_dir_path(__FILE__) . '../views/RegisterForm.php';
        return ob_get_clean();
    }

    // Add new render function here
    

    public static function my_plugin_error_message_shortcode($atts)
    {
        if (isset($_GET['message'])) {
            $message = sanitize_text_field($_GET['message']);

            switch ($message) {
                case 'membership_status_basic':
                    return '<div class="error-message">You need a Pro membership to access this page.</div>';
                case 'token_expired':
                    return '<div class="error-message">Your session has expired. Please log in again.</div>';
                case 'invalid_token_structure':
                    return '<div class="error-message">The token structure is invalid.</div>';
                case 'invalid_token_signature':
                    return '<div class="error-message">The token signature is invalid.</div>';
                case 'invalid_token_payload':
                    return '<div class="error-message">The token payload is invalid.</div>';
                default:
                    return '<div class="error-message">An unknown error occurred.</div>';
            }
        }

        return '<div class="error-message" style="text-align: center;">An unknown error occurred. Go back to home page or login with another account.</div>';
    }
}
