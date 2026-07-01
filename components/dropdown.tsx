// components/dropdown.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";

export function Dropdown({ trigger, items }: { 
  trigger: React.ReactNode; 
  items: { label: string; href?: string; onClick?: () => void }[] 
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1">
        {trigger}
        <span className="text-xs">▾</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-white/10 bg-[#0e1220] p-1 shadow-xl">
          {items.map((item) => (
            item.href ? (
              <Link 
                key={item.label} 
                href={item.href} 
                className="block rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button 
                key={item.label} 
                className="w-full rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                onClick={() => { item.onClick?.(); setOpen(false); }}
              >
                {item.label}
              </button>
            )
          ))}
        </div>
      )}
    </div>
  );
}