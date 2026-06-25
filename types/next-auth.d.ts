import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      discordId?: string;
      discordUsername?: string;
      discordAvatar?: string | null;
      isPremium: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    discordId?: string;
    discordUsername?: string;
    discordAvatar?: string | null;
    isPremium?: boolean;
  }
}
