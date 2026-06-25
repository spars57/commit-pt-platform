import Link from "next/link";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/db/schema";

export default async function ProfilePage() {
  const session = await auth();
  const discordId = session?.user?.discordId;

  const user = discordId
    ? await db.select().from(users).where(eq(users.discordId, discordId)).limit(1).then((r) => r[0] ?? null)
    : null;

  const name = user?.discordUsername ?? session?.user?.name ?? "Utilizador";
  const avatar = user?.discordAvatar ?? null;
  const isPremium = user?.isPremium ?? false;
  const bio = user?.bio ?? null;
  const location = user?.location ?? null;
  const website = user?.website ?? null;
  const skills = user?.skills ?? [];
  const joinedAt = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("pt-PT", { month: "long", year: "numeric" }) : null;

  return (
    <div className="pb-20">
      {/* Banner */}
      <div className="relative mb-16 h-48 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 60%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)" }} />
        {session && (
          <Link className="absolute right-4 top-4 rounded-lg border border-white/20 bg-black/30 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-black/50" href="/account">
            ✏️ Editar perfil
          </Link>
        )}
        {/* Avatar sobreposto ao banner */}
        <div className="absolute -bottom-12 left-8">
          {avatar
            ? <img alt={name} className="h-24 w-24 rounded-full border-4 border-[#080b14] shadow-xl" src={avatar} />
            : <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#080b14] bg-indigo-700 text-3xl shadow-xl">👤</div>}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
        {/* Esquerda: info do perfil */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white">{name}</h1>
              {isPremium && <span className="rounded-full bg-amber-500/10 px-2 py-1 text-xs font-bold text-amber-400">⭐ Commit+</span>}
            </div>
            <p className="mt-1 text-sm text-slate-500">@{name.toLowerCase().replace(/\s/g, "")}</p>

            {bio && <p className="mt-3 text-slate-300">{bio}</p>}

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-400">
              {location && <span className="flex items-center gap-1">📍 {location}</span>}
              {website && (
                <a className="flex items-center gap-1 text-indigo-400 hover:underline" href={website} rel="noreferrer" target="_blank">
                  🔗 {website.replace(/^https?:\/\//, "")}
                </a>
              )}
              {joinedAt && <span className="flex items-center gap-1">🗓 Juntou-se em {joinedAt}</span>}
            </div>
          </div>

          {/* Tabs placeholder */}
          <div className="border-b border-white/5">
            <div className="flex gap-6 text-sm">
              <button className="border-b-2 border-indigo-400 pb-3 font-semibold text-white">Visão geral</button>
              <button className="pb-3 text-slate-500">Cursos</button>
              <button className="pb-3 text-slate-500">Conquistas</button>
            </div>
          </div>

          {/* Progresso */}
          <div>
            <h2 className="text-lg font-bold text-white">Cursos em progresso</h2>
            <div className="mt-4 overflow-hidden rounded-2xl border border-white/5 bg-[#0e1220]">
              <div className="flex items-center gap-4 p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-violet-700 to-blue-800 text-2xl">🐍</div>
                <div className="flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">CURSO</p>
                  <p className="font-semibold text-white">Introdução à Programação</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-800">
                      <div className="h-full w-1/3 rounded-full bg-indigo-500" />
                    </div>
                    <span className="text-xs text-slate-500">1/3 lições</span>
                  </div>
                </div>
                <Link className="rounded-lg bg-indigo-500/10 px-4 py-2 text-sm font-semibold text-indigo-400 transition hover:bg-indigo-500/20" href="/courses/introducao-programacao">
                  Continuar
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Direita: stats + skills */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="rounded-2xl border border-white/5 bg-[#0e1220] p-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Estatísticas</h3>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {[
                { icon: "⚡", label: "XP Total", value: "0" },
                { icon: "🏅", label: "Conquistas", value: "0" },
                { icon: "🔥", label: "Streak", value: "0 dias" },
                { icon: "📚", label: "Lições", value: "0" },
              ].map((stat) => (
                <div className="rounded-xl bg-[#080b14] p-3 text-center" key={stat.label}>
                  <div className="text-xl">{stat.icon}</div>
                  <div className="mt-1 text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="rounded-2xl border border-white/5 bg-[#0e1220] p-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Skills</h3>
            {skills.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span className="rounded-full border border-white/10 bg-[#080b14] px-3 py-1 text-xs font-semibold text-slate-300" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <p className="text-sm text-slate-500">Nenhuma skill adicionada ainda.</p>
                <Link className="text-xs text-indigo-400 hover:underline" href="/account">
                  Adicionar skills →
                </Link>
              </div>
            )}
          </div>

          {/* Discord */}
          {isPremium && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-amber-500">Commit+</h3>
              <p className="mt-2 text-sm text-slate-400">Tens acesso a todo o conteúdo exclusivo da plataforma.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
