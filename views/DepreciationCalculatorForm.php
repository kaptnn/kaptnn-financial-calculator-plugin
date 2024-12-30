<form id="depreciation-calculator-form" style="display: flex; flex-direction: column; gap: 4px; ">
    <label for="harga_perolehan">Harga Perolehan:</label>
    <input type="number" id="harga_perolehan" name="harga_perolehan" required>

    <label for="estimasi_umur">Estimasi Umur:</label>
    <input type="number" id="estimasi_umur" name="estimasi_umur" required>

    <label for="estimasi_nilai_sisa">Estimasi Nilai Sisa:</label>
    <input type="number" id="estimasi_nilai_sisa" name="estimasi_nilai_sisa" required>

    <label for="metode">Metode:</label>
    <select id="metode" name="metode" required>
        <option value="straight_line">Straight Line</option>
        <option value="double_declining">Double Declining</option>
    </select>

    <button type="submit">Calculate</button>
</form>
<div id="depreciation-calculator-result"></div>