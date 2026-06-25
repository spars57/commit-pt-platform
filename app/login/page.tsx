import Link from "next/link";

import { DiscordSignInButton } from "@/components/discord-sign-in-button";

export default function LoginPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-sm">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0e1220]">
          {/* Banner cozy topo */}
          <div className="flex h-28 items-center justify-center bg-gradient-to-br from-violet-900 via-indigo-800 to-blue-900">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-xl font-black text-white backdrop-blur-sm">
              {'</>'}
            </div>
          </div>
          <div className="p-7">
            <h1 className="text-2xl font-bold text-white">Entrar na CommitPT</h1>
            <p className="mt-2 text-sm text-slate-400">
              Usa o Discord para sincronizar o progresso e aceder ao conteúdo Commit+.
            </p>
            <div className="mt-6">
              <DiscordSignInButton />
            </div>
            <div className="mt-5 border-t border-white/5 pt-5">
              <p className="text-xs text-slate-500">
                Sem conta Discord? Cria uma em{" "}
                <a className="text-indigo-400 hover:underline" href="https://discord.com" rel="noreferrer" target="_blank">discord.com</a>
                {" "}— é grátis.
              </p>
              <p className="mt-2 text-xs text-slate-600">
                Queres explorar primeiro?{" "}
                <Link className="text-slate-400 hover:text-white" href="/courses">Ver os cursos →</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
