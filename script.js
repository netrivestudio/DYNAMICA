function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Laporan Pemasukan & Pengeluaran", 10, 10);

  let y = 20;
  let totalMasuk = 0;
  let totalKeluar = 0;

  data.forEach(item => {
    const jumlah = parseInt(item.jumlah);
    doc.text(`${item.tanggal} - ${item.jenis} - ${item.sumber} - Rp ${jumlah.toLocaleString("id-ID")}`, 10, y);
    y += 10;
    if (item.jenis === "pemasukan") totalMasuk += jumlah;
    else totalKeluar += jumlah;
  });

  const saldo = totalMasuk - totalKeluar;

  // Tambahkan ringkasan total di akhir PDF
  y += 10;
  doc.text(`Total Pemasukan: Rp ${totalMasuk.toLocaleString("id-ID")}`, 10, y);
  y += 10;
  doc.text(`Total Pengeluaran: Rp ${totalKeluar.toLocaleString("id-ID")}`, 10, y);
  y += 10;
  doc.text(`Saldo Akhir: Rp ${saldo.toLocaleString("id-ID")}`, 10, y);

  doc.save("laporan_dynamica.pdf");
}
