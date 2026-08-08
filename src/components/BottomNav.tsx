import { LayoutDashboard, Flame } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/src/lib/utils";

export default function BottomNav() {
  const location = useLocation();

  const links = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/day/12", icon: Flame, label: "Challenge" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-ab-card border-t border-ab-border pb-safe">
      <div className="max-w-md mx-auto px-5 h-[72px] flex items-center justify-around">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex flex-col items-center justify-center gap-1 transition-colors btn-interactive btn-interactive-ghost p-2 rounded-xl hover:bg-ab-nav-hover",
                isActive ? "text-ab-accent bg-ab-nav-hover" : "text-ab-muted hover:text-ab-text opacity-80 hover:opacity-100"
              )}
            >
              <link.icon className="w-5 h-5" />
              <span className="text-[8px] font-bold uppercase mt-1">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
