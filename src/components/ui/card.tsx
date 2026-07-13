import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white p-6 shadow-card ${
        interactive
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift hover:border-azure-200"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function IconTile({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-azure-50 text-azure-600 ring-1 ring-inset ring-azure-100">
      {children}
    </div>
  );
}
