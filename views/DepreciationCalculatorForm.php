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