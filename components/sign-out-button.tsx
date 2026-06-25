import { signOutUser } from "@/app/actions/auth";

export function SignOutButton() {
  return (
    <form action={signOutUser}>
      <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-900" type="submit">
        Sair
      </button>
    </form>
  );
}
