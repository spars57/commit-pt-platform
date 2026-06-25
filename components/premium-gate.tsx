import type { ReactNode } from "react";
import Link from "next/link";

export function PremiumGate({
  children,
  isPremium,
}: {
  children: ReactNode;
  isPremium: boolean;
}) {
  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-6">
      <h2 className="text-xl font-semibold text-amber-200">Conteúdo premium bloqueado</h2>
      <p className="mt-2 text-slate-300">Precisas do cargo commit+ no servidor Discord para aceder a esta lição.</p>
      <Link className="mt-4 inline-flex rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-950" href="/upgrade">
        Como desbloquear
      </Link>
    </div>
  );
}
