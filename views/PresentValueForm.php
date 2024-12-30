<form id="present-value-calculator-form" style="display: flex; flex-direction: column; gap: 4px; ">
    <label for="future_value">Future Value:</label>
    <input type="number" id="future_value" name="future_value" required>

    <label for="rate">Rate (%):</label>
    <input type="number" id="rate" name="rate" required>

    <label for="period">Period (years):</label>
    <input type="number" id="period" name="period" required>

    <button type="submit">Calculate</button>
</form>
<div id="present-value-calculator-result"></div>