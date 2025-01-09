<section class="calculator-section">
    <form id="depreciation-calculator-form" class="depreciation-form" aria-labelledby="form-title">
        <div class="form-group">
            <label for="harga_perolehan" class="form-label">Harga Perolehan:</label>
            <input
                type="text"
                id="harga_perolehan"
                name="harga_perolehan"
                required
                class="form-input"
                placeholder="Masukkan harga perolehan asset (dalam rupiah)"
                aria-describedby="harga-perolehan-help"
                autocomplete="off">
        </div>

        <div class="form-group">
            <label for="estimasi_umur" class="form-label">Estimasi Umur:</label>
            <input
                type="text"
                id="estimasi_umur"
                name="estimasi_umur"
                required
                class="form-input"
                placeholder="Masukkan estimasi umur asset (dalam tahun)"
                aria-describedby="estimasi-umur-help"
                autocomplete="off">
        </div>

        <div class="form-group">
            <label for="estimasi_nilai_sisa" class="form-label">Estimasi Nilai Sisa:</label>
            <input
                type="text"
                id="estimasi_nilai_sisa"
                name="estimasi_nilai_sisa"
                required
                class="form-input"
                placeholder="Masukkan estimasi nilai sisa asset (dalam rupiah)"
                aria-describedby="estimasi-nilai-sisa-help"
                autocomplete="off">
        </div>

        <div class="form-group">
            <label for="metode" class="form-label">Metode:</label>
            <select
                id="metode"
                name="metode"
                required
                class="form-select"
                aria-describedby="metode-help">
                <option value="">Pilih Metode Perhitungan</option>
                <option value="straight_line">Straight Line</option>
                <option value="double_declining">Double Declining</option>
            </select>
        </div>

        <button type="submit" class="form-button">Hitung</button>
    </form>

    <section id="depreciation-calculator-result" class="depreciation-result" aria-live="polite">
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

    const hargaPerolehanInput = document.getElementById("harga_perolehan");
    formatInputWithRupiah(hargaPerolehanInput);

    const estimasiNilaiSisaInput = document.getElementById("estimasi_nilai_sisa");
    formatInputWithRupiah(estimasiNilaiSisaInput);

    const estimasiUmurInput = document.getElementById("estimasi_umur");
    formatInputWithTahun(estimasiUmurInput);
</script>