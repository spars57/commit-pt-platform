"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User, Settings, BookOpen, SunMoon } from "lucide-react";

import { signOutUser } from "@/app/actions/auth";

type Props = {
  name: string;
  avatar: string | null;
  isPremium: boolean;
};

export function UserMenu({ name, avatar, isPremium }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        className="flex items-center gap-2 rounded-xl border border-white/5 bg-[#0e1220] px-2 py-1.5 transition hover:border-indigo-500/30"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        {avatar
          ? <img alt={name} className="h-7 w-7 rounded-full" src={avatar} />
          : <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/30 text-xs">👤</div>}
        <span className="hidden text-sm font-medium text-white sm:inline">{name}</span>
        <svg className={`h-4 w-4 text-slate-500 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#0e1220] shadow-2xl shadow-black/40">
          <div className="border-b border-white/5 px-4 py-3">
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="mt-0.5 text-xs text-slate-500">
              {isPremium ? "Membro Commit+" : "Conta gratuita"}
            </p>
          </div>
          <div className="py-1">
            <Link className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white" href="/profile" onClick={() => setOpen(false)}>
              <User className="h-5 w-5" /> Perfil
            </Link>
            <Link className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white" href="/account" onClick={() => setOpen(false)}>
              <Settings className="h-5 w-5" /> Conta
            </Link>
            <Link className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white" href="/dashboard" onClick={() => setOpen(false)}>
              <BookOpen className="h-5 w-5" /> Os meus cursos
            </Link>
            <Link className="flex items-center gap-3 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white" href="/dashboard" onClick={() => setOpen(false)}>
              <SunMoon className="h-5 w-5" /> Theme
            </Link>
          </div>
          <div className="border-t border-white/5 py-1">
            <form action={signOutUser}>
              <button className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/5" type="submit">
                <span>↩</span> Terminar sessão
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
