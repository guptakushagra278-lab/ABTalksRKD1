import { ReactNode } from "react";
import BottomNav from "./BottomNav";

interface AppShellProps {
  children: ReactNode;
  showNav?: boolean;
}

export default function AppShell({ children, showNav = true }: AppShellProps) {
  return (
    <div className="min-h-screen bg-ab-bg text-ab-text selection:bg-ab-accent selection:text-black flex flex-col font-sans">
      <main className="flex-1 w-full max-w-[390px] mx-auto md:max-w-xl lg:max-w-4xl relative overflow-x-hidden">
        <div className="min-h-[100dvh] flex flex-col">
          {children}
        </div>
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
