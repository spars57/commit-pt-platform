import Link from "next/link";
import { eq } from "drizzle-orm";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/db/schema";

export default async function AccountPage() {
  const session = await auth();
  const discordId = session?.user?.discordId;

  const user = discordId
    ? await db.select().from(users).where(eq(users.discordId, discordId)).limit(1).then((r) => r[0] ?? null)
    : null;

  const name = user?.discordUsername ?? session?.user?.name ?? "Utilizador";
  const avatar = user?.discordAvatar ?? null;

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-white">Conta</h1>
        <p className="mt-1 text-slate-400">Gere o teu perfil e preferências.</p>
      </div>

      {/* Sidebar + content */}
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <nav className="space-y-1">
          {[
            { label: "Perfil", href: "/account", active: true },
            { label: "Ver perfil público", href: "/profile", active: false },
          ].map((item) => (
            <Link
              className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${item.active ? "bg-indigo-500/10 text-indigo-400" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Form */}
        <div className="space-y-6 rounded-2xl border border-white/5 bg-[#0e1220] p-6">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            {avatar
              ? <img alt={name} className="h-20 w-20 rounded-full ring-2 ring-indigo-500/30" src={avatar} />
              : <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-500/20 text-3xl">👤</div>}
            <div>
              <p className="text-sm font-semibold text-white">{name}</p>
              <p className="mt-1 text-xs text-slate-500">Avatar sincronizado com o Discord.</p>
            </div>
          </div>

          <hr className="border-white/5" />

          {/* Fields */}
          {[
            { label: "Nome", placeholder: name, disabled: true, note: "Sincronizado com o Discord" },
            { label: "Username", placeholder: name.toLowerCase().replace(/\s/g, ""), disabled: true, note: "Sincronizado com o Discord" },
            { label: "Localização", placeholder: "ex: Portugal", disabled: false, note: "" },
            { label: "Website", placeholder: "https://...", disabled: false, note: "" },
          ].map((field) => (
            <div key={field.label}>
              <label className="text-sm font-semibold text-slate-300">{field.label}</label>
              <input
                className="mt-2 w-full rounded-xl border border-white/5 bg-[#080b14] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 disabled:opacity-50"
                disabled={field.disabled}
                placeholder={field.placeholder}
                type="text"
              />
              {field.note && <p className="mt-1 text-xs text-slate-600">{field.note}</p>}
            </div>
          ))}

          {/* Bio */}
          <div>
            <label className="text-sm font-semibold text-slate-300">Bio</label>
            <textarea
              className="mt-2 w-full rounded-xl border border-white/5 bg-[#080b14] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
              placeholder="Conta-nos um pouco sobre ti..."
              rows={3}
            />
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm font-semibold text-slate-300">Skills</label>
            <input
              className="mt-2 w-full rounded-xl border border-white/5 bg-[#080b14] px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20"
              placeholder="ex: JavaScript, Python, React (separado por vírgulas)"
              type="text"
            />
          </div>

          <p className="rounded-lg bg-indigo-500/5 px-4 py-3 text-xs text-indigo-400">
            🚧 Guardar perfil disponível em breve. Os campos de bio, localização e skills serão editáveis.
          </p>
        </div>
      </div>
    </div>
  );
}
