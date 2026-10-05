import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/sidebar';
import { AuthGate } from '@/components/auth-gate';

export const metadata: Metadata = { title: 'Jurnal Mengajar', description: 'Presensi kehadiran siswa dan jurnal mengajar' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body><AuthGate><Sidebar /><main className="min-h-screen pb-20 pt-16 md:ml-64 md:pt-0">{children}</main></AuthGate></body></html>;
}
