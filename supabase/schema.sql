-- Jalankan seluruh skrip ini melalui Supabase Dashboard > SQL Editor.
create extension if not exists "uuid-ossp";

create table public.kelas (
  id uuid primary key default uuid_generate_v4(),
  nama text not null,
  tingkat text,
  tahun_ajaran text not null default '2026/2027',
  created_at timestamptz not null default now()
);
create table public.siswa (
  id uuid primary key default uuid_generate_v4(),
  kelas_id uuid not null references public.kelas(id) on delete cascade,
  nis text,
  nama text not null,
  created_at timestamptz not null default now()
);
create table public.presensi (
  id uuid primary key default uuid_generate_v4(),
  siswa_id uuid not null references public.siswa(id) on delete cascade,
  kelas_id uuid not null references public.kelas(id) on delete cascade,
  tanggal date not null,
  status text not null check (status in ('hadir','izin','sakit','alpa')),
  keterangan text,
  created_at timestamptz not null default now(),
  unique (siswa_id, tanggal)
);
create table public.jurnal_mengajar (
  id uuid primary key default uuid_generate_v4(),
  kelas_id uuid not null references public.kelas(id) on delete cascade,
  tanggal date not null,
  mata_pelajaran text not null,
  materi text not null,
  kendala text,
  created_at timestamptz not null default now(),
  unique (kelas_id, tanggal)
);
create index presensi_kelas_tanggal_idx on public.presensi(kelas_id, tanggal);
create index jurnal_kelas_tanggal_idx on public.jurnal_mengajar(kelas_id, tanggal);

-- Kebijakan contoh untuk aplikasi internal satu-guru. Ganti dengan kebijakan
-- berbasis auth.uid() sebelum digunakan oleh banyak pengguna.
alter table public.kelas enable row level security;
alter table public.siswa enable row level security;
alter table public.presensi enable row level security;
alter table public.jurnal_mengajar enable row level security;
create policy "authenticated full access kelas" on public.kelas for all to authenticated using (true) with check (true);
create policy "authenticated full access siswa" on public.siswa for all to authenticated using (true) with check (true);
create policy "authenticated full access presensi" on public.presensi for all to authenticated using (true) with check (true);
create policy "authenticated full access jurnal" on public.jurnal_mengajar for all to authenticated using (true) with check (true);
