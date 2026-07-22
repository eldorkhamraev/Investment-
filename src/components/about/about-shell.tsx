import type { ReactNode } from "react";

/** Content width wrapper for About section pages. */
export function AboutPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="bg-paper py-12 md:py-16">
      <div className="container-edge">{children}</div>
    </div>
  );
}
