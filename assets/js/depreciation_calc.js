jQuery(document).ready(function ($) {
  function formatToIDR(number) {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(number);
  }

  $("#depreciation-calculator-form").on("submit", function (e) {
    e.preventDefault();

    const data = {
      action: "handle_depreciation_calculator",
      harga_perolehan: $("#harga_perolehan").val(),
      estimasi_umur: $("#estimasi_umur").val(),
      estimasi_nilai_sisa: $("#estimasi_nilai_sisa").val(),
      metode: $("#metode").val(),
    };

    $.ajax({
      url: depreciationCalcVars.ajax_url,
      type: "POST",
      data: data,
      success: function (response) {
        if (response.success) {
          if (response.data.metode === "double_declining") {
            let monthlyCostsHTML = "";
            let yearlyCostsHTML = "";

            response.data.biaya_per_bulan.forEach((val, idx) => {
              monthlyCostsHTML += `Tahun ke-${idx + 1}: Rp ${formatToIDR(
                val
              )}<br>`;
            });

            response.data.biaya_per_tahun.forEach((val, idx) => {
              yearlyCostsHTML += `Tahun ke-${idx + 1}: Rp ${formatToIDR(
                val
              )}<br>`;
            });

            $("#depreciation-calculator-result").html(
              `<strong>Biaya Penyusutan/Bulan</strong><br>${monthlyCostsHTML}<br>
                <strong>Biaya Penyusutan/Tahun</strong><br>${yearlyCostsHTML}`
            );
          } else {
            $("#depreciation-calculator-result").html(
              `<strong>Biaya Penyusutan/Bulan:</strong> Rp ${formatToIDR(
                response.data.biaya_per_bulan
              )}<br>
                <strong>Biaya Penyusutan/Tahun:</strong> Rp ${formatToIDR(
                  response.data.biaya_per_tahun
                )}`
            );
          }
        } else if (response.data.fallback) {
          $.ajax({
            url: response.data.url,
            type: "GET",
            success: function (apiResponse) {
              if (response.metode === "double_declining") {
                let monthlyCostsHTML = "";
                let yearlyCostsHTML = "";

                response.biaya_per_bulan.forEach((val, idx) => {
                  monthlyCostsHTML += `Tahun ke-${idx + 1}: Rp ${formatToIDR(
                    val
                  )}<br>`;
                });

                response.biaya_per_tahun.forEach((val, idx) => {
                  yearlyCostsHTML += `Tahun ke-${idx + 1}: Rp ${formatToIDR(
                    val
                  )}<br>`;
                });

                $("#depreciation-calculator-result").html(
                  `<strong>Biaya Penyusutan/Bulan</strong><br>${monthlyCostsHTML}<br>
                <strong>Biaya Penyusutan/Tahun</strong><br>${yearlyCostsHTML}`
                );
              } else {
                $("#depreciation-calculator-result").html(
                  `<strong>Biaya Penyusutan/Bulan:</strong> Rp ${formatToIDR(
                    response.biaya_per_bulan
                  )}<br>
                <strong>Biaya Penyusutan/Tahun:</strong> Rp ${formatToIDR(
                  response.biaya_per_tahun
                )}`
                );
              }
            },
            error: function () {
              $("#depreciation-calculator-result").html(
                "Fallback API request failed."
              );
            },
          });
        } else {
          $("#depreciation-calculator-result").html(
            `Error: ${response.data.error}`
          );
        }
      },
      error: function () {
        $("#depreciation-calculator-result").html(
          "Error processing the request."
        );
      },
    });
  });
});
