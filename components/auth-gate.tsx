'use client';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
export function AuthGate({ children }: { children: React.ReactNode }) { const path = usePathname(), router = useRouter(); const [ready,setReady]=useState(false); useEffect(()=>{supabase.auth.getSession().then(({data})=>{if(!data.session && path!=='/login') router.replace('/login'); else setReady(true)}); const {data:{subscription}}=supabase.auth.onAuthStateChange((_e,session)=>{if(!session&&path!=='/login')router.replace('/login');else setReady(true)});return()=>subscription.unsubscribe()},[path,router]); if(path==='/login'||ready)return <>{children}</>; return <div className="grid min-h-screen place-items-center text-sm text-slate-500">Memeriksa sesi...</div> }
