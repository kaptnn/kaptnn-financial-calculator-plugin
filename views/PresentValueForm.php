<section class="calculator-section">
    <form id="present-value-calculator-form" class="depreciation-form" aria-labelledby="form-title">
        <div class="form-group">
            <label for="future_value" class="form-label">Nilai Masa Depan:</label>
            <input
                type="number"
                id="future_value"
                name="future_value"
                required
                class="form-input"
                placeholder="Masukkan nilai perkiraan yang dicapai di masa depan"
                aria-describedby="future-value-help"
                autocomplete="of">
        </div>

        <div class="form-group">
            <label for="rate" class="form-label">Rate (%):</label>
            <input
                type="number"
                id="rate"
                name="rate"
                required
                class="form-input"
                placeholder="Masukkan ratio atau persentase"
                aria-describedby="rate-help"
                autocomplete="off">
        </div>

        <div class="form-group">
            <label for="period" class="form-label">Period (years):</label>
            <input
                type="number"
                id="period"
                name="period"
                required
                class="form-input"
                placeholder="Masukkan jangka waktu periode dalam tahun"
                aria-describedby="period-help"
                autocomplete="off">
        </div>

        <button type="submit" class="form-button">Hitung</button>
    </form>
    <section id="present-value-calculator-result" class="present-value-result" aria-live="polite">
        <!-- Hasil kalkulasi akan ditampilkan di sini -->
    </section>
</section>

<script>
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
        input.addEventListener("input", function() {
            const rawValue = parseRupiah(this.value);
            this.value = rawValue ? `Rp ${formatRupiah(rawValue)}` : "";
        });

        input.addEventListener("focus", function() {
            this.value = parseRupiah(this.value);
        });

        input.addEventListener("blur", function() {
            const rawValue = parseRupiah(this.value);
            this.value = rawValue ? `Rp ${formatRupiah(rawValue)}` : "";
        });
    }

    function formatInputWithTahun(input) {
        input.addEventListener("input", function() {
            const rawValue = this.value.replace(/[^0-9]/g, "");
            this.value = rawValue ? `${rawValue} tahun` : "";
        });

        input.addEventListener("focus", function() {
            this.value = this.value.replace(/\D/g, "");
        });

        input.addEventListener("blur", function() {
            const rawValue = this.value.replace(/[^0-9]/g, "");
            this.value = rawValue ? `${rawValue} tahun` : "";
        });
    }

    function formatInputWithPersen(input) {
        input.addEventListener("input", function() {
            const rawValue = this.value.replace(/[^0-9]/g, "");
            this.value = rawValue ? `${rawValue}%` : "";
        });

        input.addEventListener("focus", function() {
            this.value = this.value.replace(/\D/g, "");
        });

        input.addEventListener("blur", function() {
            const rawValue = this.value.replace(/[^0-9]/g, "");
            this.value = rawValue ? `${rawValue}%` : "";
        });
    }

    const futureValueInput = document.getElementById("future_value");
    formatInputWithRupiah(futureValueInput);

    const rateInput = document.getElementById("rate")
    formatInputWithPersen(rateInput)

    const periodInput = document.getElementById("period");
    formatInputWithTahun(periodInput);
</script>