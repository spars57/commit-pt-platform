// components/theme-toggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-6 w-11 rounded-full bg-slate-700 transition-colors hover:bg-slate-600"
    >
      {/* Thumb (bolinha que se move) */}
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`} />
      
      {/* Ícones decorativos */}
      <Sun className="absolute left-1.5 top-1 h-3 w-3 text-slate-400" />
      <Moon className="absolute right-1.5 top-1 h-3 w-3 text-slate-400" />
    </button>
  );
}