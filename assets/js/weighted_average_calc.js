jQuery(document).ready(function ($) {
  function handleCalculation(calculationType) {
    const nTotal = parseInt($("#n_total").val());
    const weightArray = [];
    const lossRateArray = [];
    const goal = $("#goal").val();

    $("#weight_inputs input").each(function () {
      weightArray.push(parseFloat($(this).val()));
    });

    if (calculationType === "weighted_average") {
      $("#loss_rate_inputs input").each(function () {
        lossRateArray.push(parseFloat($(this).val()));
      });
    }

    let url = `http://api.sempoa.my.id/api/v1/${
      calculationType === "weighted_average"
        ? "calculator/weighted-average"
        : "goal-seeking/weighted-average"
    }?n_total=${nTotal}`;

    weightArray.forEach((weight) => {
      url += `&weight_array=${weight}`;
    });

    if (calculationType === "goal_seeking") {
      url += `&goal=${goal}`;
    }

    if (calculationType === "weighted_average") {
      lossRateArray.forEach((lossRate) => {
        url += `&loss_rate_array=${lossRate}`;
      });
    }

    $.ajax({
      url: url,
      type: "GET",
      success: function (response) {
        if (response) {
          if (calculationType === "weighted_average") {
            $("#normal_average").text(
              `Normal Average: ${response.normal_average}%`
            );
            $("#weighted_average").text(
              `Weighted Average: ${response.weighted_average}%`
            );
            $("#weight_difference").html(
              `Loss Rate Array: <br>${response.weight_difference
                .map(
                  (val, idx) => `Weight Difference ke-${idx + 1}: ${val * 100}%`
                )
                .join("<br>")}`
            );
          } else if (calculationType === "goal_seeking") {
            $("#initial_loss_rate").text(
              `Initial Loss Rate: ${response.initial_loss_rate}%`
            );
            $("#loss_rate_array").html(
              `Loss Rate Array: <br>${response.loss_rate_array
                .map((val, idx) => `Loss Rate ke-${idx + 1}: ${val}%`)
                .join("<br>")}`
            );
            $("#normal_average_goal").text(
              `Normal Average: ${response.normal_average}%`
            );
            $("#weighted_average_goal").text(
              `Weighted Average: ${response.weighted_average}%`
            );
          }
        } else {
          $("#calculator-result").html("Error: No response received from API.");
        }
      },
      error: function () {
        $("#calculator-result").html("Error processing the request.");
      },
    });
  }

  $("#non-goal-seeking-btn").on("click", function () {
    handleCalculation("weighted_average");
  });

  $("#goal-seeking-btn").on("click", function () {
    handleCalculation("goal_seeking");
  });
});
