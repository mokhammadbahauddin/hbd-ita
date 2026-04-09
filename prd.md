Product Requirements Document (PRD)

Project Name: Perjalanan Liris Romantis (Romantic Lyrical Journey)
Version: 1.0
Date: April 2026

1. Project Overview

"Perjalanan Liris Romantis" adalah sebuah aplikasi web interaktif yang dirancang sebagai hadiah ulang tahun romantis. Aplikasi ini menggabungkan elemen side-scrolling game sederhana, sinkronisasi lirik lagu, dan seni prosedural (Canvas API) untuk menciptakan pengalaman emosional dan sangat personal bagi penggunanya.

2. Target Audience

Pasangan (Kekasih) pengguna, khususnya mereka yang menyukai kucing, estetika romantis, dan sentuhan personal.

3. Key Objectives

Menyajikan pengalaman visual yang indah dan smooth (60fps) di berbagai perangkat.

Menggabungkan musik, lirik, dan perjalanan visual secara sinkron.

Memberikan kejutan personal di akhir perjalanan.

Memastikan UI/UX yang intuitif, khususnya untuk pengguna perangkat seluler (Mobile-First).

4. User Flow

Splash Screen: Pengguna disambut dengan judul, instruksi, dan form input nama.

The Journey (Game): Animasi berjalan otomatis setelah start diklik. Latar belakang berubah dari pagi ke malam, dan lirik lagu muncul sesuai progres.

The Meeting (Cutscene): Saat mencapai ujung, kontrol diambil alih. Karakter bertemu dengan pasangannya (Kucing Putih), bertatapan, dan memicu teks perpisahan sinematik.


End Screen (Surprise): Menampilkan ucapan selamat ulang tahun dan galeri foto "memori".

5. Core Features

5.1. Character & Environment Engine (Canvas API)

Procedural Animation: Karakter dan lingkungan digambar menggunakan matematika (Canvas API), bukan gambar statis.

Parallax Scrolling: Efek kedalaman dengan beberapa lapisan latar belakang (Gunung, Pohon, Foto) yang bergerak dengan kecepatan berbeda.

Dynamic Weather & Time: Transisi warna yang mulus dari pagi hingga malam, disertai partikel cuaca (awan, bintang, kelopak sakura, jejak kaki).

Memori dan Lirik: Lirik lagu Virgoun ("Selamat Tinggal") tersinkronisasi mulus saat pengguna melangkah lebih jauh. Foto polaroid dekoratif bergelombang dapat merender gambar romantis dari aset yang dapat dikustomisasi, mendukung penyelarasan nostalgia yang kuat.

5.3. Interaktif Progres & Irama (Hit Notes)

Background Music: Memutar lagu romantis secara looping.

Lyric Mapping: Lirik muncul di layar berdasarkan posisi karakter (koordinat X) di dunia virtual.


## Fase Pengembangan Selanjutnya (Tahap 2)

Untuk tahap selanjutnya, fokus utama adalah pada:

Peningkatan Kualitas Visual: Menghaluskan animasi, menambah detail lingkungan, dan meningkatkan efek transisi.

Penerapan arsitektur yang dirancang khusus untuk membangun performa rendering tingkat lanjut (komponen berbasis Server-Side jika diperlukan). Namun pada tahap awal, sebagian besar pengalaman berpusat di client-side.

Pengujian Lintas Perangkat: Memastikan konsistensi dan performa di berbagai perangkat dan resolusi layar.

Optimasi Audio: Menyempurnakan sinkronisasi audio dan meningkatkan kualitas suara latar belakang.

Penyempurnaan Narasi: Menambah elemen cerita dan memperdalam keterlibatan emosional pengguna.

Integrasi Umpan Balik Pengguna: Mengumpulkan dan menganalisis umpan balik untuk perbaikan berkelanjutan.
