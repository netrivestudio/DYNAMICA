let data = JSON.parse(localStorage.getItem("dynamicaData")) || [];

function updateUI() {
  const tbody = document.getElementById("riwayat");
  tbody.innerHTML = "";
  let totalMasuk = 0;
  let totalKeluar = 0;

  data.forEach(item => {
    const row = `<tr>
      <td>${item.tanggal}</td>
      <td>${item.jenis}</td>
      <td>${item.sumber}</td>
      <td>Rp ${parseInt(item.jumlah).toLocaleString("id-ID")}</td>
    </tr>`;
    tbody.innerHTML += row;

    if (item.jenis === "pemasukan") {
      totalMasuk += parseInt(item.jumlah);
    } else {
      totalKeluar += parseInt(item.jumlah);
    }
  });

  document.getElementById("totalMasuk").innerText = totalMasuk.toLocaleString("id-ID");
  document.getElementById("totalKeluar").innerText = totalKeluar.toLocaleString("id-ID");
  document.getElementById("saldo").innerText = (totalMasuk - totalKeluar).toLocaleString("id-ID");
}

function tambahData() {
  const tanggal = document.getElementById("tanggal").value;
  const jenis = document.getElementById("jenis").value;
  const sumber = document.getElementById("sumber").value;
  const jumlah = document.getElementById("jumlah").value;

  if (!tanggal || !sumber || !jumlah) {
    alert("Isi semua kolom!");
    return;
  }

  data.push({ tanggal, jenis, sumber, jumlah });
  localStorage.setItem("dynamicaData", JSON.stringify(data));
  updateUI();

  document.getElementById("sumber").value = "";
  document.getElementById("jumlah").value = "";
}

function resetData() {
  if (confirm("Yakin ingin mereset semua data?")) {
    localStorage.removeItem("dynamicaData");
    data = [];
    updateUI();
  }
}

function exportPDF() {
  const jsPDFLib = window.jspdf;
  if (!jsPDFLib || !jsPDFLib.jsPDF) {
    alert("jsPDF belum siap. Pastikan koneksi internet aktif.");
    return;
  }

  const { jsPDF } = jsPDFLib;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Laporan Pemasukan & Pengeluaran", 10, 10);

  let y = 20;
  doc.setFontSize(12);
  data.forEach(item => {
    doc.text(
      `${item.tanggal} - ${item.jenis} - ${item.sumber} - Rp ${parseInt(item.jumlah).toLocaleString("id-ID")}`,
      10,
      y
    );
    y += 10;
  });

  y += 5;
  doc.line(10, y, 200, y);
  y += 10;

  let totalMasuk = 0;
  let totalKeluar = 0;
  data.forEach(item => {
    if (item.jenis === "pemasukan") totalMasuk += parseInt(item.jumlah);
    else totalKeluar += parseInt(item.jumlah);
  });
  let saldo = totalMasuk - totalKeluar;

  doc.text(`Total Pemasukan: Rp ${totalMasuk.toLocaleString("id-ID")}`, 10, y); y += 10;
  doc.text(`Total Pengeluaran: Rp ${totalKeluar.toLocaleString("id-ID")}`, 10, y); y += 10;
  doc.text(`Saldo Akhir: Rp ${saldo.toLocaleString("id-ID")}`, 10, y);

  doc.save("laporan_dynamica.pdf");
}

updateUI();
