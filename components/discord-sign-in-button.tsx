import { signInWithDiscord } from "@/app/actions/auth";

export function DiscordSignInButton() {
  return (
    <form action={signInWithDiscord}>
      <button className="rounded-lg bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-400" type="submit">
        Entrar com Discord
      </button>
    </form>
  );
}
