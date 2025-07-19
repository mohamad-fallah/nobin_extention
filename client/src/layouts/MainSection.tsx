import type { PropsWithChildren } from "react";

export default function MainSection({ children }: PropsWithChildren) {
  return (
    <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-8 pb-8">{children}</main>
  );
}
