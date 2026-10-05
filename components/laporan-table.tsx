'use client';
import { useEffect, useState } from 'react';
import { Download, Printer } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Kelas } from '@/lib/types';
import { formatDate, today } from '@/lib/utils';
type Row={tanggal:string; status:string; siswa:{nama:string}|null; kelas:{nama:string}|null};
export function LaporanTable() {
  const [kelas, setKelas] = useState<Kelas[]>([]);
  const [kelasId, setKelasId] = useState('');
  const [start, setStart] = useState(`${today().slice(0, 7)}-01`);
  const [end, setEnd] = useState(today());
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => { supabase.from('kelas').select('*').order('nama').then(({ data }) => setKelas(data ?? [])); }, []);
  const search = async () => { let q = supabase.from('presensi').select('tanggal,status,siswa(nama),kelas(nama)').gte('tanggal', start).lte('tanggal', end).order('tanggal', { ascending: false }); if (kelasId) q = q.eq('kelas_id', kelasId); const { data } = await q; setRows((data as unknown as Row[]) ?? []); };
  useEffect(() => { search(); }, []);
  const exportCsv = () => { const csv = ['Tanggal,Kelas,Siswa,Status', ...rows.map(r => [r.tanggal, r.kelas?.nama, r.siswa?.nama, r.status].map(v => `"${v ?? ''}"`).join(','))].join('\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = 'rekap-presensi.csv'; a.click(); };
  return <><section className="card p-5"><div className="grid gap-3 md:grid-cols-4"><input className="input" type="date" value={start} onChange={e => setStart(e.target.value)} /><input className="input" type="date" value={end} onChange={e => setEnd(e.target.value)} /><select className="input" value={kelasId} onChange={e => setKelasId(e.target.value)}><option value="">Semua kelas</option>{kelas.map(k => <option key={k.id} value={k.id}>{k.nama}</option>)}</select><button className="btn-primary" onClick={search}>Terapkan filter</button></div></section><section className="card mt-6 overflow-hidden"><div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-bold">Rekap Kehadiran</h2><p className="text-sm text-slate-500">{rows.length} catatan ditemukan</p></div><div className="flex gap-2"><button onClick={() => window.print()} className="btn-secondary"><Printer size={16} />Cetak</button><button onClick={exportCsv} className="btn-secondary"><Download size={16} />Excel/CSV</button></div></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="p-4">Tanggal</th><th className="p-4">Kelas</th><th className="p-4">Siswa</th><th className="p-4">Status</th></tr></thead><tbody className="divide-y">{rows.map((r, i) => <tr key={i}><td className="p-4">{formatDate(r.tanggal)}</td><td className="p-4">{r.kelas?.nama}</td><td className="p-4 font-medium">{r.siswa?.nama}</td><td className="p-4 capitalize">{r.status}</td></tr>)}{!rows.length && <tr><td colSpan={4} className="p-10 text-center text-slate-400">Tidak ada data pada rentang ini.</td></tr>}</tbody></table></div></section></>;
}
