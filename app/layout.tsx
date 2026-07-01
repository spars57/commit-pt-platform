import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";

import "./globals.css";
import { auth } from "@/auth";
import { UserMenu } from "@/components/user-menu";
import { Providers } from "./providers";
import { BookOpen, Map, User, Settings, BellPlus, Link as LinkIcon } from "lucide-react";
import { Tooltip } from "@/components/tool-tip";

export const metadata: Metadata = {
  title: "CommitPT",
  description: "Plataforma didática para a comunidade portuguesa de programação.",
};

export default async function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const session = await auth();
  const avatar = session?.user?.discordAvatar ?? null;
  const name = session?.user?.discordUsername ?? session?.user?.name ?? null;
  const isPremium = session?.user?.isPremium ?? false;

  return (
    <html lang="pt">
      <body>
        <Providers>
          <div className="min-h-screen">
            <header className="sticky top-0 z-50 border-b border-white/5 bg-[#080b14]/90 backdrop-blur-md">
              <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
                <Link className="flex items-center gap-2 text-lg font-bold text-white" href="/">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-indigo-500 text-sm font-black">{'</>'}</span>
                  <span>CommitPT</span>
                </Link>
                <div className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
                  <Link className="transition hover:text-white" href="/courses">Cursos</Link>
                  <Link className="transition hover:text-white" href="/roadmap">Roadmap</Link>
                  <Link className="transition hover:text-white" href="/upgrade">Commit+</Link>
                </div>
                <div className="flex items-center gap-3">
                  {name ? (
                    <>
                      <div className="hidden items-center gap-1 text-sm text-slate-400 md:flex">
                        <Tooltip label="Aprender">
                        <Link className="flex items-center justify-center rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-white" href="/dashboard">
                        <BookOpen className="h-6 w-6" />
                        </Link>
                        </Tooltip>
                        <Tooltip label="Notificações">
                        <Link className="flex items-center justify-center rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-white" href="/account">
                        <BellPlus className="h-6 w-6" />
                        </Link>
                        </Tooltip>
                      </div>
                      <UserMenu avatar={avatar} isPremium={isPremium} name={name} />
                    </>
                  ) : (
                    <>
                      <Link className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:text-white" href="/login">
                        Entrar
                      </Link>
                      <Link className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400" href="/login">
                        Começar grátis
                      </Link>
                    </>
                  )}
                </div>
              </nav>
            </header>
            <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
