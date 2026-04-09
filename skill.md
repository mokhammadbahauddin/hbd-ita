Recommended Tech Stack & Required Skills

Meskipun saat ini proyek dibangun menggunakan Vanilla HTML/CSS/JS (yang sudah sangat bagus untuk prototipe yang ringan), jika kamu ingin meningkatkannya menjadi proyek profesional yang skalabel, aman, dan mudah dikelola, berikut adalah teknologi terbaik yang bisa kamu gunakan:

1. Frontend Development (UI & Logic)

Rekomendasi: Next.js (React) + TypeScript

Mengapa? Next.js memudahkan pembagian UI menjadi komponen (misal: <SplashScreen />, <CanvasEngine />, <ChatBox />). TypeScript sangat membantu untuk mencegah bug pada objek game dan respons API.

Skills Required: React Hooks (useEffect, useRef untuk Canvas), State Management, TypeScript interfaces.

2. Styling & UI Animations

Rekomendasi: Tailwind CSS + Framer Motion

Mengapa? Tailwind mempercepat pembuatan UI (seperti form chat dan tombol) tanpa file CSS yang berantakan. Framer Motion memberikan animasi UI (seperti fade in/out lirik dan galeri polaroid) yang jauh lebih mulus daripada transisi CSS standar.

Skills Required: Utility-first CSS, React Animation principles.

3. Game / Visual Engine

Rekomendasi: PixiJS atau Phaser.js (Opsional, Canvas API murni sudah cukup jika performa dijaga)

Mengapa? Menulis logika parallax, state machine kucing, dan particle emitter dari awal sangat melelahkan. PixiJS (berbasis WebGL) dapat menangani ribuan partikel kelopak sakura dengan jauh lebih ringan dibandingkan HTML5 Canvas bawaan.

Skills Required: Game Loop architecture, WebGL rendering concepts, Sprite management (jika ingin memakai gambar asli, bukan prosedural).

4. Audio Management

Rekomendasi: Howler.js

Mengapa? Tag <audio> bawaan HTML sering bermasalah di beberapa browser mobile (seperti Safari iOS). Howler.js mengelola audio sprite, fading, dan kompatibilitas cross-browser dengan sempurna.

Skills Required: Web Audio API, event-driven audio syncing.

6. Hosting & Deployment

Rekomendasi: Vercel

Mengapa? Vercel dibuat oleh pencipta Next.js. Sangat cepat, gratis untuk proyek personal, mendukung Serverless Functions, dan kamu bisa menghubungkan custom domain (seperti untukkamu.com).

Skills Required: Git/GitHub version control, CI/CD basic concepts.

Ringkasan Pembelajaran untuk Pengembang (Developer Path):

Jika kamu ingin mendalami proyek seperti ini, fokuslah menguasai:

Advanced JavaScript (ES6+): Promises, Async/Await.

Matematika Kreatif (Creative Coding): Trigonometri dasar (Math.sin, Math.cos) untuk animasi prosedural yang sudah ada di kodemu.

API Security: Cara menyembunyikan kredensial di sisi server.

## Status Update

o- Setup awal sudah selesai. Telah berevolusi menggunakan animasi otomatis. Next focus is refining UI and Canvas optimizations.

### 4. Responsive Web Design (CSS Variables, Flexbox, Clamp)
**Apa itu?** Teknik membuat website tampil bagus di HP maupun Laptop.
**Penggunaan di Kode:**
- `font-size: clamp(...)` digunakan untuk membuat ukuran teks yang menyesuaikan ukuran layar dengan mulus, tidak terlalu besar atau kecil.
- `--primary-color: #ff4d6d;` variabel CSS di `:root` membuat tema warna sangat mudah diubah tanpa menelusuri satu-persatu di file.
- `display: flex;` dipakai hampir di seluruh UI (Layar Awal, Lirik, dll).

## 🎯 Skills yang Sedang Kamu Kembangkan
1. **React.js:** Membuat komponen UI yang dapat digunakan kembali.
2. **HTML5 Canvas API:** Menggambar grafis game (lingkaran, kurva, dan gradasi warna).
3. **Advanced JavaScript (ES6+):** Promises, Async/Await (untuk pemrosesan data).
4. **Math in Programming:** Menggunakan Sin/Cos untuk animasi alami (naik-turun, ayunan).
5. **UI/UX Design:** CSS Modern (Glassmorphism, animasi keyframes).
