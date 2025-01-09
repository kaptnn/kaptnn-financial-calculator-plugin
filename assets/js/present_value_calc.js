function formatRupiah(value) {
  const numberString = value.replace(/[^,\d]/g, "");
  const split = numberString.split(",");
  const remainder = split[0].length % 3;
  let rupiah = split[0].substr(0, remainder);
  const thousands = split[0].substr(remainder).match(/\d{3}/g);

  if (thousands) {
    rupiah += (remainder ? "." : "") + thousands.join(".");
  }

  return split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
}

function parseRupiah(value) {
  return value.replace(/[^0-9]/g, "");
}

function formatInputWithRupiah(input) {
  input.addEventListener("input", function () {
    const rawValue = parseRupiah(this.value);
    this.value = rawValue ? `Rp ${formatRupiah(rawValue)}` : "";
  });

  input.addEventListener("focus", function () {
    this.value = parseRupiah(this.value);
  });

  input.addEventListener("blur", function () {
    const rawValue = parseRupiah(this.value);
    this.value = rawValue ? `Rp ${formatRupiah(rawValue)}` : "";
  });
}

function formatInputWithTahun(input) {
  input.addEventListener("input", function () {
    const rawValue = this.value.replace(/[^0-9]/g, "");
    this.value = rawValue ? `${rawValue} tahun` : "";
  });

  input.addEventListener("focus", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  input.addEventListener("blur", function () {
    const rawValue = this.value.replace(/[^0-9]/g, "");
    this.value = rawValue ? `${rawValue} tahun` : "";
  });
}

const futureValueInput = document.getElementById("future_value");
formatInputWithRupiah(futureValueInput);

const periodInput = document.getElementById("period");
formatInputWithTahun(periodInput);

jQuery(document).ready(function ($) {
  function formatToIDR(number) {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(number);
  }

  $("#present-value-calculator-form").on("submit", function (e) {
    e.preventDefault();

    const rawFutureValue = parseRupiah($("#harga_perolehan").val());

    const data = {
      action: "handle_present_value_calculator",
      future_value: rawFutureValue,
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
