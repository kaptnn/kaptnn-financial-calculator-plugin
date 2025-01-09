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