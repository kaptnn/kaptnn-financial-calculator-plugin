jQuery(document).ready(function ($) {
  function formatToIDR(number) {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(number);
  }

  $("#present-value-calculator-form").on("submit", function (e) {
    e.preventDefault();

    const data = {
      action: "handle_present_value_calculator",
      future_value: $("#future_value").val(),
      rate: $("#rate").val(),
      period: $("#period").val(),
    };

    $.ajax({
      url: presentValueCalcVars.ajax_url,
      type: "POST",
      data: data,
      success: function (response) {
        if (response.success) {
          $("#present-value-calculator-result").html(
            `<strong>Present Value</strong><br>Rp ${formatToIDR(
              response.data.present_value
            )}`
          );
        } else if (response.data.fallback) {
          $.ajax({
            url: response.data.url,
            type: "GET",
            success: function (apiResponse) {
              if (apiResponse.success) {
                $("#present-value-calculator-result").html(
                  `<strong>Present Value</strong><br>Rp ${formatToIDR(
                    apiResponse.present_value
                  )}`
                );
              }
            },
            error: function () {
              $("#present-value-calculator-result").html(
                "Fallback API request failed."
              );
            },
          });
        } else {
          $("#present-value-calculator-result").html(
            `Error: ${response.data.error}`
          );
        }
      },
      error: function () {
        $("#present-value-calculator-result").html(
          "Error processing the request."
        );
      },
    });
  });
});
