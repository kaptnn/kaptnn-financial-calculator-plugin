<form id="weighted-average-calculator-form" style="display: flex; flex-direction: column; gap: 4px;">
    <label for="calculation_type">Select Calculation Type:</label>
    <select id="calculation_type" name="calculation_type" onchange="updateFormType()">
        <option value="weighted_average">Weighted Average Calculator</option>
        <option value="goal_seeking">Goal Seeking Weighted Average</option>
    </select>

    <label for="n_total">Enter the number of rows:</label>
    <input type="number" id="n_total" name="n_total" value="0" required>

    <div id="input_containers" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        <div id="loss_rate_inputs" style="display: flex; flex-direction: column; gap: 4px;"></div>
        <div id="weight_inputs" style="display: flex; flex-direction: column; gap: 4px;"></div>
    </div>

    <div id="goal_input" style="display: none; margin-top: 12px;">
        <label for="goal">Enter Target Weighted Average Goal:</label>
        <input type="number" id="goal" name="goal" placeholder="Target Weighted Average Goal">
    </div>

    <button type="button" id="non-goal-seeking-btn">Calculate Weighted Average</button>
    <button type="button" id="goal-seeking-btn" style="display: none;">Calculate Goal Seeking</button>
</form>

<div id="calculator-result" style="margin-top: 20px;">
    <h3>Results</h3>
    <p id="normal_average"></p>
    <p id="weighted_average"></p>
    <p id="weight_difference"></p>

    <h3>Goal Seeking Results</h3>
    <p id="initial_loss_rate"></p>
    <p id="loss_rate_array"></p>
    <p id="normal_average_goal"></p>
    <p id="weighted_average_goal"></p>
</div>

<script>
    document.getElementById("n_total").addEventListener("input", renderInputs);

    function renderInputs() {
        const nTotal = parseInt(document.getElementById("n_total").value);
        const lossRateContainer = document.getElementById("loss_rate_inputs");
        const weightContainer = document.getElementById("weight_inputs");
        const calculationType = document.getElementById("calculation_type").value;

        lossRateContainer.innerHTML = "";
        weightContainer.innerHTML = "";

        for (let i = 0; i < nTotal; i++) {
            if (calculationType === "weighted_average") {
                const lossRateInput = document.createElement("input");
                lossRateInput.type = "number";
                lossRateInput.placeholder = `Loss Rate ${i + 1}`;
                lossRateContainer.appendChild(lossRateInput);
            }

            const weightInput = document.createElement("input");
            weightInput.type = "number";
            weightInput.placeholder = `Weight ${i + 1}`;
            weightContainer.appendChild(weightInput);
        }
    }

    function updateFormType() {
        const calculationType = document.getElementById("calculation_type").value;
        document.getElementById("goal_input").style.display =
            calculationType === "goal_seeking" ? "block" : "none";
        document.getElementById("goal-seeking-btn").style.display =
            calculationType === "goal_seeking" ? "block" : "none";
        document.getElementById("non-goal-seeking-btn").style.display =
            calculationType === "weighted_average" ? "block" : "none";
        renderInputs();
    }

    updateFormType();
</script>