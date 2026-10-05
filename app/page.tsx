'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarCheck, GraduationCap, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { today } from '@/lib/utils';

export default function Dashboard() {
  const [stats, setStats] = useState({ kelas: 0, siswa: 0, hadir: 0 });
  useEffect(() => { const load = async () => { const start = `${today().slice(0, 7)}-01`; const [k, s, p] = await Promise.all([supabase.from('kelas').select('*', { count: 'exact', head: true }), supabase.from('siswa').select('*', { count: 'exact', head: true }), supabase.from('presensi').select('status').gte('tanggal', start).lte('tanggal', today())]); const rows = p.data ?? []; setStats({ kelas: k.count ?? 0, siswa: s.count ?? 0, hadir: rows.length ? Math.round(rows.filter(x => x.status === 'hadir').length / rows.length * 100) : 0 }); }; load(); }, []);
  const cards = [{ label: 'Total Kelas', value: stats.kelas, icon: GraduationCap, color: 'bg-sky-500 text-white' }, { label: 'Total Siswa', value: stats.siswa, icon: Users, color: 'bg-sky-100 text-sky-700' }, { label: 'Kehadiran Bulan Ini', value: `${stats.hadir}%`, icon: CalendarCheck, color: 'bg-sky-600 text-white' }];
  return <div className="mx-auto max-w-6xl p-4 md:p-8"><div className="mb-8 rounded-2xl bg-gradient-to-r from-sky-400 to-sky-600 p-6 text-white shadow-lg shadow-sky-300/50 md:p-8"><p className="text-sm font-medium text-sky-100">Selamat datang, Guru</p><h1 className="text-2xl font-bold tracking-tight md:text-3xl">Dashboard Ringkasan</h1><p className="mt-1 text-sky-50">Pantau kelas, siswa, dan kehadiran Anda.</p></div><div className="grid gap-4 sm:grid-cols-3">{cards.map(({label,value,icon:Icon,color}) => <div key={label} className="card p-5"><div className={`mb-4 w-fit rounded-xl p-3 ${color}`}><Icon size={22}/></div><p className="text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p></div>)}</div><section className="card mt-6 p-6"><h2 className="font-bold">Aksi cepat</h2><p className="mt-1 text-sm text-slate-500">Mulai mencatat aktivitas mengajar hari ini.</p><div className="mt-5 flex flex-wrap gap-3"><Link className="btn-primary" href="/presensi">Isi presensi hari ini</Link><Link className="btn-secondary" href="/kelas">Kelola kelas & siswa</Link></div></section></div>;
}
