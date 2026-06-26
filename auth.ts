import NextAuth from "next-auth";
import Discord from "next-auth/providers/discord";
import { eq } from "drizzle-orm";

import { users } from "@/db/schema";
import { db } from "@/lib/db";

type DiscordProfile = {
  id: string;
  username?: string;
  global_name?: string | null;
  avatar?: string | null;
  email?: string | null;
};

type DiscordGuildMember = {
  roles?: string[];
};

async function getDiscordRoles(discordId: string) {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const serverId = process.env.DISCORD_SERVER_ID;

  if (!botToken || !serverId) {
    return [];
  }

  try {
    const { REST, Routes } = await import("discord.js");
    const rest = new REST({ version: "10" }).setToken(botToken);
    const member = (await rest.get(Routes.guildMember(serverId, discordId))) as DiscordGuildMember;

    return member.roles ?? [];
  } catch (error) {
    console.error("Não foi possível obter os cargos do Discord:", error);
    return [];
  }
}

function getDiscordAvatarUrl(profile: DiscordProfile) {
  if (!profile.avatar) {
    return null;
  }

  return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`;
}

async function upsertDiscordUser(profile: DiscordProfile) {
  const roles = await getDiscordRoles(profile.id);
  const isPremium = process.env.DISCORD_PREMIUM_ROLE_ID
    ? roles.includes(process.env.DISCORD_PREMIUM_ROLE_ID)
    : false;
  const username = profile.global_name ?? profile.username ?? "Utilizador Discord";
  const avatar = getDiscordAvatarUrl(profile);

  const [user] = await db
    .insert(users)
    .values({
      discordId: profile.id,
      discordUsername: username,
      discordAvatar: avatar,
      email: profile.email ?? null,
      isPremium,
      discordRoles: roles,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: users.discordId,
      set: {
        discordUsername: username,
        discordAvatar: avatar,
        email: profile.email ?? null,
        isPremium,
        discordRoles: roles,
        updatedAt: new Date(),
      },
    })
    .returning();

  return user;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      authorization: {
        url: "https://discord.com/api/oauth2/authorize",
        params: {
          scope: "identify email guilds.members.read",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider !== "discord" || !profile) {
        return false;
      }

      await upsertDiscordUser(profile as DiscordProfile);

      return true;
    },
    async jwt({ token, account, profile }: any) {
      if (account?.provider === "discord" && profile) {
        const discordProfile = profile as DiscordProfile;
        const [user] = await db.select().from(users).where(eq(users.discordId, discordProfile.id)).limit(1);

        if (user) {
          token.discordId = user.discordId;
          token.discordUsername = user.discordUsername;
          token.discordAvatar = user.discordAvatar;
          token.isPremium = user.isPremium;
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      session.user.discordId = token.discordId;
      session.user.discordUsername = token.discordUsername;
      session.user.discordAvatar = token.discordAvatar;
      session.user.isPremium = token.isPremium ?? false;

      return session;
    },
  },
});
