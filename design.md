# 🎨 Kakidaki AI - Design System & UI Architecture

Dokumen ini berisi panduan gaya visual dan struktur arsitektur antarmuka untuk proyek Kakidaki AI. Semua pengembangan frontend (Nuxt + Tailwind) harus mengacu pada panduan ini.

## 1. Palet Warna (Color System)
Warna harus didaftarkan di dalam `tailwind.config.js` atau digunakan langsung via utility class Tailwind.

*   **Primary / Safe (GO):** `#118c13` (Digunakan untuk tombol utama, indikator keberhasilan, dan status aman).
*   **Critical / Danger (NO-GO):** `#b81212` (Digunakan untuk peringatan mutlak, penyakit fatal, cuaca buruk, dan tombol bahaya).
*   **Background Base:** `#F9FAFB` (Warna latar belakang utama aplikasi untuk area *dashboard*).
*   **Surface:** `#FFFFFF` (Digunakan untuk latar belakang *card*, *modal*, dan *dropdown* dengan efek *shadow-sm*).

## 2. Tipografi (Typography)
*   **Font Utama:** Inter atau oswald untuk inter buat agar single storey a dan letter spacingnya kecilkan (Sans-serif).
*   **Heading:** Digunakan untuk judul halaman dan angka skor (Tebal / *Bold*).
*   **Body:** Warna teks menggunakan Slate-800 (`#1e293b`) untuk teks utama, dan Slate-500 (`#64748b`) untuk teks sekunder/keterangan.

## 3. Struktur Layout (Architecture)
*   **Pre-Login:** Halaman publik tanpa sidebar. Latar belakang dominan terang dengan padding responsif.
*   **Post-Login:** Halaman dashboard memiliki Sidebar di kiri dan Main Content di kanan.
*   **Komponen UI:** Wajib menggunakan Tailwind CSS dengan pendekatan *clean, minimalist, flat aesthetic* dan jarak (*whitespace*) yang lega.