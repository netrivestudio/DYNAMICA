function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const data = JSON.parse(localStorage.getItem("data")) || [];
  if (data.length === 0) {
    alert("Tidak ada data untuk diekspor.");
    return;
  }

  // Judul laporan
  doc.setFontSize(16);
  doc.text("Laporan Pemasukan & Pengeluaran", 10, 10);

  // Data transaksi
  let y = 20;
  doc.setFontSize(12);
  data.forEach(item => {
    doc.text(
      `${item.tanggal} - ${item.jenis} - ${item.sumber} - Rp ${Number(item.jumlah).toLocaleString("id-ID")}`,
      10,
      y
    );
    y += 10;
  });

  // Garis pemisah
  y += 5;
  doc.line(10, y, 200, y); 
  y += 10;

  // Hitung total
  let totalMasuk = 0;
  let totalKeluar = 0;
  data.forEach(item => {
    const jumlah = Number(item.jumlah);
    if (item.jenis === "pemasukan") totalMasuk += jumlah;
    else totalKeluar += jumlah;
  });
  let saldo = totalMasuk - totalKeluar;

  // Tampilkan total dan saldo
  doc.text(`Total Pemasukan: Rp ${totalMasuk.toLocaleString("id-ID")}`, 10, y); y += 10;
  doc.text(`Total Pengeluaran: Rp ${totalKeluar.toLocaleString("id-ID")}`, 10, y); y += 10;
  doc.text(`Saldo Akhir: Rp ${saldo.toLocaleString("id-ID")}`, 10, y);

  // Simpan PDF
  doc.save("laporan_dynamica.pdf");
}
