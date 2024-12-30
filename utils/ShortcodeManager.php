<?php

namespace Utils;

class ShortcodeManager
{
    public static function init()
    {
        add_shortcode('depreciation_calculator', [__CLASS__, 'renderDepreciationCalculator']);
        add_shortcode('present_value_calculator', [__CLASS__, 'renderPresentValueCalculator']);
        add_shortcode('weighted_average_goal_seeking_calculator', [__CLASS__, 'renderWeightedAverageCalculator']);
    }

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
}
