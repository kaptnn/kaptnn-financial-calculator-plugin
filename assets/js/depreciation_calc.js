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

const hargaPerolehanInput = document.getElementById("harga_perolehan");
formatInputWithRupiah(hargaPerolehanInput);

const estimasiNilaiSisaInput = document.getElementById("estimasi_nilai_sisa");
formatInputWithRupiah(estimasiNilaiSisaInput);

const estimasiUmurInput = document.getElementById("estimasi_umur");
formatInputWithTahun(estimasiUmurInput);

jQuery(document).ready(function ($) {
  function formatToIDR(number) {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(number);
  }

  $("#depreciation-calculator-form").on("submit", function (e) {
    e.preventDefault();

    const rawHargaPerolehan = parseRupiah($("#harga_perolehan").val());
    const rawEstimasiNilaiSisa = parseRupiah($("#estimasi_nilai_sisa").val());

    const data = {
      action: "handle_depreciation_calculator",
      harga_perolehan: rawHargaPerolehan,
      estimasi_umur: $("#estimasi_umur").val(),
      estimasi_nilai_sisa: rawEstimasiNilaiSisa,
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
