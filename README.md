# Jurnal Mengajar & Presensi Siswa

Aplikasi Next.js untuk mencatat kehadiran siswa dan jurnal mengajar, dengan database Supabase. Tidak menggunakan API AI atau layanan berbayar lainnya.

## Langkah berikutnya

### 1. Buat proyek Supabase

1. Buka [Supabase Dashboard](https://supabase.com/dashboard), masuk atau buat akun.
2. Pilih **New project**, tentukan organisasi, nama proyek, kata sandi database yang kuat, dan region terdekat.
3. Tunggu status proyek menjadi aktif.

### 2. Jalankan skema database

1. Pada dashboard proyek Supabase, buka **SQL Editor** > **New query**.
2. Buka file [`supabase/schema.sql`](supabase/schema.sql) dari proyek ini, salin seluruh isinya ke editor SQL.
3. Klik **Run**. Skrip akan membuat tabel `kelas`, `siswa`, `presensi`, `jurnal_mengajar`, relasi, indeks, dan aturan RLS.

### 3. Konfigurasikan environment lokal

1. Pada Supabase, buka **Project Settings** > **API**.
2. Salin **Project URL** dan **anon public key**.
3. Buat file `.env.local` dari template:

   ```bash
   cp .env.example .env.local
   ```

4. Isi file `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://nama-proyek.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-public-key-anda
   ```

Jangan commit `.env.local`; file tersebut telah terdaftar di `.gitignore`.

### 4. Aktifkan Email Auth dan buat akun guru

1. Buka **Authentication** > **Providers** > **Email** di Supabase, lalu aktifkan penyedia Email.
2. Untuk penggunaan internal, Anda dapat menonaktifkan **Confirm email** selama tahap pengujian.
3. Buka **Authentication** > **Users** > **Add user** > **Create new user**.
4. Masukkan email dan kata sandi guru, lalu pilih **Create user**.
5. Guru masuk melalui halaman `/login` pada aplikasi.

### 5. Jalankan aplikasi secara lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000), lalu masuk dengan akun guru yang dibuat sebelumnya.

### 6. Deploy ke GitHub dan Vercel

1. Buat repository baru di GitHub, lalu push kode proyek:

   ```bash
   git add .
   git commit -m "feat: jurnal mengajar dan presensi siswa"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPOSITORY.git
   git push -u origin main
   ```

2. Buka [Vercel](https://vercel.com/new), pilih **Import Git Repository**, lalu pilih repository tersebut.
3. Pada **Environment Variables**, tambahkan untuk environment Production, Preview, dan Development:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://nama-proyek.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=anon-public-key-anda
   ```

4. Klik **Deploy**. Setelah selesai, buka URL deployment Vercel dan masuk dengan akun guru.

> Skrip RLS mengizinkan pengguna yang sudah login dan aplikasi menyediakan halaman login email/kata sandi. Kebijakan ini cocok untuk satu organisasi; untuk produksi multi-sekolah, tambahkan `sekolah_id`/`guru_id` dan batasi setiap policy dengan `auth.uid()`.

## Struktur

```
app/                 # halaman App Router: dashboard, kelas, presensi, laporan
components/          # navigasi dan komponen UI/fitur
lib/supabase.ts      # browser client Supabase berbasis environment variables
lib/types.ts         # tipe data aplikasi
supabase/schema.sql  # DDL tabel, indeks, RLS, dan relasi
```

## Catatan export

Halaman laporan mendukung cetak melalui browser (bisa disimpan sebagai PDF) dan export CSV yang dapat dibuka di Excel.
