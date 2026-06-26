import { redirect } from "next/navigation";

import { auth } from "@/auth";

export default async function UpgradePage() {
  const session = await auth();

  if (session?.user?.isPremium) {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8">
      <h1 className="text-3xl font-bold text-amber-100">Precisas do cargo Commit+</h1>
      <p className="mt-4 text-slate-200">
        Para desbloquear lições commit+, junta-te ao servidor Discord da CommitPT e garante que a tua conta tem o cargo commit+ configurado.
      </p>
      <p className="mt-3 text-sm text-slate-400">
        Depois de receberes o cargo, termina sessão e volta a entrar para atualizar os cargos guardados na plataforma.
      </p>
    </div>
  );
}
