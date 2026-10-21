# ATURAN ISOLASI FOTO (PHOTO ASSET ISOLATION RULES)

Dokumen ini adalah aturan tetap (*strict rules*) untuk pengelolaan dan pembaruan foto di website **The Wina Hospitality Bali**.

---

## 1. Prinsip Isolasi Penuh (Zero Cross-Linking)
- Setiap properti memiliki slot foto yang **100% independen dan terpisah secara fisik**:
  1. **The Wina Echo Beach Guest House**:
     - `photo-1` (Hero / Kamar Utama)
     - `photo-2` (Pintu Ukir / Akses)
     - `photo-3` (Teras / Balkon)
     - `photo-4` (Halaman / Area Luar)
  2. **The Wina Guest House 2**:
     - `photo-1` (Hero / Kamar Utama)
     - `photo-2` (Teras / Balkon Luar)
     - `photo-3` (Taman Tropis)
     - `photo-4` (Area Properti)
  3. **The Wina Guest House 3**:
     - `photo-1` (Hero / Kamar & Kolam)
     - `photo-2` (Kolam Renang / Outdoor)
     - `photo-3` (Suasana Kolam)
     - `photo-4` (Taman & Relaksasi)
  4. **The Wina Villa 01**:
     - `photo-1` (Hero / Kolam Privat)
     - `photo-2` (Pavilion / Living Area)
     - `photo-3` (Kolam & Sun Deck)
     - `photo-4` (Taman Tropis)
  5. **The Wina Villa 02**:
     - `photo-1` (Hero / Kolam Villa)
     - `photo-2` (Suasana Villa)
     - `photo-3` (Kolam Renang)
     - `photo-4` (Lounge & Area Santai)

---

## 2. Peraturan Saat Pengguna Mengupload / Mengganti Foto
1. **Hanya Update Bagian yang Dipilih**:
   - Jika pengguna memilih foto pada **The Wina Guest House 3** (misal tombol thumbnail ke-1, ke-2, ke-3, atau ke-4):
     - **HANYA** perbarui file/variabel milik The Wina Guest House 3 (`gh3Photo1`, `gh3Photo2`, `gh3Photo3`, atau `gh3Photo4`).
     - **DILARANG KERAS** menyentuh atau mengubah foto milik The Wina Echo Beach, The Wina Guest House 2, The Wina Villa 01, The Wina Villa 02, atau Banner Hero utama di homepage.
2. **Tidak Boleh Berbagi File Antar Properti**:
   - Dilarang mengarahkan slot foto properti A ke file yang digunakan properti B.
   - Setiap slot harus memiliki file tersendiri di dalam direktori `src/assets/images/properties/<id-properti>/`.
3. **Hero Image dan Thumbnail 1 Terhubung Otomatis**:
   - Untuk setiap properti, `heroImage` selalu sama dengan slot `photo-1`. Jika pengguna mengganti foto utama kartu/modal properti tersebut, kedua tampilan properti itu akan selalu sinkron tanpa mempengaruhi properti lainnya.
