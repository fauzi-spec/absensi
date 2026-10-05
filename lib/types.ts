export type StatusPresensi = 'hadir' | 'izin' | 'sakit' | 'alpa';
export interface Kelas { id: string; nama: string; tingkat: string | null; tahun_ajaran: string; created_at: string }
export interface Siswa { id: string; kelas_id: string; nis: string | null; nama: string; created_at: string }
export interface Presensi { id: string; siswa_id: string; kelas_id: string; tanggal: string; status: StatusPresensi; keterangan: string | null }
export interface JurnalMengajar { id: string; kelas_id: string; tanggal: string; mata_pelajaran: string; materi: string; kendala: string | null }
