=== KAPTNN Financial Calculator ===
Contributors: elsamrafisptr
Donate link: https://example.com/donate
Tags: calculator, finance, api integration, python, company, accountancy
Requires at least: 5.5
Tested up to: 6.3
Stable tag: 1.0.2
Requires PHP: 7.4
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A modular plugin for multiple financial calculators integrated with FastAPI Python.

== Description ==
KAPTNN Financial Calculator is a versatile WordPress plugin that provides financial calculation features such as depreciation calculations. It integrates seamlessly with a FastAPI backend for real-time processing. This plugin is designed for businesses and developers who need reliable, secure, and flexible financial tools.

**Current Features:**
- Depreciation calculator with multiple methods (Straight Line, Double Declining).
- FastAPI integration for accurate and efficient calculations.
- Server-side proxy for secure API communication.

== Installation ==
1. Download the plugin ZIP file.
2. Go to your WordPress Admin Dashboard.
3. Navigate to Plugins -> Add New -> Upload Plugin.
4. Select the downloaded ZIP file and click Install Now.
5. Activate the plugin after installation.
6. Use the shortcode `[depreciation_calculator]` to embed the calculator on any page or post.

== Changelog ==

= 1.0.3 =
* Add Present Value Calculator

= 1.0.2 =
* Switched to server-side proxy for secure API communication.
* Improved error handling for API requests.

= 1.0.1 =
* Added direct API integration with the FastAPI backend.
* Enhanced client-side validation for form inputs.

= 1.0.0 =
* Initial release of the plugin.
* Introduced the Depreciation Calculator with straight-line and double-declining methods.

== Frequently Asked Questions ==

= How do I use this plugin? =
Install and activate the plugin, then use the shortcode `[depreciation_calculator]` to display the calculator.

= Why is the API call failing? =
Ensure that the FastAPI backend is reachable and the server-side proxy is configured correctly. Check the WordPress debug logs for errors.

= Can I extend this plugin for other financial calculators? =
Yes, the plugin is modular, allowing you to add more calculators and integrate them with the FastAPI backend.

== License ==
This plugin is licensed under the GPLv2 or later. You can use, modify, and distribute it under the same license terms.
