// components/upgrade-button.tsx
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function UpgradeButton({ className }: { className?: string }) {
  return (
    <Link 
      className={`flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400 ${className || ""}`}
      href="/upgrade"
    >
      <Sparkles className="h-4 w-4" />
      Commit+
    </Link>
  );
}

{/* 
  Commit+ Button - escolher uma das opções abaixo, descomentar e apagar as restantes

  Opção A — Dourado
  className={`flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-500/30 transition hover:bg-amber-400 ${className || ""}`}

  Opção B — Verde esmeralda
  className={`flex items-center gap-1.5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 ${className || ""}`}

  Opção C — Laranja vibrante
  className={`flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400 ${className || ""}`}

  Opção D — Gradiente azul/roxo (consistente com a UI)
  className={`flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-500 hover:to-violet-500 hover:shadow-blue-600/30 ${className || ""}`}

  Original (laranja gradiente — mantido para referência)
  className={`flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-600/20 transition hover:from-amber-500 hover:to-orange-500 hover:shadow-amber-600/30 ${className || ""}`}

  Others : 
  className={`flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400 hover:shadow-indigo-500/30 ${className || ""}`}

  className={`flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-300 transition hover:bg-indigo-500/20 hover:text-indigo-200 ${className || ""}`}

  className={`flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-600/20 transition hover:from-amber-500 hover:to-orange-500 hover:shadow-amber-600/30 ${className || ""}`}


*/}