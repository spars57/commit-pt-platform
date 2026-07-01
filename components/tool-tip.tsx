// components/tooltip.tsx
export function Tooltip({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="group relative inline-block">
      {children}
      <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-md bg-slate-800 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100 whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </div>
  );
}