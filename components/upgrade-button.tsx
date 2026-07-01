// components/upgrade-button.tsx
import Link from "next/link";
import { Sparkles } from "lucide-react";

export function UpgradeButton({ className }: { className?: string }) {
  return (
    <Link 
      className={`flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-500/30 ${className || ""}`}
      href="/upgrade"
    >
      <Sparkles className="h-4 w-4" />
      Commit+
    </Link>
  );
}